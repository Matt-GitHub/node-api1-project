import React, { createContext } from "react";
import axios from "axios";

const FormContext = () => {
  const [user, setUser] = createContext([
    {
      name: "",
      bio: ""
    }
  ]);

  axios
    .post("http://localhost:8000/api/users")
    .then(response => {
      console.log("api post user", response);
    })
    .catch(error => {
      console.log("api post error", error);
    });
};

export default FormContext;
