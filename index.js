import express from "express";
const app = express();
import cors from "cors";

// Routers
import userRouter from "./routes/users.route.js";
import issueRouter from "./routes/issues.route.js";
import projectRouter from "./routes/projects.route.js";
import teamRouter from "./routes/teams.route.js";

const PORT = process.env.PORT || 4000;

// Options
app.use(express.json());
app.use(cors({ origin: "*" }));
app.options("*", cors());

app.use("/api", userRouter);
app.use("/api", issueRouter);
app.use("/api", projectRouter);
app.use("/api", teamRouter);

app.listen(PORT, () => {
  console.log("Server is running at port 4000");
});
