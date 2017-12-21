import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfComponent extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        bookShelfChange: PropTypes.func.isRequired,
        displayBooks: PropTypes.array.isRequired
    }

    handleShelfChange = (book) => {
        //buid up array of objects { contact: contact, desiredShelf: newShelf}
        let selectObject = document.getElementById(`${book.id}`)
        let desiredShelf  = selectObject.options[selectObject.selectedIndex].text

        const updateInfo = { bookInfo: book, shelf: desiredShelf }
        if (this.props.bookShelfChange) {
            this.props.bookShelfChange(updateInfo)
        }
    }

    render() {
        const { displayBooks, title } = this.props
        var bookURL
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ title }</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                {displayBooks.map((book) => {
                    if (book.imageLinks.thumbnail === 'undefined') {
                        bookURL = 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
                    } else {
                        bookURL = book.imageLinks.thumbnail
                    }
                    return (
                        <li key={ book.id }>
                            <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, 
                                    backgroundImage: `url(${bookURL})`}}></div>
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
                    )
                })}
                </ol>
            </div>
        </div>
        )
    }
}

export default BookShelfComponent