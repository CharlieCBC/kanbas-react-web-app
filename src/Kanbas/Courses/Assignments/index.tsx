import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaPlusCircle,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AssignmentsState } from "../../store";
import * as client from "./client";
import {
  // addAssignment,
  deleteAssignment,
  // updateAssignment,
  setAssignments,
} from "./assignmentsReducer";
import { Button, Modal } from "react-bootstrap";

function Assignments() {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const assignments = useSelector(
    (state: AssignmentsState) => state.assignmentsReducer.assignments,
  );
  const assignment = useSelector(
    (state: AssignmentsState) => state.assignmentsReducer.assignment,
  );

  useEffect(() => {
    client.findAssignmentsForCourse(courseId).then((assignments) => {
      dispatch(setAssignments(assignments));
    });
  }, [courseId, dispatch]);

  // const courseAssignments = assignments.filter(
  //   (assignment) => assignment.course === courseId,
  // );

  // State to control the visibility of the dialog and store the selected assignment ID
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState("");

  const navigate = useNavigate();

  const handleClickAddAssignment = () => {
    navigate(`/Kanbas/Courses/${courseId}/Assignments/Editor`);
  };

  // Handlers for showing and hiding the dialog
  const handleShowDeleteDialog = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    setShowDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    client.deleteAssignment(assignmentId).then((status) => {
      dispatch(deleteAssignment(assignmentId));
    });
    setShowDeleteDialog(false);
  };

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
            onClick={handleClickAddAssignment}
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

          <Modal show={showDeleteDialog} onHide={handleCloseDeleteDialog}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to remove this assignment?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteDialog}>
                No
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteAssignment(selectedAssignmentId)}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          <ul className="list-group">
            {assignments
              .filter((assignment) => assignment.course === courseId)
              .map((assignment) => (
                <li key={assignment._id} className="list-group-item">
                  <FaEllipsisV className="me-2" />
                  <Link
                    className="wd-links"
                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                  >
                    {assignment.title +
                      " | " +
                      assignment.description +
                      " | Due Date: " +
                      assignment.dueDate +
                      " Points: " +
                      assignment.points}
                  </Link>
                  <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaEllipsisV className="ms-2" />
                    <button
                      className="btn btn-danger btn-delete-assignment"
                      onClick={() => handleShowDeleteDialog(assignment._id)}
                    >
                      Delete
                    </button>
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
