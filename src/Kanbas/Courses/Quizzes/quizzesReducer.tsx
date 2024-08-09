import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";

const initialState = {
    quizzes: [],
};

const quizzesSlice = createSlice ({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes:(state,action) => {
            state.quizzes=action.payload;
        },
        addQuiz: (state, { payload:quiz }) =>{
           const newQuiz: any= {
            _id: quiz._id,
            title: quiz.title,
            course :quiz.course,
            point :quiz.points,
            instruction: quiz.instruction,
            type:quiz.type,
            group:quiz.group,
            shuffle:quiz.shuffle,
            multiple:quiz.multiple,
            code:quiz.code,
            oneQuestion:quiz.oneQuestion,
            webcam:quiz.webcam,
            lockQustion:quiz.lockQustion,
            time: quiz.time,
            timeLimit: quiz.timeLimit,
            due: quiz.due,
            available: quiz.available,
           };
           state.quizzes = [...state.quizzes, newQuiz] as any;
        },

        deleteQuiz: (state, { payload:quizId }) => {
           state.quizzes = state.quizzes.filter((q:any) => q._id !== quizId)
        },

        updateQuiz: (state, { payload:quiz }) => {
          state.quizzes = state.quizzes.map((q: any) =>
            q._id === quiz._id? quiz : q) as any;
        }
    }
})

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz/* , editQuizz  */} = quizzesSlice.actions;
export default quizzesSlice.reducer;