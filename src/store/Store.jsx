import { configureStore } from '@reduxjs/toolkit'
import movieReducer from "./Reducers/movieSlice"
import tvReducer from "./Reducers/tvSlice"
import personReducer from "./Reducers/personSlice"

const store= configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer
  },
})

export default store;