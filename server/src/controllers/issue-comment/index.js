/* eslint-disable import/extensions */
import create from './create.issue-comment.controller.js';
import index from './index.issue-comment.controller.js';
import update from '../issue/update.issue.controller.js';
import destroy from './destroy.issue-comment.controller.js';

const IssueCommentController = {
  create,
  index,
  update,
  destroy,
};

export default IssueCommentController;
