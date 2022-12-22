/* eslint-disable import/extensions */
import create from './create.team.controller.js';
import index from './index.team.controller.js';
import show from './show.team.controller.js';
import update from './update.team.controller.js';
import indexMembers from './index-members.controller.js';
import createMember from './create-member.controller.js';

const TeamController = {
  create,
  createMember,
  index,
  indexMembers,
  show,
  update,
};

export default TeamController;
