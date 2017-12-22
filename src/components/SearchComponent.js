import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle'
import BookComponent from './BookComponent'

class SearchComponent extends Component {
  static propTypes = {
    searchBooks: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired,
    onPerformSearch: PropTypes.func.isRequired
  }

  state = {
    searchQuery: ''
  }

  sendShelfChange = (updateShelfObject) => {
    if (this.props.changeBookShelf) {
      this.props.changeBookShelf(updateShelfObject)
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
              return (
                <BookComponent key={book.id} book={book} shelfChange={this.sendShelfChange} />
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchComponent