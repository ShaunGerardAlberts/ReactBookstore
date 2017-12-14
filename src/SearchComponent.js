import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchComponent extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    state = {
      searchQuery: ''
    }

    handleShelfChange = (book) => {
      let selectObject = document.getElementById(`${book.id}`)
      let desiredShelf  = selectObject.options[selectObject.selectedIndex].text

      const updateInfo = { bookInfo: book, shelf: desiredShelf }
      if (this.props.changeBookShelf) {
          this.props.changeBookShelf(updateInfo)
      }
    }

    performSearch(searchQuery) {
      this.setState({
        searchQuery: searchQuery.trim()
      })

      if (this.state.searchQuery && this.props.onPerformSearch) {
        this.props.onPerformSearch(this.state.searchQuery)
      }
    }
    
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link 
                to="/"
                className="close-search"
              >Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  onChange={(event) => this.performSearch(event.target.value)}  
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.props.searchBooks.map((book) => (
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
          </div>
        )
    }
}

export default SearchComponent