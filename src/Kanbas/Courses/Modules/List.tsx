import React, { useState } from "react";
import "./index.css";
import db from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";

function ModuleList() {
  const { courseId } = useParams();
  const [moduleList, setModuleList] = useState(db.modules);
  const [module, setModule] = useState({
    _id: "",
    name: "New Module",
    description: "New Description",
    course: courseId,
  });
  const addModule = (module: any) => {
    const newModule = { ...module, _id: new Date().getTime().toString() };
    const newModuleList = [newModule, ...moduleList];
    setModuleList(newModuleList);
  };
  const deleteModule = (moduleId: string) => {
    const newModuleList = moduleList.filter(
      (module) => module._id !== moduleId,
    );
    setModuleList(newModuleList);
  };
  const updateModule = () => {
    const newModuleList = moduleList.map((m) => {
      if (m._id === module._id) {
        return module;
      } else {
        return m;
      }
    });
    // @ts-ignore
    setModuleList(newModuleList);
  };

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
          {/*Todo: change group style*/}
          <button
            onClick={() => {
              addModule(module);
            }}
          >
            Add
          </button>
          <button onClick={updateModule}>Update</button>

          <input
            value={module.name}
            onChange={(e) =>
              setModule({
                ...module,
                name: e.target.value,
              })
            }
          />
          <textarea
            value={module.description}
            onChange={(e) =>
              setModule({
                ...module,
                description: e.target.value,
              })
            }
          />
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
                  {/*Todo: change deleted button style*/}
                  <button className="me-2"
                    onClick={(event) => {
                      setModule(module);
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => deleteModule(module._id)}>
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
