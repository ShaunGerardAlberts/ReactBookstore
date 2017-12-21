import React from 'react'
import PropTypes from 'prop-types'

const BookShelfComponent = (props) => {
    const { displayBooks, title } = props
    var bookURL

    const handleShelfChange = (book, desiredShelf) => {
        //buid up array of objects { contact: contact, desiredShelf: newShelf}
        const updateInfo = { bookInfo: book, shelf: desiredShelf }
        if (props.bookShelfChange) {
            props.bookShelfChange(updateInfo)
        }
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
            {displayBooks.map((book) => {
                if (book.imageLinks === undefined) {
                    bookURL = 'https://onlinebookclub.org/book-covers/no-cover.jpg'
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
                                <select id={book.id} value={book.shelf} onChange={(event) => handleShelfChange(book, event.target.value)}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{ book.title }</div>
                        <div className="book-authors">{ book.authors ? book.authors.join(', ') : '' }</div>
                        </div>
                    </li>
                )
            })}
            </ol>
        </div>
    </div>
    )
}

BookShelfComponent.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    bookShelfChange: PropTypes.func.isRequired,
    displayBooks: PropTypes.array.isRequired
}

export default BookShelfComponent