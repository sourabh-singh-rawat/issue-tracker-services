const express = require("express");
const userRouter = express.Router();
const pool = require("../db/connect");

userRouter.post("/users", (req, res) => {
  const { uid, displayName, email } = req.body;

  pool.query(
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL ,
      uid VARCHAR(255), 
      display_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      PRIMARY KEY (uid)
    )`,
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error creating table");
      }

      // Check if user already exists
      pool.query("SELECT * FROM users WHERE uid=$1", [uid], (error, result) => {
        if (error) {
          return console.log("Error checking if user exists", error);
        }

        if (result.rows.length > 0) {
          console.log("User already exists in the database", result.rows);
        }

        if (result.rows.length === 0) {
          // Add user to users table
          pool.query(
            `INSERT INTO users (uid, display_name, email)
            VALUES ($1, $2, $3)`,
            [uid, displayName, email],
            (error, result) => {
              if (error) {
                return console.log("Error adding user to users table", error);
              }
              console.log("User added to to users table");
              return res.status(200).send("User added to users table");
            }
          );
        }
      });
    }
  );
});

module.exports = userRouter;
