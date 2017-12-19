import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ShelvesComponent extends Component {
    // static propTypes = {
    //     books: PropTypes.array.isRequired
    // }

    handleShelfChange = (book) => {
        //buid up array of objects { contact: contact, desiredShelf: newShelf}
        //console.log(`Book : ${book.title} desiredShelf : ${desiredShelf}`)
        let selectObject = document.getElementById(`${book.id}`)
        let desiredShelf  = selectObject.options[selectObject.selectedIndex].text
        //alert(desiredShelf)

        const updateInfo = { bookInfo: book, shelf: desiredShelf }
        if (this.props.changeBookShelf) {
            this.props.changeBookShelf(updateInfo)
        }
    }

    renderShelf = (booksArray) => {
        return (
            <div className="bookshelf-books">
            <ol className="books-grid">
            {booksArray.map((book) => (
                <li key={ book.id }>
                    <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, 
                            backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                        <div className="book-shelf-changer">
                            <select id={book.id} value={book.shelf} onChange={() => this.handleShelfChange(book)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-authors">{ book.authors }</div>
                    </div>
                </li>
            ))}
            </ol>
        </div>
        )
    }

    render() {
        const { books } = this.props

        console.log("Books : ", books)
        let newObj = Object.values(books)
        console.log('newObj ', newObj)

        console.log(books.typeof)
        
        let currentlyReading = books.filter((book) => book.shelf === "currentlyReading" )
        let wantToRead = books.filter((book) => book.shelf === "wantToRead")
        let alreadyRead = books.filter((book) => book.shelf === "read")

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                    {this.renderShelf(currentlyReading)}
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  {this.renderShelf(wantToRead)}
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  {this.renderShelf(alreadyRead)}
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search"
              >Add a book</Link>
            </div>
          </div>
        )
    }
}

export default ShelvesComponent