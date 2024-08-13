import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhose:4000";
const QUIZZESTAKEN_API = `${REMOTE_SERVER}/api/quizzesTaken`;

export const fetchQuizTaken = async ()=>{
    const { data } = await axios.get(`${QUIZZESTAKEN_API}`)
    return data;
}

export const fetchOneQuizTaken = async (uid:any, qid:string)=>{
    const { data } = await axios.get(`${QUIZZESTAKEN_API}/${uid}/${qid}:`)
    return data;
}

export const createQuizTaken = async (quizTaken: any) => {
    const response = await axios.post(`${QUIZZESTAKEN_API}`, quizTaken)
    return response.data;
}

export const updateQuizTaken = async (quizTaken: any) => {
    const response = await axios.put(`${QUIZZESTAKEN_API}/${quizTaken._id}`, quizTaken);
    return response.data;
}