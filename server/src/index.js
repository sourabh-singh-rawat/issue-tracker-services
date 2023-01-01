/* eslint-disable import/first */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

// Load environment variables from .env file
dotenv.config({ path: '../config/.env' });

// importing routes from routes folder
import authRouter from './routes/auth.route.js';
import userRouter from './routes/users.route.js';
import issueRouter from './routes/issues.route.js';
import projectRouter from './routes/projects.route.js';
import teamRouter from './routes/teams.route.js';
import collaboratorRouter from './routes/collaborators.route.js';
import issueAttachmentRouter from './routes/issue-attachments.route.js';

// choosing port number for the server
const PORT = process.env.PORT || 4000;

// configuring express to use json and set it to req.body
app.use(express.json());

// congiguring cors to allow requests from client
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);

// connecting routers to the server
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', issueRouter);
app.use('/api', projectRouter);
app.use('/api', teamRouter);
app.use('/api', collaboratorRouter);
app.use('/api', issueAttachmentRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running at port 4000');
});
