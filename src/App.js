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

  async componentDidMount() {
    console.log("App:".padEnd(20), "componentDidMount");
    await getAll().then(books => {
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
  updateShelf = async (book, shelf) => {
    // console.log("App:".padEnd(20), "startUpdateShelf");
    // Update books and sort shelves
    await update(book, shelf).then(resp => {
      book.shelf = shelf;
      this.setState({
        books: [...this.state.books.filter(b => b.id !== book.id), book].sort(
          this.sortShelves
        )
      });
    });
    // console.log(
    //   "App:".padEnd(20),
    //   "endUpdateShelf",
    //   this.state.books,
    //   this.state
    // );
  };

  render() {
    // console.log("App:".padEnd(20), this.state.books);
    const { books, updateShelf } = this.state;
    //books[0] && this.state.updateShelf(books[0], books[0].shelf);
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
