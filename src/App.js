import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { getAll, update } from "./BooksAPI";

import Main from "./pages/Main";
import Search from "./pages/Search";
import "./App.css";

export default class BooksApp extends Component {
  state = {
    books: [],
    updateShelf: (book, shelf) => this.updateShelf(book, shelf)
  };

  componentDidMount() {
    getAll().then(books => {
      // Sort shelves
      books.sort(this.sortShelves);

      this.setState({ books });
    });
    console.log(this.state.books);
  }

  sortShelves = (a, b) => {
    return a.shelf >= b.shelf ? 1 : -1;
  };

  // Update shelf of the book
  updateShelf = (book, shelf) => {
    update(book, shelf).then(resp => {
      book.shelf = shelf;
      this.setState({
        books: [...this.state.books.filter(b => b.id !== book.id), book].sort(
          this.sortShelves
        )
      });
    });
  };

  render() {
    const { books, updateShelf } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Main books={books} updateShelf={updateShelf} />}
          />
          <Route
            path="/search"
            render={() => (
              <div className="search-books">
                <Search books={books} updateShelf={updateShelf} />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}
