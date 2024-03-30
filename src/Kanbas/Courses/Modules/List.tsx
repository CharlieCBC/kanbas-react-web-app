import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./modulesReducer";
import { KanbasState } from "../../store";

function ModuleList() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules,
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module,
  );

  useEffect(() => {
    client
      .findModulesForCourse(courseId)
      .then((modules) => dispatch(setModules(modules)));
  }, [courseId, dispatch]);

  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

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
              onClick={handleUpdateModule}
            >
              Update
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={handleAddModule}
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
              key={module._id}
              className="list-group-item"
              onClick={() => setSelectedModule(module)}
            >
              <div>
                <FaEllipsisV className="me-2" />
                {module.name + " - " + module.description}
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
                    onClick={() => handleDeleteModule(module._id)}
                  >
                    Delete
                  </button>
                </span>
              </div>
              {selectedModule && selectedModule?._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson) => (
                    <li key = {lesson._id} className="list-group-item">
                      <FaEllipsisV className="me-2" />
                      {lesson.name + " - " + lesson.description}
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
