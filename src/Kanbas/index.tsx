import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Account from "./Account";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";
import * as client from "./client";
import { Course } from "./client";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;

function Kanbas() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course>({
    _id: "", // id placeholder
    name: "",
    number: "",
    image: "husky.jpg", // default image
  });

  const findAllCourses = async () => {
    const courses = await client.findAllCourses();
    setCourses(courses);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  const addNewCourse = async () => {
    if (
      !course.name ||
      !course.number ||
      course.name === "" ||
      course.number === ""
    ) {
      return;
    }
    try {
      const newCourse = await client.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCourse = async (course: Course) => {
    try {
      await client.deleteCourse(course);
      setCourses(courses.filter((c) => c._id !== course._id));
    } catch (err) {
      console.log(err);
    }
  };

  const updateCourse = async () => {
    if (
      !course.name ||
      !course.number ||
      course.name === "" ||
      course.number === ""
    ) {
      return;
    }
    try {
      const status = await client.updateCourse(course);
      setCourses(courses.map((c) => (c._id === course._id ? course : c)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Provider store={store}>
      <div className="d-flex">
        <div>
          <KanbasNavigation />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/Account/*" element={<Account />} />
            <Route path="/" element={<Navigate to="Dashboard" />} />
            {/*<Route path="/Account" element={<Account/>}/>*/}
            <Route
              path="/Dashboard"
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default Kanbas;
