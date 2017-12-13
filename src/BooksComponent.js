import React, { Component } from 'react'

class BooksComponent extends Component {
    render() {
        const { books } = this.props
        //get the different arrays by categories, contined in shelf
        const currentlyReading = books.filter((book) => book.shelf === "currentlyReading" )
        const wantToRead = books.filter((book) => book.shelf === "wantToRead")
        const alreadyRead = books.filter((book) => book.shelf === "read")
        return (
            <div>{alreadyRead.map((book) => (
                <div>{book.title}</div>
            ))}
            </div>
        )
    }
}

export default BooksComponent