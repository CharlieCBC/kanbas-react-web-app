import React, { useState, useEffect } from "react";
import axios from "axios";
function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  const removeTodo = async (todo) => {
    const response = await axios.get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };

  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };

  const fetchTodoById = async (id) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };

  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const API = "http://localhost:4000/a5/todos";
  return (
    <div>
      <h3>Working with Arrays</h3>

      <ul>
        <label form="todo.id">
          Todo ID
          <input
            className="ms-2"
            type="number"
            id="todo.id"
            value={todo.id}
            onChange={(e) =>
              setTodo({
                ...todo,
                id: parseInt(e.target.value),
              })
            }
          />
        </label>
        <br />
        <label form="todo.title">
          Todo Title
          <input
            className="mt-2 ms-2"
            type="text"
            value={todo.title}
            onChange={(e) =>
              setTodo({
                ...todo,
                title: e.target.value,
              })
            }
          />
        </label>
        <br />
        <button className="btn btn-primary mt-2" onClick={createTodo}>
          Create Todo
        </button>
        <br />
        <button className="btn btn-success mt-2" onClick={updateTitle}>
          Update Title
        </button>
        {todos.map((todo: any) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
            <button
              className="btn btn-danger ms-2 mt-2 me-2"
              onClick={() => removeTodo(todo)}
            >
              Remove
            </button>
            <button
              className="btn btn-warning mt-2"
              onClick={() => fetchTodoById(todo.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <h3>Updating an Item in an Array</h3>
      <label form="todo.id">
        Todo ID
        <input
          className="ms-2"
          type="number"
          id="todo.id"
          value={todo.id}
          onChange={(e) =>
            setTodo({
              ...todo,
              id: parseInt(e.target.value),
            })
          }
        />
      </label>
      <br />
      <a
        className="btn btn-primary me-2 mb-2 mt-2"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Title to {todo.title}
      </a>
      <input
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <br />
      <a
        className="btn btn-primary me-2 mb-2"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Update Description
      </a>
      <textarea
        className="align-top"
        value={todo.description}
        onChange={(e) =>
          setTodo({
            ...todo,
            description: e.target.value,
          })
        }
      />
      <br />
      <a
        className="btn btn-primary me-2 mb-2 mt-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Update Completed Status
      </a>
      <label form="todo.completed">
        Completed
        <input
          type="checkbox"
          id="todo.completed"
          className="ms-2"
          onChange={(e) =>
            setTodo({
              ...todo,
              completed: e.target.checked,
            })
          }
          checked={todo.completed}
        />
      </label>

      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <a className="btn btn-primary me-2" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <input
        type="number"
        value={todo.id}
        onChange={(e) =>
          setTodo({
            ...todo,
            id: parseInt(e.target.value),
          })
        }
      />
      <h3>Deleting from an Array</h3>
      <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>
      <h3>Filtering Array Items</h3>
      <a className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
    </div>
  );
}

export default WorkingWithArrays;
