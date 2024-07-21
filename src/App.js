import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import SearchTask from "./SearchTask";
import apiReq from "./apiReq";

// npx json-server --watch data/db.json --port 3500


function App() {
  const API_URL = "http://localhost:3500/tasks";
  const [tasks, setTasks] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [load, setload] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not fetched");
        const listTasks = await response.json();
        setTasks(listTasks);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setload(false);
      }
    };
    setTimeout(() => {
      (async () => fetchTasks())();
    }, 3000);
  }, []);

  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");

  const addTask = async (task) => {
    let id = tasks.length ? Number(tasks[tasks.length - 1].id) + 1 : 1;
    console.log(typeof(id))
    id=String(id)
    console.log(typeof(id))
    const addNewTask = { id, checked: false, task };
    const addTasks = [...tasks, addNewTask];
    setTasks(addTasks);
    // localStorage.setItem("todo_list", JSON.stringify(addTasks));
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewTask),
    };
    const res = await apiReq(API_URL, postOptions);
    if (res) setFetchError(res);
  };

  const handleCheckbox = async (id) => {
    const copytasks = tasks.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    setTasks(copytasks);
    // localStorage.setItem("todo_list", JSON.stringify(copytasks));
    const myTask = copytasks.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myTask[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const res = await apiReq(reqUrl, updateOptions);
    if (res) setFetchError(res);
  };

  const handleDelete = async(id) => {
    const copytasks = tasks.filter((task) => task.id !== id);
    setTasks(copytasks);
    // localStorage.setItem("todo_list", JSON.stringify(copytasks));
    const deleteOptions = {
      method: "DELETE"
    };
    const reqUrl = `${API_URL}/${id}`;
    const res = await apiReq(reqUrl, deleteOptions);
    if (res) setFetchError(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask) return;
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="App">
      <Header />
      <AddTask
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
      />
      <SearchTask search={search} setSearch={setSearch} />
      <div>
        {fetchError && <p>{`Error:${fetchError}`}</p>}
        {load && <p>Loading tasks....</p>}
        {!fetchError && !load && (
          <Content
            tasks={tasks.filter((task) =>
              task.task.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheckbox={handleCheckbox}
            handleDelete={handleDelete}
          />
        )}
      </div>
      <Footer tasks={tasks} />
    </div>
  );
}
export default App;
