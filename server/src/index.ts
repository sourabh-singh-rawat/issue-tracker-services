import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '../config/.env' });

// Importing routes from routes folder
import authRouter from './routes/auth.router.js';
import userRouter from './routes/user.router.js';
import issueRouter from './routes/issue.router.js';
import projectRouter from './routes/project.router.js';
import teamRouter from './routes/team.router.js';
import collaboratorRouter from './routes/collaborator.router.js';
import issueAttachmentRouter from './routes/issue-attachment.router.js';

const app: Express = express();
const PORT: number = (process.env.PORT as unknown as number) || 4000;

// Configuring express to use json and set it to req.body
app.use(express.json());

// Configuring cors to allow requests from client
const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// Connecting routers to the server
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', issueRouter);
app.use('/api', projectRouter);
app.use('/api', teamRouter);
app.use('/api', collaboratorRouter);
app.use('/api', issueAttachmentRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
