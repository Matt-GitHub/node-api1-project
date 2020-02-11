import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Form from "./components/form";
import EditForm from "./components/editform";

function App() {
  const [user, setUser] = useState([
    {
      name: "",
      bio: ""
    }
  ]);

  const [id, setId] = useState("");

  const [update, setUpdate] = useState(false);
  return (
    <div className="App">
      {useEffect(() => {
        axios
          .get("http://localhost:8000/api/users")
          .then(response => {
            console.log("api response", response.data);
            setUser(response.data);
          })
          .catch(error => {
            console.log("error", error);
          });
      }, [update])}
      {user.map((users, key) => {
        return (
          <div key={key}>
            <h1>{users.name}</h1>
            <p>{users.bio}</p>
            <button onClick={() => setId(users.id)}>Edit</button>
            <button onClick={() => setId(users.id)}>Delete</button>
          </div>
        );
      })}
      <Form update={update} setUpdate={setUpdate} />
      <EditForm id={id} update={update} setUpdate={setUpdate} />
    </div>
  );
}

export default App;
