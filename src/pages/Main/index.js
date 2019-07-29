import React, { Component } from "react";
import { Link } from "react-router-dom";

import Shelf from "./../../components/Shelf";

export default class Main extends Component {
  state = {
    shelfs: [
      {
        key: "",
        value: ""
      }
    ]
  };

  generateShelfs = () => {
    const { books } = this.props;

    const shelfs = books
      .map(book => book.shelf)
      .filter(
        (shelf, index, filterShelf) =>
          shelf !== "none" && filterShelf.indexOf(shelf) === index
      )
      .map(filterShelf => {
        let value = filterShelf.replace(/([A-Z])/g, " $1");
        value = value.charAt(0).toUpperCase() + value.slice(1);

        return { key: filterShelf, value };
      })
      .sort();

    this.setState({ shelfs });
  };

  componentDidMount() {
    this.generateShelfs();
  }

  render() {
    const { books } = this.props;
    const { shelfs } = this.state;

    return (
      <>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="list-books-content" />
          {shelfs && shelfs.length > 0 && (
            <Shelf
              books={books}
              shelfs={shelfs}
              updateShelf={this.props.updateShelf}
            />
          )}

          <div className="open-search">
            <Link to={"/search"}>
              <button>Add a books</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
