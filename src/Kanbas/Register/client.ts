import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhose:4000"
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`
export const fetchAllEnrollments = async () => {
    const { data } = await axios.get(ENROLLMENTS_API)
    return data;
};

export const createEnrollment = async (enrollment: any) =>{
    const response = await axios.post(ENROLLMENTS_API, enrollment);
    return response.data
}

export const deleteEnrollment = async (cid:any, uid:any) => {
    const response = await axios.delete(`${ENROLLMENTS_API}/${cid}/${uid}`);
    return response.data;
}