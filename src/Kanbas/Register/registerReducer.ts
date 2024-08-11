import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";


const initialState = {
    enrollments: [],
};

const enrollmentsSlice = createSlice ({
    name: "quizzes",
    initialState,
    reducers: {
        setEnrollments :(state, action) => {
            state.enrollments = action.payload
        },

        addEnrollment: (state,{payload:enrollment}) => {
            const newEnrollment:any = {
                "_id": enrollment._id,
                "user": enrollment.user,
                "course": enrollment.course,
            }
            state.enrollments =  [...state.enrollments, newEnrollment] as any;
        },
        deleteEnrollment:(state, {payload: enrollment}) => {
            state.enrollments = state.enrollments.filter((e:any)=>(e.course!==enrollment.course || e.user!==enrollment.user));
        },
        
    }
  
})  
export const { setEnrollments, addEnrollment, deleteEnrollment, } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;  