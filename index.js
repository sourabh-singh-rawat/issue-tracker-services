import express from "express";
import cors from "cors";
const app = express();

// Routers
import userRouter from "./routers/user.js";
import issueRouter from "./routers/issue.js";
import projectRouter from "./routers/project.js";

const PORT = process.env.PORT || 4000;

// Options
app.use(express.json());
app.use(cors({ origin: "*" }));
app.options("*", cors());

app.use("/api", userRouter);
app.use("/api", issueRouter);
app.use("/api", projectRouter);

app.listen(PORT, () => {
  console.log("Server is running at port 4000");
});
