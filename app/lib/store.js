import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/searchSlice';

export const store = () => {
  return configureStore({
    reducer: {
        search: searchReducer,
    }
  })
}
// export default store