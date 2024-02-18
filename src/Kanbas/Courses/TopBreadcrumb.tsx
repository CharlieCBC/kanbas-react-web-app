import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FaBars, FaGlasses } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { courses } from "../Database";

function TopBreadcrumb() {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === courseId);

  return (
      <div>
        <h4>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <Link
                  to={`/Kanbas/Courses/${courseId}/Home`}
                  className="text-danger mt-2"
                  style={{ textDecoration: "none" }}
              >
                <FaBars className="mx-2" />
                {course ? course.number : "Course Number"}
              </Link>
              <div className="mt-1">
                <MdOutlineKeyboardArrowRight />
              </div>
              <div className="mt-2">{pathname.split("/").pop()}</div>
            </div>
            <button className={"mt-2 me-2 btn btn-outline-secondary"}>
              <FaGlasses /> Student View
            </button>
          </div>
        </h4>
        <hr style={{marginLeft: "10px" }} />
      </div>
  );
}

export default TopBreadcrumb;
