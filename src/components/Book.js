import React from "react";

import ShelfChanger from "./ShelfChanger";

export default function Book({ book, books, updateShelf }) {
  return book ? (
    <div className="book">
      <div className="book-top">
        <img
          className="book-cover"
          src={book.imageLinks && book.imageLinks.smallThumbnail}
          width={128}
          height={188}
          alt=""
        />
        <div className="book-shelf-changer">
          <ShelfChanger book={book} updateShelf={updateShelf} />
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book &&
        book.authors &&
        book.authors.map(author => (
          <div className="book-authors" key={author}>
            {author}
          </div>
        ))}
    </div>
  ) : null;
}
