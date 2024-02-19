import React from "react";
import { useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import TopBreadcrumb from "./TopBreadcrumb";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import { courses } from "../../Kanbas/Database";
import "./index.css";
import { Navigate, Route, Routes } from "react-router";
import TopBar from "./TopBar"; // Assume your CSS is defined here

function Courses() {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);

  return (
    <div>
      <TopBar />
      <TopBreadcrumb />
      <div className="course-container">
        <CourseNavigation />
        <div className="course-content">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;
