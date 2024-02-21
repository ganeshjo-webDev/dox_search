'use client';

import React, { useState } from 'react';

export function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md mr-2"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Search
      </button>
    </form>
  );
}

export function SearchResults({ results }) {
  return (
    <ul className="mt-4">
      {results.map((result, index) => (
        <li key={index} className="py-2">{result}</li>
      ))}
    </ul>
  );
}