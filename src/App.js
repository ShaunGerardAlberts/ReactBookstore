import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelvesComponent from './ShelvesComponent'
import SearchComponent from './SearchComponent'
import BooksComponent from './BooksComponent'

class App extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: true
    books: [ ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        {/* {JSON.stringify(this.state)} */}
        <BooksComponent books={this.state.books} />
        <Route exact path="/" render={() => (
          <ShelvesComponent
            books={this.state.books}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchComponent
          />
        )}/>
        {/* {this.state.showSearchPage ? (
          <SearchComponent/>
        ) : (
          <ShelvesComponent/>
        )} */}
      </div>
    )
  }
}

export default App
