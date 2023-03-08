import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Todo App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/todos"} className="nav-link">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Todo
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/todos"]} component={TodoList} />
            <Route exact path="/add" component={AddTodo} />
            <Route path="/todos/:id" component={Todo} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/todos/get")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }, []);

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8080/api/todos/${id}`)
      .then((response) =>
        setTodos(todos.filter((todo) => todo.id !== response.data.id))
      )
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h4>Todos List</h4>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={todo.id}
          >
            <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
            <button
              className="btn btn-danger"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddTodo() {
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/todos/post", { title, completed: false })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setTitle("");
  };

  
  return (
    <div>
      <h4>Add Todo</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control" 
            value={title}
            onChange={handleChange}
            placeholder="Enter todo title"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

function Todo({ match }) {
  const [todo, setTodo] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/todos/${match.params.id}`)
      .then((response) => setTodo(response.data))
      .catch((error) => console.log(error));
  }, [match.params.id]);

  const handleCompleted = () => {
    axios
      .put(`http://localhost:8080/api/todos/${match.params.id}`, { ...todo, completed: true })
      .then((response) => setTodo({ ...todo, completed: true }))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h4>{todo.title}</h4>
      <p>{`Status: ${todo.completed ? "Completed" : "Incomplete"}`}</p>
      <button
        className="btn btn-primary"
        disabled={todo.completed}
        onClick={handleCompleted}
      >
        Complete
      </button>
    </div>
  );
}

export default App;
