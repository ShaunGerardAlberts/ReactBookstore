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

    

    console.log(this.state.books)
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
    let stateBooks = this.state.books
    let arrStateBooks = Object.values(stateBooks)
    //console.log(`arrayStateBooks: ${arrStateBooks[0].id}`)
    let count = 0;
    BooksAPI.search(searchQuery).then((returnedBooks) => {
      returnedBooks.map((returnedBook, i) => {

        this.state.searchBooks.map(stateSearchBook => {
          if (stateSearchBook.id === returnedBook.id) {
            // alert(`${returnedBook.id}`)
            stateBooks.map(stateBook => {
              if (stateBook.id === stateSearchBook.id) {
                alert("get this id")
              } else {
                //alert("No one knows what you're asking")
              }
            })
            // console.log(`stateSearchBook: ${stateSearchBook.shelf} :returnedBook ${returnedBook.shelf} `)
          }
        })
         
        // if (typeof book.shelf === "undefined") {
 
        //   // console.log("undefined")
        //   // console.log(bk)

        //   book.shelf = 'none'
        //   BooksAPI.update(book, 'none')


        // } 
        //

        

      })

      //

      // if (typeof currentBook[index] === "undefined") {
      //   alert("tst")
      // }
            
      // books are being returned, but the have no shelf key to them, this I dont know how to make this work.
       if (returnedBooks !== undefined && !returnedBooks.error) {
        //  alert("tst")
      //   //update all the book.shelfs
      //   returnedBooks.map((currentBook, index) => {
      //     if (stateBooks[index] !== undefined && currentBook.id === stateBooks[index].id) {
      //       currentBook.shelf = stateBooks[index].shelf
      //       BooksAPI.update(currentBook, stateBooks[index].shelf)
      //       this.stateBooks({
      //         books
      //       })
      //     } else {
      //       //add a attribute to the object 'shelf' and set it to 'none'
      //     }

      //     return currentBook
      //   })
        // this.setState({
        //   searchBooks: books
        // })
        // this.setState(state => ({
        //     books: returnedBooks.map((currentBook, index) => {
        //     if (stateBooks[index] !== undefined && currentBook.id === stateBooks[index].id) {
        //       //currentBook.shelf = stateBooks[index].shelf
        //       stateBooks[index].shelf = currentBook.shelf
        //       BooksAPI.update(stateBooks[index].shelf, currentBook.shelf)
        //       return currentBook 
        //     } else { //
        //       return currentBook
        //     }
        //   })
        // }))
        this.setState({
          // books: stateBooks.map((currentBook, index) => {
          //   console.log("test")
          //   if (stateBooks[index] !== undefined && currentBook.id === stateBooks[index].id) {
          //     //currentBook.shelf = stateBooks[index].shelf
          //     stateBooks[index].shelf = currentBook.shelf
          //     console.log(`stateBook shelf: ${stateBooks[index].shelf}`)
          //     console.log(`current Book: ${currentBook.shelf}`)
          //     BooksAPI.update(stateBooks[index].shelf, currentBook.shelf)
          //     return currentBook 
          //   } else { //
          //     return currentBook
          //   }
          // }),

          searchBooks: returnedBooks 
          // returnedBooks.map((currentBook, index) => {
          //   // console.log(currentBook.id)
          //   // console.log(arrStateBooks[index].id)
            
          //   if (typeof currentBook.shelf !== 'undefined') {
          //     console.log("give a new shelf value of none")
          //     // currentBook.shelf = "none"
          //     // alert(currentBook.shelf)
          //   }
          //   stateBooks.map(stateBook => {
          //     // console.log(stateBook)
          //     if (currentBook.id === stateBook.id) {
          //       console.log("update to correct shelf")
          //       // alert(currentBook.id)
          //       // alert(stateBook.shelf)
          //       // currentBook.shelf = stateBook.shelf
          //       // alert(currentBook.shelf)
          //       //update
          //     }
          //     return currentBook
          //   })
            
          // })
        })
      } else if (returnedBooks.error) {
        // console.log("test")
        this.setState({
          searchBooks: []
        })
      } 
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
