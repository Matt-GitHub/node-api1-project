import React, { useState } from "react";
import axios from "axios";

const EditForm = props => {
  const [user, setUser] = useState({
    name: "",
    bio: ""
  });
  // !handle changes
  const handleChanges = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  //!! handle submit
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/users/${props.id}`, user)
      .then(response => {
        console.log("api post", response);
        props.setUpdate(!props.update);
      })
      .catch(error => {
        console.log("api post error", error);
      });
    setUser({
      name: "",
      bio: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={handleChanges}
      />
      <input
        type="text"
        name="bio"
        placeholder="bio"
        value={user.bio}
        onChange={handleChanges}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditForm;
