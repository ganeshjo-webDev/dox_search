'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export function SearchResults() {
    const searchResults = useSelector((state) => state.search.searchResults);
    const searchError = useSelector((state) => state.search.error);
    const isSearchResultFound = useSelector((state) => state.search.isSearchResultFound);
    return (
        <>
          <div className="shadow-md mt-8">
            { isSearchResultFound ? searchResults.map((result) => (    
                <div className="row py-2">
                  <div className="row-span-1 text-sm font-bold">{result.DocumentTitle.Text}</div>
                   <div className="row-span-1 underline"> <Link href={result.DocumentURI} className="text-blue-500 hover:underline" target="_blank">
                      {result.DocumentURI}
                    </Link>
                  </div>
                </div>
            )) : searchError ? <div className="grid-flow-row text-sm font-bold">{searchError}</div>
               : <div className="grid-flow-row text-sm font-bold">No search results found for the given query..</div>
            }
          </div>
        </>
    );
  }