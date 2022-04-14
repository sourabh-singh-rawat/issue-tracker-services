const express = require("express");
const pool = require("../db");
const userRouter = express.Router();

userRouter.post("/users", (req, res) => {
  const { displayName, email, uid } = req.body;

  // Check if the user already exists
  // Add user to users_table if they already don't exist
  pool.query("SELECT * FROM users WHERE uid=$1", [uid], (error, result) => {
    if (error) {
      return console.log("Error checking if user exists", error);
    }
    console.log("Adding user to the database");

    if (result.rowCount === 0) {
      // no user found so we can add them to database
      pool.query(
        "INSERT INTO users (name, email, uid) VALUES ($1, $2, $3) RETURNING *",
        [displayName, email, uid],
        (error, result) => {
          if (error) return console.log("Error adding user to database", error);
          console.log("User added to database");
        }
      );
    }
  });
});

module.exports = userRouter;
