import { useEffect, useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
  console.log(form);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
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

  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/v1", {
      method: "GET",
    });

    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <p>{JSON.stringify(form)}</p>
      <Form onSubmit={handleOnSubmit}>
        <label>UserName</label>
        <input type="text" name="username" onChange={handleOnChange}></input>
        <label>Password</label>
        <input type="text" name="password" onChange={handleOnChange}></input>
        <Button type="submit">Submit</Button>
        <div>
          {users.map((user) => (
            <li key={user._id}>
              {user.username},{user.password}
            </li>
          ))}
        </div>
      </Form>
    </>
  );
}

export default App;
