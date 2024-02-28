import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./Courses";
import db from "./Database";
import { useState } from "react";

function Kanbas() {
  const [courses, setCourses] = useState(db.courses);
  const [course, setCourse] = useState({
    _id: "", // id placeholder
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "husky.jpg", // default image
  });
  const addNewCourse = () => {
    setCourses([
      ...courses,
      { ...course, _id: new Date().getTime().toString() },
    ]);
  };
  const deleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = () => {
    if (!course._id) {
      // Optionally handle the case where _id is not set, e.g., warning log or early return
      console.warn("Attempted to update a course without an _id.");
      return;
    }
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return { ...course, image: course.image || "husky.jpg" };
        } else {
          return c;
        }
      }),
    );
  };

  return (
    <div className="d-flex">
      <div>
        <KanbasNavigation />
      </div>
      <div style={{ flexGrow: 1 }}>
        <Routes>
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
          <Route
            path="Courses/:courseId/*"
            element={<Courses courses={courses} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Kanbas;
