import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FaBars, FaGlasses } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import db from "../../Database";
import axios from "axios";

import {COURSES_API} from "../../client";

function TopBreadcrumb() {
  const { courseId } = useParams();
  const { pathname } = useLocation();

  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  // Ensure courseId is treated as a string, using an empty string as fallback
  const safeCourseId = courseId || "";

  const pathSegments = pathname
    .split("/")
    .filter(
      (segment, index, array) => segment && index > array.indexOf(safeCourseId),
    );

  return (
    <div>
      <h4>
        <div className="justify-content-between d-none d-md-flex">
          <div className="d-flex">
            <Link
              to={`/Kanbas/Courses/${courseId}/Home`}
              className="text-danger mt-2"
              style={{ textDecoration: "none" }}
            >
              <FaBars className="mx-2" />
              {course ? course.number : "Course Number"}
            </Link>
            <div className="mt-2">
              {pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <MdOutlineKeyboardArrowRight />
                  <span className="mt-2">{segment}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
          <button className={"mt-2 me-2 btn btn-outline-secondary"}>
            <FaGlasses /> Student View
          </button>
        </div>
      </h4>
      <hr style={{ marginLeft: "10px" }} />
    </div>
  );
}

export default TopBreadcrumb;
