import React from "react";
import {FaFileImport, FaRegBell, FaRegCalendarAlt} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import "./Status.css";

import assignments from "../../Database/assignments.json";
import {BiImport, BiTargetLock} from "react-icons/bi";
import {IoBarChart} from "react-icons/io5";
import {GrAnnounce} from "react-icons/gr";
function Status() {
  const { courseId } = useParams();
  const filteredAssignments = assignments.filter(
    (assignment) => assignment.course === courseId,
  );

  return (
    <div>
      <div className="d-grid gap-2 mb-2">
        <Link to="#" className="linkButton">
          <FaFileImport className="linkButtonIcon" /> Import Existing Content
        </Link>
        <Link to="#" className="linkButton">
          <BiImport className="linkButtonIcon" /> Import from Commons
        </Link>
        <Link to="#" className="linkButton">
          <BiTargetLock className="linkButtonIcon" /> Choose Home Page
        </Link>
        <Link to="#" className="linkButton">
          <IoBarChart className="linkButtonIcon" /> View Course Stream
        </Link>
        <Link to="#" className="linkButton">
          <GrAnnounce className="linkButtonIcon" /> New Announcement
        </Link>
        <Link to="#" className="linkButton">
          <IoBarChart className="linkButtonIcon" /> New Analytics
        </Link>
        <Link to="#" className="linkButton">
          <FaRegBell className="linkButtonIcon" /> View Course Notifications
        </Link>
      </div>
      <span className="todoTitle">To Do</span>
      <hr />
      <div>
        {filteredAssignments.map((assignment) => (
          <Link to="#" className="todoLink row" key={assignment._id}>
            <div className="col-2 todoDateIcon">
              <FaRegCalendarAlt />
            </div>
            <div className="col-10">
              <div className="todoCourse">{assignment.course}</div>
              <div className="todoAssignment">{assignment.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Status;
