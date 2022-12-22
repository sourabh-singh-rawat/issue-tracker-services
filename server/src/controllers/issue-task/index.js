/* eslint-disable import/extensions */
import create from './create.issue-task.controller.js';
import index from './index.issue-task.controller.js';
import show from './show.issue-task.controller.js';
import update from './update.issue-task.controller.js';
import destroy from './destroy.issue-task.controller.js';

const IssueTaskController = {
  create,
  index,
  show,
  update,
  destroy,
};

export default IssueTaskController;
