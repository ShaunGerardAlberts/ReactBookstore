import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelfComponent from './BookShelfComponent'

class ShelvesComponent extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    }

    handleShelfChange = (shelfUpdate) => {
        if (this.props.changeBookShelf) {
            this.props.changeBookShelf(shelfUpdate)
        }
    }

    render() {
        const { books } = this.props
        const shelves = [
            {
                id: 'currentlyReading',
                title: 'Currently Reading',
                books: books.filter(book => book.shelf === 'currentlyReading')
            },
            {
                id: 'read',
                title: 'Read',
                books: books.filter(book => book.shelf === 'read')
            },
            {
                id: 'wantToRead',
                title: 'Want to Read',
                books: books.filter(book => book.shelf === 'wantToRead')
            }   
        ]

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map(shelf => (
                            <BookShelfComponent id={shelf.id} title={shelf.title} displayBooks={ shelf.books } bookShelfChange={ this.handleShelfChange } />    
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
}

export default ShelvesComponent