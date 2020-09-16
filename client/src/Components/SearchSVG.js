import React, { useState, useEffect } from "react";

const SearchSVG = (props) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchHandler = () => {
    if (searchActive) {
      const searchCriteria = {
        searchByDescription: searchText,
      };
      fetch("/bugs/findbug", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(searchCriteria),
      })
        .then((res) => res.json())
        .then((results) => {
          props.searchedBugsHandler(results.results);
        });
    }

    setSearchActive(true);
  };

  const searchTextHandler = (e) => {
    setSearchText(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    searchHandler();
  };

  return (
    <div style={{ display: "flex", color: "white" }}>
      {searchActive && (
        <div className="px-3 m-auto">
          <form method="GET" onSubmit={submitHandler}>
            <input
              id="searchBugs"
              name="searchBugs"
              autoComplete="off"
              formAction="/bugs"
              style={{ border: "none", borderRadius: "10px" }}
              type="text"
              onChange={searchTextHandler}
            ></input>
          </form>
        </div>
      )}
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          searchHandler();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-search"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#fff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="10" cy="10" r="7" />
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
      </div>
    </div>
  );
};

export default SearchSVG;
