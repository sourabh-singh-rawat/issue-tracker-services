const express = require("express");
const cors = require("cors");
const PORT = 4000;
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
const issueRouter = require("./routes/issues");
const projectRouter = require("./routes/projects");

app.use("/api", userRouter);
app.use("/api", issueRouter);
app.use("/api", projectRouter);

app.listen(PORT, () => {
  console.log("Server is running at port 4000");
});
