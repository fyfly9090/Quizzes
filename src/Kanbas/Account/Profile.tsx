import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, updateCurrentUser } from "./accountReducer";
import * as userClient from "../Courses/People/client"


export default function Profile() {
  
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  const saveUser = async() => {
    const status = await userClient.updateUser(profile);
    dispatch(updateCurrentUser(profile));
    setProfile(profile);
  }


  useEffect(() => { 
    fetchProfile(); }, []);
  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
         <div className="aligh-left">
         <div className="mb-2 row">
           <label htmlFor="un" className = "me-2 col-1">Your username</label>
           <input id="un" className="wd-username profile-style col-2" value={profile.username}
                onChange={(e) => setProfile({ ...profile, username:  e.target.value })}/>
         </div>
         <div className="row mb-2">
           <label htmlFor="ps" className = "me-2 col-1">Your password</label>          
           <input id="ps" className="wd-password profile-style col-2" value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}/>
         </div>
         <div className="row mb-2">
           <label htmlFor="fn" className = "me-2 col-1">Your first name</label>
           <input id = "fn" className="wd-firstname profile-style col-2" value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/>
         </div>
         <div className="row mb-2">
           <label htmlFor="ln" className = "me-2 col-1">Your last name</label>
           <input id="ln" className="wd-lastname profile-style col-2" value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}/>
         </div>
         <div className="row mb-2">
           <label htmlFor="dob" className = "me-2 col-1">Date of birth</label>
           <input id="dob" className="wd-dob profile-style col-2" value={profile.dob}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date"/>
         </div>
         <div className="row mb-2">
           <label htmlFor="email" className = "me-2 col-1">Your email</label>
           <input id="email" className="wd-email profile-style col-2" value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}/>
         </div>
         <div className="row mb-2">
         <label htmlFor="rl" className = "me-2 col-1">Your role</label>
         <select id = "rl" className="wd-role profile-style col-2" onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
           <option value="FACULTY" selected = {profile.role==="FACULTY"}>Faculty</option>      
           <option value="STUDENT" selected = {profile.role==="STUDENT"}>Student</option>
         </select>
         </div>
         <div>
         <button onClick={()=>saveUser()} className="wd-signout-btn btn btn-primary width-style me-4">
           Save
         </button>
         <button onClick={signout} className="wd-signout-btn btn btn-danger width-style ms-5">
           Sign out
         </button>
         </div>
       </div>
      )}
    </div>
  );
}
