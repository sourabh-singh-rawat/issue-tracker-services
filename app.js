import express from "express";
import cors from "cors";

// Routers
import userRouter from "./routes/usersRoute.js";
import issueRouter from "./routes/issuesRoute.js";
import projectRouter from "./routes/projectsRoute.js";

const app = express();
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
