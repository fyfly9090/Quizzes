import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignments: [],
};
const assignmentsSlice = createSlice ({
    name: "assignments",

    initialState,
    reducers: {
        setAssignments :(state, action) => {
            state.assignments = action.payload;
        },
        addAssignment: (state, { payload:assignment }) => {
            const newAssignment: any = {
              "_id": new Date().getTime().toString(),
              "title": assignment.title,
              "course": assignment.course,
              "description": assignment.description,
              "points": assignment.points,
              "due": assignment.due,
              "available": assignment.available, 
            };
     
            state.assignments = [...state.assignments, newAssignment] as any;
        },

        deleteAssignment: (state, { payload:assignmentId }) => {
            state.assignments = state.assignments.filter((a: any) => a._id !== assignmentId);
        },

        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) => 
                a._id === assignment._id? assignment : a) as any;
        },
    }
}) 
export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;