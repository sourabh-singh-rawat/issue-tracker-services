/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import apiSlice from './api.config';
import authSlice from '../features/auth/auth.slice';
import collaboratorListSlice from '../features/collaborator-list/collaborator-list.slice';
import issueCommentsSlice from '../features/issue-comments/issue-comments.slice';
import issueListSlice from '../features/issue-list/issue-list.slice';
import issueSlice from '../features/issue/issue.slice';
import issueTasksSlice from '../features/issue-tasks/issue-tasks.slice';
import messageBarSlice from '../features/message-bar/message-bar.slice';
import profileSlice from '../features/profile/profile.slice';
import projectListSlice from '../features/project-list/project-list.slice';
import projectSlice from '../features/project/project.slice';
import taskListSlice from '../features/task-list/task-list.slice';
import teamListSlice from '../features/team-list/team-list.slice';
import teamSlice from '../features/team/team.slice';

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
