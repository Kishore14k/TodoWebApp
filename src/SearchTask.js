import React from "react";

const SearchTask = ({ search, setSearch }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="textbox"
        placeholder="Search a Task"
        className="searchpotti"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchTask;
