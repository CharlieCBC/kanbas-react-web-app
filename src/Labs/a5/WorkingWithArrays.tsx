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
  const [errorMessage, setErrorMessage] = useState(null);
  const [todos, setTodos] = useState<any[]>([]);
  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };

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

  const deleteTodo = async (todo) => {
    try {
      const response = await axios.delete(`${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const updateTodo = async () => {
    try {
      const response = await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const API = "http://localhost:4000/a5/todos";
  return (
    <div>
      <h3>Working with Arrays</h3>
      <label form="todo.id">
        Todo ID
        <input id="todo.id" className="ms-2" value={todo.id} readOnly />
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
      <label form="todo.description">
        Todo Description
        <textarea
          className="mt-2 ms-2 align-top"
          value={todo.description}
          onChange={(e) =>
            setTodo({
              ...todo,
              description: e.target.value,
            })
          }
        />
      </label>
      <br />
      <label form="todo.due">
        Todo Due
        <input
          className="mt-2 ms-2"
          value={todo.due}
          type="date"
          onChange={(e) =>
            setTodo({
              ...todo,
              due: e.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        <input
          className="mt-2"
          checked={todo.completed}
          type="checkbox"
          onChange={(e) =>
            setTodo({
              ...todo,
              completed: e.target.checked,
            })
          }
        />
        Completed
      </label>
      <br />
      <button className="btn btn-primary mt-2" onClick={createTodo}>
        Create Todo
      </button>
      <br />
      <button className="btn btn-success mt-2" onClick={updateTitle}>
        Update Title
      </button>
      <br />
      <button className="btn btn-warning mt-2" onClick={postTodo}>
        Post Todo
      </button>
      <br />
      <button className="btn btn-success mt-2" onClick={updateTodo}>
        Update Todo
      </button>
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
      )}
      <ul className="list-group mt-2">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <input checked={todo.completed} type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
            <button
              className="btn btn-warning ms-2 float-end"
              onClick={() => fetchTodoById(todo.id)}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => removeTodo(todo)}>
              Remove
            </button>
            <button
              onClick={() => deleteTodo(todo)}
              className="btn btn-danger float-end"
            >
              Delete
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
