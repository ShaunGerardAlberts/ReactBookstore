import React from 'react'
import PropTypes from 'prop-types'

const BookComponent = (props) => {
    const { book, shelfChange }  = props
    
    let bookURL
    if (book.imageLinks === undefined) {
        bookURL = 'https://onlinebookclub.org/book-covers/no-cover.jpg'
    } else {
        bookURL = book.imageLinks.thumbnail
    }

    const handleShelfChange = (book, desiredShelf) => {
        // buid up array of objects { contact: contact, desiredShelf: newShelf}
        const updateInfo = { bookInfo: book, shelf: desiredShelf }
        if (shelfChange) {
            shelfChange(updateInfo)
        }
    }

    return (
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, height: 193,
                        backgroundImage: `url(${bookURL})`
                    }}></div>
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
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
            </div>
        </li>
    )
}

BookComponent.propTypes = {
    book: PropTypes.object.isRequired,
    shelfChange: PropTypes.func.isRequired
}

export default BookComponent