'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchSearchResults from '../api/kendra';
import { setQuery, setResults, setLoading, setError, setIsSearchResultFound } from '../lib/features/searchSlice';

export function SearchInput() {
  const searchTerm = useSelector((state) => state.search.query);
  const isSearchInProgress = useSelector((state) => state.search.loading);
  const isSearchResultFound = useSelector((state) => state.search.isSearchResultFound);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm === '') {
      dispatch(setIsSearchResultFound(false));
      dispatch(setError('Please enter a search term.'));
      return;
    }
    dispatch(setResults([]));
    dispatch(setError(null));
    dispatch(setIsSearchResultFound('nope'));
    getSearchResults();
  };

  const getSearchResults = () => {
    dispatch(setLoading(true));
    const searchPromise = fetchSearchResults(searchTerm);
    searchPromise.then(function(response){
      console.log(response);
      dispatch(setLoading(false));
      dispatch(setResults(response.ResultItems));
      dispatch(setIsSearchResultFound(response.ResultItems.length > 0));
    }, function(err) {
      console.log(err);
      dispatch(setLoading(false));
      dispatch(setError(err.__type + ': ' + err.message));
      dispatch(setIsSearchResultFound(false));
    })
  }

  return (
    <>
    <div className="shadow-md bg-slate-200">
      <form onSubmit={handleSearch} className="items-center space-y-4 px-4 py-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          className="px-4 py-2 border borde-gray-300 rounded-md mr-2"
        />
        <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md">
          Search
        </button>
      </form>
      {isSearchInProgress && <div className="italic space-y-4">Searching...</div>}
      {/* {!isSearchResultFound && !isSearchInProgress && <div className="italic">Typing...</div>} */}
      {isSearchResultFound===true && <div className="italic">Showing search results for '{searchTerm}'</div>}
    </div>
    </>
  );
}
