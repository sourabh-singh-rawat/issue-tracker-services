import create from './create.issue.controller.js';
import index from './index.issue.controller.js';
import show from './show.issue.controller.js';
import update from './update.issue.controller.js';
import destroy from './destroy.issue.controller.js';
import indexPriority from './index-priority.controller.js';
import indexStatus from './index-status.issue.controller.js';

const IssueController = {
  create,
  index,
  indexStatus,
  indexPriority,
  show,
  update,
  destroy,
};

export default IssueController;
