import React, { Component } from "react";

export default class ShelfChanger extends Component {
  updateShelf = e => {
    this.props.updateShelf(this.props.book, e.target.value);
  };

  render() {
    const { book } = this.props;

    return (
      <select onChange={this.updateShelf} defaultValue={book.shelf}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}
