import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
};

const questionsSlice = createSlice({
    name:"questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions=action.payload;
        },
        addQuestion: (state, {payload: question}) => {
            const newQuestion: any = {
                _id: new Date().getTime().toString(),
                quiz: question.quiz,
                type: question.type,
                points: question.points,
                description: question.description,
                answers:[],
            };
            
            newQuestion.answers=[...newQuestion.answers, ...question.answers]
            
            state.questions = [...state.questions, newQuestion] as any;
        },   
        editQuestion: (state, {payload: questionId}) => {
            state.questions = state.questions.map ((qt: any) => 
            qt._id === questionId ? {...qt, editing:true} : qt) as any;
        },
        updateQuestion: (state, {payload: question}) => {
            state.questions = state.questions.map((qt: any) => 
            qt._id === question._id ? question: qt) as any;
        },
        deleteQuestion: (state, {payload:questionId}) => {
            state.questions = state.questions.filter((qt:any)=>qt._id !== questionId)
        }
    }
});

export const {setQuestions, addQuestion, updateQuestion, editQuestion, deleteQuestion} = questionsSlice.actions;
export default questionsSlice.reducer;
