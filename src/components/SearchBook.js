import React, { Component } from "react";
import { Link } from "react-router-dom";

import { search } from "./../BooksAPI";

import Book from "./Book";

export default class SearchBook extends Component {
  state = {
    query: '',
    searchedBooks: []
  };

  handleSearch = async e => {
    const { books } = this.props;
    await this.setState({query : e.target.value});
    const { query } = this.state;

    

    console.log(query)
    
    query
      ? await search(query).then(searchedBooks => {
          searchedBooks.length > 0 &&
            searchedBooks.map(search => {
              search.shelf = "none";
              return books.forEach(book => {
                if (search.id === book.id) search.shelf = book.shelf;
              });
            });

          this.setState({ searchedBooks });
        })
      : await this.setState({ searchedBooks: [] });
  };

  render() {
    const { searchedBooks, query } = this.state;
    const { updateShelf, books } = this.props;

    console.log("searchedBooks:", this.state.searchedBooks);

    return (
      <>
        <div className="search-books-bar">
          <Link to={"/"}>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.handleSearch(e)}
              value={this.state.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query && searchedBooks && searchedBooks.length > 0 &&
              searchedBooks.map(searchedBook => (
                <li key={searchedBook.id}>
                  <Book
                    book={searchedBook}
                    books={books}
                    updateShelf={updateShelf}
                  />
                </li>
              ))}
          </ol>
        </div>
      </>
    );
  }
}
