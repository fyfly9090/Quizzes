import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import accountReducer from "../Account/accountReducer";
import quizzesReducer from "../Courses/Quizzes/quizzesReducer";
import questionsReducer from "../Courses/Quizzes/Editor/MakeQuizz/TypeOfQuestions/questionsReducer";
import registerReducer from "../Register/registerReducer";

const store = configureStore ({
    reducer: {
        modulesReducer,
        assignmentsReducer,
        accountReducer,
        quizzesReducer,
        questionsReducer,
        registerReducer,

    }
})

export default store;