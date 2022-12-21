import create from "./create.project.controller.js";
import index from "./index.project.controller.js";
import show from "./show.project.controller.js";
import update from "./update.project.controller.js";
import destroy from "./destroy.project.controller.js";
import invite from "./invite.project.controller.js";
import confirmInvite from "./confirm-invite.project.controller.js";
import createMember from "./create-member.project.controller.js";
import indexStatus from "./index-status.project.controller.js";
import indexMembers from "./index-members.project.controller.js";
import indexMemberRoles from "./index-member-roles.project.controller.js";
import showIssuesStatusCount from "./show-issue-status-count.project.controller.js";
import indexActivity from "./index-activity.project.controller.js";

const ProjectController = {
  create,
  index,
  show,
  update,
  destroy,
  invite,
  confirmInvite,
  createMember,
  indexMemberRoles,
  indexStatus,
  indexMembers,
  showIssuesStatusCount,
  indexActivity,
};

export default ProjectController;
