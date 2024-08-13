import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentQuiz: {},
};
const accountSlice = createSlice({
  name: "currentQuiz",
  initialState,
  reducers: {
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
  },
});
export const { setCurrentQuiz } = accountSlice.actions;
export default accountSlice.reducer;