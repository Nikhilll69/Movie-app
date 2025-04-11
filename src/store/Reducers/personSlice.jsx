import { createSlice } from "@reduxjs/toolkit";

const PersonSlice = createSlice({
  name: "person",
  initialState: {
   info:null
  },
  reducers: {
    loadPerson: (state, action) => {
      state.info = action.payload;
    },
    removePerson: (state) => {
      state.info = null;
    },
  }
});
export const { loadPerson,removePerson} = PersonSlice.actions

export default PersonSlice.reducer
