const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.options("*", cors());

// Routers
const userRouter = require("./routes/users");
const projectRouter = require("./routes/projects");

app.use("/api", userRouter);
app.use("/api", projectRouter);

app.listen(4000, () => {
  console.log("Server is running at port 4000");
});
