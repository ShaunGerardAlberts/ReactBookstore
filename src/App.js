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
    console.log(desireShelf)

    this.setState(state => ({
      books: state.books.map((book) => {
        if (book.id === bookToUpdate.id) {
          book.shelf = desireShelf
        }
        return book
      }),
      searchBooks: state.books.map((book) => {
        if (book.id === bookToUpdate.id) {
          book.shelf = desireShelf
        }
        return book
      })
    }))
  }

  performSearch = (searchQuery) => {
    BooksAPI.search(searchQuery).then((books) => {
      if (books != undefined && !books.error) {
        this.setState({
          searchBooks: books
        })
      } else if (books.error) {
        this.setState({
          searchBooks: []
        })
      } 
    })
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
          />
        )}/>
      </div>
    )
  }
}

export default App
