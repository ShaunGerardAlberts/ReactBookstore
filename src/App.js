import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelvesComponent from './ShelvesComponent'
import SearchComponent from './SearchComponent'
import BooksComponent from './BooksComponent'

class App extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: true
    books: [ ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
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
      })
    }))
  }

  render() {
    return (
      <div className="app">
        {/* {JSON.stringify(this.state)} */}
        <Route exact path="/" render={() => (
          <ShelvesComponent
            books={this.state.books}
            changeBookShelf={this.changeBookShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchComponent
            books={this.state.books}
          />
        )}/>
        {/* {this.state.showSearchPage ? (
          <SearchComponent/>
        ) : (
          <ShelvesComponent/>
        )} */}
      </div>
    )
  }
}

export default App
