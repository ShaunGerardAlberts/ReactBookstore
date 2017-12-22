import React from 'react'
import PropTypes from 'prop-types'
import BookComponent from './BookComponent'

const BookShelfComponent = (props) => {
    const { displayBooks, title } = props
    var bookURL

    const sendShelfChange = (updateShelfObject) => {
        if (props.bookShelfChange) {
            props.bookShelfChange(updateShelfObject)
        }
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {displayBooks.map((book) => {
                        return (
                            <BookComponent key={book.id} book={book} shelfChange={sendShelfChange} />
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