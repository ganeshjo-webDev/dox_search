import { createSlice } from "@reduxjs/toolkit";


// Initial state
const initialState = {
  query: '',
  loading: false,
  error: null,
  searchResults: []
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
    },
  });

  export const { setQuery, setResults, setLoading, setError } = searchSlice.actions;

  export default searchSlice.reducer;
