import express from "express";
const app = express();
import cors from "cors";

// Importing Routers
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/users.route.js";
import issueRouter from "./routes/issues.route.js";
import projectRouter from "./routes/projects.route.js";
import teamRouter from "./routes/teams.route.js";
import collaboratorRouter from "./routes/collaborators.route.js";
import issueAttachmentRouter from "./routes/issue-attachments.route.js";

const PORT = process.env.PORT || 4000;

// Options
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// Connecting Routers
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", issueRouter);
app.use("/api", projectRouter);
app.use("/api", teamRouter);
app.use("/api", collaboratorRouter);
app.use("/api", issueAttachmentRouter);

app.listen(PORT, () => {
  console.log("Server is running at port 4000");
});
