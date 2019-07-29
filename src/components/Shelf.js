import React, { Component } from "react";

import Book from "./Book";

export default class Search extends Component {
  render() {
    const { shelfs, books, updateShelf } = this.props;

    return shelfs.map(shelf => (
      <div className="bookshelf" key={shelf.key}>
        <h2 className="bookshelf-title">{shelf.value}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books &&
              books.map(
                book =>
                  book.shelf === shelf.key && (
                    <li key={book.id}>
                      <Book
                        book={book}
                        books={books}
                        updateShelf={updateShelf}
                      />
                    </li>
                  )
              )}
          </ol>
        </div>
      </div>
    ));
  }
}
