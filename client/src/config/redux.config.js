/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable implicit-arrow-linebreak */
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './api.config.js';

import authSlice from '../features/auth/slice/auth.slice';
import collaboratorListSlice from '../features/collaborator-list/slice/collaborator-list.slice';
import issueSlice from '../features/issue/slice/issue.slice';
import issueCommentsSlice from '../features/issue-comments/slice/issue-comments.slice';
import issueListSlice from '../features/issue-list/slice/issue-list.slice';
import issueTasksSlice from '../features/issue-tasks/slice/issue-tasks.slice';
import profileSlice from '../features/profile/slice/profile.slice';
import projectSlice from '../features/project/slice/project.slice';
import projectListSlice from '../features/project-list/slice/project-list.slice';
import messageBarSlice from '../features/message-bar/slice/message-bar.slice';
import taskListSlice from '../features/task-list/slice/task-list.slice';
import teamSlice from '../features/team/slice/team.slice';
import teamListSlice from '../features/team-list/slice/team-list.slice';

const storeConfig = {
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    collaboratorList: collaboratorListSlice,
    issue: issueSlice,
    issueComments: issueCommentsSlice,
    issueList: issueListSlice,
    issueTasks: issueTasksSlice,
    profile: profileSlice,
    project: projectSlice,
    projectList: projectListSlice,
    messageBar: messageBarSlice,
    taskList: taskListSlice,
    team: teamSlice,
    teamList: teamListSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(logger),
};

const store = configureStore(storeConfig);

export default store;
