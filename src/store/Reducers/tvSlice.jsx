import { createSlice } from "@reduxjs/toolkit";

 const TvSlice = createSlice({
  name: "tv",
  initialState: {
   info:null
  },
  reducers: {
    loadTv: (state, action) => {
      state.info = action.payload;
    },
    removeTv: (state) => {
      state.info = null;
    },
  }
});
export const { loadTv,removeTv} = TvSlice.actions

export default TvSlice.reducer
