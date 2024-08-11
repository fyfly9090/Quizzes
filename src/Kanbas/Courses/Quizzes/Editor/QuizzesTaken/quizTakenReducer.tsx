import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzesTaken: [],
};

const quizTakenSlice = createSlice({
    name:"quizzesTaken",
    initialState,
    reducers: {
        setCurrentQuizzes: (state, action) => {
            state.quizzesTaken = action.payload;
        },
        addQuizTaken: (state, {payload:quizTaken}) => {
            const newQuizTaken: any = {
                "_id": quizTaken._id,
                "user": quizTaken.user,
                "quiz": quizTaken.quiz,
                "attempts": quizTaken.attempts,
                "score": quizTaken.score,
                "answer": quizTaken.answers,
            }
            state.quizzesTaken = [...state.quizzesTaken, newQuizTaken] as any;
        },
        updateQuizTaken: (state, {payload:quizTaken}) => {
            state.quizzesTaken = state.quizzesTaken.map((qt: any) => 
                qt._id===quizTaken._id? quizTaken: qt) as any;
        }
    },
});
export const { setCurrentQuizzes, addQuizTaken, updateQuizTaken } = quizTakenSlice.actions;
export default quizTakenSlice.reducer;