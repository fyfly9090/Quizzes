import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTION_API = `${REMOTE_SERVER}/api/questions`;

export const findQuestionsForQuiz = async(quizId: string) => {
    const response = await axios.get(`${QUIZ_API}/${quizId}/questions`);
    return response.data;
}

export const deleteQuestion = async(questionId: string) => {
    const response = await axios.delete(`${QUESTION_API}/${questionId}`);
    return response.data;
}

export const createQuestion = async(quizId:string, question:any) => {
    const response = await axios.post(`${QUIZ_API}/${quizId}/questions`, question);
    return response.data;
}

export const updateQuestion = async(question:any) => {
    const response = await axios.put(`${QUESTION_API}/${question._id}`, question);
    return response.data;
}