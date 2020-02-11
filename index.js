// implement your API here
const express = require("express");
const cors = require("cors");
const server = express();

// ? adding middleware to prase json
server.use(express.json());
server.use(cors());

// set database
const Database = require("./data/db");
// create http requestest
// ** create a get request
server.get("/api/users", (req, res) => {
  Database.find()
    .then(response => {
      console.log("request of users", response);
      res.status(200).json(response);
    })
    .catch(err => {
      console.log("request users error", err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

//** create a get request by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  Database.findById(id)
    .then(response => {
      if (response) {
        console.log("id request response", response);
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." })
          .end();
      }
    })
    .catch(err => {
      console.log("id request error", err);
      res.status(500).json({ errorMessage: "something went wrong" });
    });
});

// ** create a user
server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" })
      .end();
  } else {
    Database.insert(newUser)
      .then(response => {
        res.status(201).json(response);
      })

      .catch(error => {
        console.log("add user error", error);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});

// ** Delete a user
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Database.remove(id)
    .then(response => {
      if (response) {
        console.log("delete response", response);
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log("delete a user error", error);
      res.status(500).json({ errorMessage: "something awful happened" });
    });
});

// ** Update a User's Information
server.put("/api/users/:id", (req, res) => {
  const newUser = req.body;
  const { id } = req.params;

  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." })
      .end();
  } else {
    Database.update(id, newUser)
      .then(response => {
        if (response) {
          res
            .status(204)
            .json(response)
            .end();
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        console.log("add user error", error);
        res.status(500).json({ errorMessage: "something went wrong" });
      });
  }
});

// listen for server on port 8000
const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
