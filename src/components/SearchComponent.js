import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle';

class SearchComponent extends Component {
  static propTypes = {
    searchBooks: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired,
    onPerformSearch: PropTypes.func.isRequired
  }

  state = {
    searchQuery: ''
  }

  handleShelfChange = (book, desiredShelf) => {
    const updateInfo = { bookInfo: book, shelf: desiredShelf }
    if (this.props.changeBookShelf) {
      this.props.changeBookShelf(updateInfo)
    }
  }

  performSearch = (searchQuery) => {
    if (searchQuery.length === 0) {
      searchQuery = "blankSearch"
    }
    this.setState({
      searchQuery: searchQuery.trim()
    }, () => {
      if (this.state.searchQuery && this.props.onPerformSearch) {
        this.props.onPerformSearch(this.state.searchQuery)
      }
    })
  }

  handleAddBook = (book) => {
    if (this.props.onAddBook) {
      this.props.onAddBook(book)
    }
  }

  render() {
    var bookURL
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.performSearch(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchBooks.map((book) => {
              if (book.imageLinks === undefined) {
                bookURL = 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
              } else {
                bookURL = book.imageLinks.thumbnail
              }
              return (
                <li key={book.id}>
                  <div className="book" onClick={() => this.handleAddBook(book)}>
                    <div className="book-top">
                      <div className="book-cover" style={{
                        width: 128, height: 193,
                        backgroundImage: `url(${bookURL})`
                      }}></div>
                      <div className="book-shelf-changer">
                        <select id={book.id} value={book.shelf} onChange={(event) => this.handleShelfChange(book, event.target.value)}>
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
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchComponent