'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import fetchSearchResults from '../api/kendra';
import { setQuery, setResults, setLoading, setError } from '../lib/features/searchSlice';

export function SearchInput() {
  const searchTerm = useSelector((state) => state.search.query);
  const isSearchInProgress = useSelector((state) => state.search.loading);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(setResults([]));
    dispatch(setLoading(true));
    const searchPromise = fetchSearchResults(searchTerm);
    searchPromise.then(function(response){
      console.log(response)
      dispatch(setResults(response.ResultItems));
      dispatch(setLoading(false));
    }, function(err) {
      console.log(err);
      dispatch(setError(err.__type + ': ' + err.message));
      dispatch(setLoading(false));
      return err;
    })
  };

  return (
    <>
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        className="px-4 py-2 border borde-gray-300 rounded-md mr-2"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Search
      </button>
    </form>
    {isSearchInProgress && <div>Loading...</div>}
    {!isSearchInProgress && searchTerm && <div>Showing search results for {searchTerm}</div>}
    </>
  );
}

export function SearchResults() {
  const searchResults = useSelector((state) => state.search.searchResults);
  const searchError = useSelector((state) => state.search.error);
  const searchQuery = useSelector((state) => state.search.query);
  return (
      <>
        { searchResults && searchResults.length > 0 ? searchResults.map((result) => (    
              <div className="row py-2">
                <div className="row-span-1 text-decoration-thickness: 1px;">{result.DocumentTitle.Text}</div>
                 <div className="row-span-1"> <Link href={result.DocumentURI} className="text-blue-500 hover:underline" target="_blank">
                    {result.DocumentURI}
                  </Link>
                </div>
              </div>
          )) : <div className="grid-flow-row">{searchError}</div>}
      </>
  );
}