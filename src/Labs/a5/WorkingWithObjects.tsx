import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment";
  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(
      `${ASSIGNMENT_URL}/title/${assignment.title}`,
    );
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);

  const [module, setModule] = useState({
    id: 2,
    title: "Module",
    description: "Sample Module",
    completed: false,
    score: 0,
  });
  const MODULE_URL = "http://localhost:4000/a5/module";

  return (
    <div>
      <h3>Working With Objects</h3>
      <h3>Modifying Properties</h3>
      <input
        className="me-2"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            title: e.target.value,
          })
        }
        value={assignment.title}
        type="text"
      />
      <button className="btn btn-primary me-2" onClick={updateTitle}>
        Update Title to: {assignment.title}
      </button>
      <button className="btn btn-primary" onClick={fetchAssignment}>
        Fetch Assignment
      </button>
      <h4>Retrieving Objects</h4>
      <a
        className="btn btn-primary me-2"
        href="http://localhost:4000/a5/assignment"
      >
        Get Assignment
      </a>
      <a className="btn btn-primary" href="http://localhost:4000/a5/module">
        Get Module
      </a>
      <h4>Retrieving Properties</h4>
      <a
        className="btn btn-primary me-2"
        href="http://localhost:4000/a5/assignment/title"
      >
        Get Title
      </a>
      <a
        className="btn btn-primary"
        href="http://localhost:4000/a5/module/title"
      >
        Get Module Title
      </a>
      <h4>Modifying Properties</h4>
      <a
        className="btn btn-primary me-2 mb-2"
        href={`${ASSIGNMENT_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <input
        type="text"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            title: e.target.value,
          })
        }
        value={assignment.title}
      />
      <br />
      <a
        className="btn btn-primary me-2 mb-2"
        href={`${MODULE_URL}/title/${module.title}`}
      >
        Update Module Title
      </a>
      <input
        type="text"
        onChange={(e) =>
          setModule({
            ...module,
            title: e.target.value,
          })
        }
        value={module.title}
      />
      <br />
      <a
        className="btn btn-primary me-2 mb-2"
        href={`${MODULE_URL}/score/${module.score}`}
      >
        Update Module Score
      </a>
      <input
        type="number"
        onChange={(e) =>
          setModule({
            ...module,
            score: parseInt(e.target.value),
          })
        }
        value={module.score}
      />
      <br />
      <a
        className="btn btn-primary me-2 mb-2"
        href={`${MODULE_URL}/completed/${module.completed}`}
      >
        Update Module Completed
      </a>
      <input
        type="checkbox"
        onChange={(e) =>
          setModule({
            ...module,
            completed: e.target.checked,
          })
        }
        checked={module.completed}
      />
      <br />
      <a
        className="btn btn-primary me-2 mb-2"
        href={`${MODULE_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>
      <textarea
        className="align-top"
        onChange={(e) =>
          setModule({
            ...module,
            description: e.target.value,
          })
        }
        value={module.description}
      />
    </div>
  );
}

export default WorkingWithObjects;
