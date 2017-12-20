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