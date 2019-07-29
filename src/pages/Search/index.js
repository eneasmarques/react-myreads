import React from "react";

import SearchBook from "./../../components/SearchBook";

export default function Search(props) {
  const { books, updateShelf } = props;
  console.log("Search", books, updateShelf);
  return (
    <div className="search-books">
      <SearchBook books={books} updateShelf={updateShelf} />
    </div>
  );
}
