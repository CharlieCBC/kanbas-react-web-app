import React, { useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
} from "./modulesReducer";
import { KanbasState } from "../../store";

function ModuleList() {
  const { courseId } = useParams();
  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules,
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module,
  );
  const dispatch = useDispatch();

  const [selectedModule, setSelectedModule] = useState(moduleList[0]);
  return (
    <>
      <div className="d-flex justify-content-end wd-flex-row-container mt-3 me-1">
        <div>
          {/*<button>Collapse All</button>*/}
          {/*<button>View Progress</button>*/}
          {/*<select>*/}
          {/*  <option>Publish All</option>*/}
          {/*  <option>Unpublish All</option>*/}
          {/*</select>*/}
          {/*<button>+ Module</button>*/}
          {/*<button>*/}
          {/*  <BsThreeDotsVertical />*/}
          {/*</button>*/}
          <div className="d-flex">
            <textarea
              placeholder="Module Name"
              value={module.name}
              onChange={(e) =>
                dispatch(setModule({ ...module, name: e.target.value }))
              }
            />
            <textarea
              placeholder="Module Description"
              value={module.description}
              onChange={(e) =>
                dispatch(setModule({ ...module, description: e.target.value }))
              }
            />
          </div>

          <div className="mt-1 d-flex justify-content-end">
            <button
              className="me-2 btn btn-sm btn-primary"
              onClick={() => dispatch(updateModule(module))}
            >
              Update
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={() =>
                dispatch(addModule({ ...module, course: courseId }))
              }
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <ul className="list-group wd-modules">
        {moduleList
          .filter((module) => module.course === courseId)
          .map((module) => (
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
                  <button
                    className="me-2 btn btn-edit"
                    onClick={() => dispatch(setModule(module))}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-delete-assignment"
                    onClick={() => dispatch(deleteModule(module._id))}
                  >
                    Delete
                  </button>
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
