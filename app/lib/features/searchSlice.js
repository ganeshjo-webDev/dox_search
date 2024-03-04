import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  query: '',
  loading: false,
  error: null,
  searchResults: [],
  isSearchResultFound: 'nope'
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
      setQuery: (state, action) => {
        state.query = action.payload;
      },
      setResults: (state, action) => {
        state.searchResults = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
      setIsSearchResultFound: (state, action) => {
        state.isSearchResultFound = action.payload;
      }
    },
});

// export const select

export const { setQuery, setResults, setLoading, setError, setIsSearchResultFound } = searchSlice.actions;

export default searchSlice.reducer;
