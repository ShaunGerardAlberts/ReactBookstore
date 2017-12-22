import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelvesComponent from './components/ShelvesComponent'
import SearchComponent from './components/SearchComponent'
import ErrorComponent from './components/ErrorComponent'

class App extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
        searchBooks: books
      })
    })
  }

  changeBookShelf = (bookChangeInfo) => {
    let bookToUpdate = bookChangeInfo.bookInfo
    let desireShelf = bookChangeInfo.shelf
    if (desireShelf === 'Want to Read') {
      desireShelf = 'wantToRead'
    } else if (desireShelf === 'Currently Reading') {
      desireShelf = 'currentlyReading'
    } else if (desireShelf === 'Read') {
      desireShelf = 'read'
    } else if (desireShelf === 'None') {
      desireShelf = 'none'
    }

    let addNewBook = true
    this.state.books.forEach(book => {
      if (book.id === bookToUpdate.id) {
        addNewBook = false
      }
    })

    if (addNewBook) {
      this.setState(state => ({
        books: state.books.concat(bookToUpdate)
      }))
    }

    // update with change in front-end and back-end
    BooksAPI.update(bookToUpdate, desireShelf).then(() => {
      this.setState(state => ({
        books: state.books.map((book) => {
          if (book.id === bookToUpdate.id) {
            book.shelf = desireShelf
          }
          return book
        })
      }))
      this.setState(state => ({
        searchBooks: state.books.map((book) => {
          if (book.id === bookToUpdate.id) {
            book.shelf = desireShelf
          }
          return book
        })
      }))
    })
    .catch( // if error remove change from front-end
      this.setState(state => {
        books: state.books.filter(book => book.id !== bookToUpdate)
      })
    )

  }

  performSearch = (searchQuery) => {
    if (searchQuery !== "blankSearch") {
      BooksAPI.search(searchQuery).then((returnedBooks) => {
        if (!returnedBooks.error) {
          // if the returnedBook doesnt have a shelf property, create and default to 'undefined'
          returnedBooks.forEach(book => {
            if (typeof book.shelf === "undefined") {
              book.shelf = "none"
            }
          })
          //want to reconcile shelf of books to shelf of returned books, so iterate over every returnedBook
          returnedBooks.forEach((returnedBook) => {
            //go through every book in state.book, where appropriate ensure returnedBook.shelf = stateBook.shelf
            this.state.books.forEach((stateBook) => {
              if (returnedBook.id === stateBook.id) {
                returnedBook.shelf = stateBook.shelf
              }
            })
          })
          //now returedBooks shelf should match state.book shelf values
          this.setState({
            searchBooks: returnedBooks
          })
        } else { // account for error response from server
          this.setState(state => ({
            searchBooks: []
          }))
        }
      })
    } else {
      this.setState({
        searchBooks: []
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <ShelvesComponent
              books={this.state.books}
              changeBookShelf={this.changeBookShelf}
            />
          )} />
          <Route path="/search" render={() => (
            <SearchComponent
              searchBooks={this.state.searchBooks}
              changeBookShelf={this.changeBookShelf}
              onPerformSearch={this.performSearch}
            />
          )} />
          <Route component={ErrorComponent} />
        </Switch>
      </div>
    )
  }
}

export default App
