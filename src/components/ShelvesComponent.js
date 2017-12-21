import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelfComponent from './BookShelfComponent'

const ShelvesComponent = (props) => {
    const shelves = [
        {
            id: 'currentlyReading',
            title: 'Currently Reading',
            books: props.books.filter(book => book.shelf === 'currentlyReading')
        },
        {
            id: 'read',
            title: 'Read',
            books: props.books.filter(book => book.shelf === 'read')
        },
        {
            id: 'wantToRead',
            title: 'Want to Read',
            books: props.books.filter(book => book.shelf === 'wantToRead')
        }   
    ]

    const handleShelfChange = (shelfUpdate) => {
        if (props.changeBookShelf) {
            props.changeBookShelf(shelfUpdate)
        }
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelves.map(shelf => (
                        <BookShelfComponent key={shelf.id} id={shelf.id} title={shelf.title} displayBooks={ shelf.books } bookShelfChange={ handleShelfChange } />    
                    ))}
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

ShelvesComponent.prototype = {
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
}

export default ShelvesComponent