import React, { useState } from "react";
import "./index.css";
import db from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = db.modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  return (
    <>
      <div className="d-flex justify-content-end wd-flex-row-container mt-3 me-1">
        <div>
          <button>Collapse All</button>
          <button>View Progress</button>
          <select>
            <option>Publish All</option>
            <option>Unpublish All</option>
          </select>
          <button>+ Module</button>
          <button>
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>
      <ul className="list-group wd-modules">
        {modulesList.map((module) => (
          <li
            className="list-group-item"
            onClick={() => setSelectedModule(module)}
          >
            <div>
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson) => (
                  <li className="list-group-item">
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ModuleList;
