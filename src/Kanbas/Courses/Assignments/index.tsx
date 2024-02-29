import React from "react";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaPlusCircle,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AssignmentsState } from "../../store";

function Assignments() {
  const { courseId } = useParams();

  const assignments = useSelector(
    (state: AssignmentsState) => state.assignmentsReducer.assignments,
  );
  const assignment = useSelector(
    (state: AssignmentsState) => state.assignmentsReducer.assignment,
  );
  const dispatch = useDispatch();

  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === courseId,
  );
  return (
    <>
      <div className="mt-3 me-1">
        <input
          type="text"
          className="float-start form-control w-25"
          placeholder="Search for Assignment"
        />
        <div className="text-end">
          <button className="btn btn-secondary me-2">
            <FaPlus /> Group
          </button>
          <button
            className="btn me-2"
            style={{ color: "white", backgroundColor: "red" }}
          >
            <FaPlus /> Assignment
          </button>
          <button className="btn btn-secondary">
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>

      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignments
              .filter((assignment) => assignment.course === courseId)
              .map((assignment, index) => (
                <li className="list-group-item">
                  <FaEllipsisV className="me-2" />
                  <Link
                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                  >
                    {assignment.title}
                  </Link>
                  <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaEllipsisV className="ms-2" />
                  </span>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </>
  );
}

export default Assignments;
