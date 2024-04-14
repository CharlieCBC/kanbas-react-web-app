import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { Module } from "./client";

function ModuleList() {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [module, setModule] = useState<Module>({
    _id: "",
    name: "",
    description: "",
    course: "",
    lessons: [{}],
  });

  const [moduleList, setModuleList] = useState<Module[]>([]);

  // const moduleList = useSelector(
  //   (state: KanbasState) => state.modulesReducer.modules,
  // );
  // const module = useSelector(
  //   (state: KanbasState) => state.modulesReducer.module,
  // );

  const findModulesForCourse = async (courseId) => {
    const modules = await client.findModulesForCourse(courseId);
    setModuleList(modules);
  };
  useEffect(() => {
    findModulesForCourse(courseId);
  }, []);

  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  const handleAddModule = async () => {
    if (
      !module.name ||
      !module.description ||
      module.name === "" ||
      module.description === ""
    ) {
      window.alert("Module name and description are required");
      return;
    }
    try {
      const newModule = await client.createModule(courseId, module);
      setModuleList([...moduleList, newModule]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    try {
      await client.deleteModule(moduleId);
      setModuleList(moduleList.filter((m) => m._id !== moduleId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateModule = async () => {
    if (
      !module.name ||
      !module.description ||
      module.name === "" ||
      module.description === ""
    ) {
      window.alert("Module name and description are required");
      return;
    }
    try {
      const status = await client.updateModule(module);
      setModuleList(moduleList.map((m) => (m._id === module._id ? module : m)));
    } catch (err) {
      console.log(err);
    }
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
              onChange={(e) => setModule({ ...module, name: e.target.value })}
            />
            <textarea
              placeholder="Module Description"
              value={module.description}
              onChange={(e) =>
                setModule({ ...module, description: e.target.value })
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
                    onClick={() => setModule(module)}
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
                    <li key={lesson._id} className="list-group-item">
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
