import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FaCheckCircle} from "react-icons/fa";
function AssignmentEditor() {
    const { assignmentId } = useParams();
    const assignment = assignments.find(
        (assignment) => assignment._id === assignmentId);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const handleSave = () => {
        console.log("Actually saving assignment TBD in later assignments");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    return (
      <div className="mt-3 me-1">
        <div className="d-flex justify-content-end">
          <div className="me-2" style={{color: "green"}}>
            <FaCheckCircle />
            <span> Published</span>
          </div>
          <button className="btn btn-secondary btn-sm">
            <BsThreeDotsVertical />
          </button>
        </div>
        <h3>Assignment Name</h3>
        <input value={assignmentId + " - " + assignment?.title} className="form-control mb-2" />
        <button onClick={handleSave} className="btn btn-success ms-2 float-end">
          Save
        </button>
        <Link
          to={`/Kanbas/Courses/${courseId}/Assignments`}
          className="btn btn-danger float-end"
        >
          Cancel
        </Link>
      </div>
    );
}

export default AssignmentEditor;