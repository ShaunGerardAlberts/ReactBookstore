import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelvesComponent from './components/ShelvesComponent'
import SearchComponent from './components/SearchComponent'
import BooksComponent from './BooksComponent'

class App extends React.Component {
  state = {
    books: [ ],
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
    // console.log(`Book : ${bookChangeInfo.bookInfo.title} : Shelf : ${bookChangeInfo.shelf} `)
    
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
    // console.log(desireShelf)
    // console.log(this.state.books)
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

  }

  performSearch = (searchQuery) => {
    BooksAPI.search(searchQuery).then((returnedBooks) => {
      returnedBooks.map(book => {
        if (typeof book.shelf === "undefined")  {
          book.shelf = "none"
        }
      })
      this.setState({
        searchBooks: returnedBooks
      }, () => {
        // console.log(this.state.searchBooks)
        this.state.searchBooks.map(book => {
          this.state.books.forEach((currentStateBook) => {
            this.setState(state => ({
              searchBooks: state.searchBooks.map(searchBook => {
                if (searchBook.title.trim() ===  currentStateBook.title.trim()) {
                  // console.log('yes')
                  searchBook.shelf = currentStateBook.shelf
                }
                return searchBook
              })
            }))
          })
        })
      })
    }) 
  }

  addBook = (book) => {
    let { books } = this.state
    let bookExists = false;

    for (let i = 0; i < books.length; i++) {
      if (books[i].id === book.id) {
        bookExists = true
        break
      }
    }
    //book does not exist so add it to state of books
    if (!bookExists) {
      this.setState(state => ({
        books: books.concat([book])
      }))
    }
  }

  render() {
    return (
      <div className="app">
        {/* {JSON.stringify(this.state.books)} */}
        <Route exact path="/" render={() => (
          <ShelvesComponent
            books={this.state.books}
            changeBookShelf={this.changeBookShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchComponent
            searchBooks={this.state.searchBooks}
            changeBookShelf={this.changeBookShelf}
            onPerformSearch={this.performSearch}
            onAddBook={this.addBook}
          />
        )}/>
      </div>
    )
  }
}

export default App
