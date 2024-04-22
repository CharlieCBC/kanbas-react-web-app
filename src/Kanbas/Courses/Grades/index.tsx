import db from "../../Database";
import { useParams } from "react-router-dom";
import { FaChevronDown, FaFileExport, FaFileImport } from "react-icons/fa";
import React from "react";
import { IoMdSettings } from "react-icons/io";
import { IoFunnelOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

function Grades() {
  const { courseId } = useParams();
  // Filter assignments and enrollments for the current course
  const courseAssignments = db.assignments.filter(
    (assignment) => assignment.course === courseId,
  );
  const courseEnrollments = db.enrollments.filter(
    (enrollment) => enrollment.course === courseId,
  );

  return (
    <div className="mt-3 me-1">
      <div className="gap-1 d-flex justify-content-end">
        <button type="button" className="btn btn-secondary btn-sm">
          <FaFileImport /> Import
        </button>
        <div className="dropdown">
          <button
            className="btn btn-secondary btn-sm"
            type="button"
            data-bs-toggle="dropdown"
          >
            <FaFileExport /> Export
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#"></a>
            </li>
          </ul>
        </div>
        <button className="btn btn-secondary btn-sm">
          <IoMdSettings />
        </button>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label htmlFor="search-student" className="form-label">
              Search Students
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <CiSearch />
              </span>
              <input type="text" className="form-control" id="search-student" />
              <span className="input-group-text">
                <FaChevronDown />
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label htmlFor="search-assignment" className="form-label">
              Search Assignments
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <CiSearch />
              </span>
              <input
                type="text"
                className="form-control"
                id="search-assignment"
              />
              <span className="input-group-text">
                <FaChevronDown />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <button className="btn btn-secondary btn-sm">
          <IoFunnelOutline /> Apply Filters
        </button>
      </div>

      {/* Table begin */}
      <div className="table-responsive table-bordered table-striped">
        <table className="table">
          <thead>
            <tr>
              <th>Student Name</th>
              {courseAssignments.map((assignment) => (
                <th className="text-center" key={assignment._id}>
                  {assignment._id + " - " + assignment.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courseEnrollments.map((enrollment) => {
              const user = db.users.find(
                (user) => user._id === enrollment.user,
              );
              return (
                <tr key={enrollment._id}>
                  <td>
                    {user?.firstName} {user?.lastName}
                  </td>
                  {courseAssignments.map((assignment) => {
                    const grade = db.grades.find(
                      (grade) =>
                        grade.student === enrollment.user &&
                        grade.assignment === assignment._id,
                    );
                    return (
                      <td className="text-center" key={assignment._id}>
                        {grade?.grade || "-"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grades;
