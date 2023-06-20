import "./App.css";
import React, { useEffect } from "react";

import { useState } from "react";
function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const response = await fetch("http://localhost:8080/v1", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };

  const getUser = async () => {
    const response = await fetch("http://localhost:8080/v1", {
      method: "GET",
    });

    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <label>UserName</label>
        <input type="text" name="username" onChange={handleOnChange}></input>
        <label>Password</label>
        <input type="text" name="password" onChange={handleOnChange}></input>
        <button type="Submit">Submit</button>
      </form>
      <div>
        <ul>
          {users.map((users) => (
            <li key={users._id}>
              {users.username},{users.password}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default App;
