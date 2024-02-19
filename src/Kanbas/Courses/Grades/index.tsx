import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import { FaChevronDown, FaFileExport, FaFileImport } from "react-icons/fa";
import React from "react";
import { IoMdSettings } from "react-icons/io";
import { IoFunnelOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  return (
    <div className="mt-3 me-1">
      <div className="gap-1 d-flex justify-content-end">
        <button type="button" className="btn btn-secondary btn-sm">
          <FaFileImport /> Import
        </button>
        <div className="dropdown">
          <button
            className="btn btn-secondary btn-sm dropdown-toggle"
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
      <div className="table-responsive">
        <table className="table">
          <thead>
            <th>Student Name</th>
            {as.map((assignment) => (
              <th>{assignment.title}</th>
            ))}
          </thead>
          <tbody>
            {es.map((enrollment) => {
              const user = users.find((user) => user._id === enrollment.user);
              return (
                <tr>
                  <td>
                    {user?.firstName} {user?.lastName}
                  </td>
                  {assignments.map((assignment) => {
                    const grade = grades.find(
                      (grade) =>
                        grade.student === enrollment.user &&
                        grade.assignment === assignment._id,
                    );
                    return <td>{grade?.grade || ""}</td>;
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
