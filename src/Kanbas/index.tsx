import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import "./styles.css";
import * as client from "./Courses/client";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import RegisterCourses from "./Register";
import Session from "./Account/Session"


export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>([{
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  }]);
  const [error, setError] = useState("");
  const addNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      setCourses([...courses, newCourse]);
      setError("");
    } catch(err:any) {
      setError(err.response.data.message);
    }  
  };
  
  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kanbas" className="h-100">    
        <div className = "d-flex h-100">
        <div className = "d-none d-md-block bg-black">
          <KanbasNavigation />
        </div>
        <div className="flex-fill p-4">
          <Routes>
            <Route path="/Account/*" element={<Account />} />
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Dashboard" element={<ProtectedRoute> <Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
              error={error}/> </ProtectedRoute> } />
            <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
            <Route path="/Calendar" element={<h2>Calendar</h2>} />
            <Route path="/Inbox" element={<h2>Inbox</h2>} />
            <Route path="/Register" element={<ProtectedRoute><RegisterCourses courses={courses}/></ProtectedRoute>} />
          </Routes>
        </div>        
        </div>
      </div>
    </Session>
    </Provider>
);}

