import { StatusCodes } from 'http-status-codes';

export default class ProjectController {
  // async create(req: any, res: any) {
  //   const user = req.user;
  //   const body = req.body;
  //   const response = new ApiResponse();
  // }
}

export const create = async (req: Request, res: Response) => {
  // const { uid } = req.user;
  // const { name, description, status, startDate, endDate } = req.body;
  // try {
  //   // Begin transaction
  //   db.query('BEGIN');
  //   // Get user id
  //   const { id } = await User.findOne(uid);
  //   // Create project
  //   const createdProject = await Project.insertOne({
  //     ownerId: id,
  //     name,
  //     description,
  //     status,
  //     startDate,
  //     endDate,
  //   });
  //   const projectActivityTypeId = await ProjectActivityTypes.findOne({
  //     name: 'CREATED',
  //   });
  //   // Create project created activity
  //   await ProjectActivity.insertOne({
  //     userId: id,
  //     typeId: projectActivityTypeId,
  //     projectId: createdProject.id,
  //   });
  //   // Get default role id
  //   const defaultRoleId = await ProjectMemberRoles.findOne();
  //   // Create project member
  //   await ProjectMember.insertOne({
  //     memberId: id,
  //     roleId: defaultRoleId,
  //     projectId: createdProject.id,
  //   });
  //   // Commit transaction
  //   await db.query('COMMIT');
  //   return res.send(createdProject);
  // } catch (error) {
  //   // Rollback transaction
  //   console.log(error);
  //   await db.query('ROLLBACK');
  //   return res.status(500).send();
  // }
};

export const index = async (req: Request, res: Response) => {
  // const { uid } = req.user;
  // const { status, sortBy, limit, page } = req.query;
  // const sortOptions = {};
  // if (sortBy) {
  //   const [field, order] = sortBy.split(':');
  //   sortOptions.field = field;
  //   sortOptions.order = order;
  // }
  // try {
  //   const { id } = await User.findOne(uid);
  //   const projects = (
  //     await Project.find({
  //       id,
  //       options: { status },
  //       pagingOptions: {
  //         limit: parseInt(limit, 10),
  //         offset: parseInt(limit, 10) * parseInt(page, 10),
  //       },
  //       sortOptions,
  //     })
  //   ).rows;
  //   const { rowCount } = await Project.rowCount({
  //     id,
  //     options: { status },
  //     pagingOptions: {},
  //     sortOptions,
  //   });
  //   return res.send({ rows: projects, rowCount: parseInt(rowCount, 10) });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  // }
};

export const indexStatus = async (req: Request, res: Response) => {
  // try {
  //   const status = await ProjectStatus.find();
  //   return res.send({ rows: status.rows, rowCount: status.rowCount });
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

export const confirmInvite = async (req: Request, res: Response) => {
  // const { inviteToken } = req.query;
  // const validToken = jwt.verify(inviteToken, process.env.JWT_SECRET);
  // // check if the invited user has already an account
  // const user = (await User.findOneByEmail(validToken.inviteEmail)).rows[0];
  // if (!user) {
  //   // Create a new account
  //   res.redirect(`http://localhost:3000/signup?inviteToken=${inviteToken}`);
  // } else {
  //   // User exist, now check if the user is already authenticated
  //   res.redirect(`http://localhost:3000/signin?inviteToken=${inviteToken}`);
  // }
};

export const createMember = async (req: Request, res: Response) => {
  // const { uid, projectId } = req.body;
  // try {
  //   const { id } = await User.findOne(uid);
  //   const response = (
  //     await ProjectMember.insertOne({
  //       projectId,
  //       memberId: id,
  //       roleId: 'fc7562a2-fd0b-4f0f-af43-3d4e30434d0f',
  //     })
  //   ).rows[0];
  //   res.send(response);
  // } catch (error) {
  //   res.status(500).send();
  // }
};

export const destroy = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // try {
  //   const project = await (await Project.deleteOne(id)).rows[0];
  //   if (!project) res.status(404);
  //   res.send(project);
  // } catch (error) {
  //   res.status(500).send(error);
  // }
};

export const indexActivity = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // const { uid } = req.user;
  // try {
  //   // Start a transaction
  //   db.query('BEGIN');
  //   const { id: userId } = await User.findOne(uid);
  //   const projectActivity = await ProjectActivity.find({
  //     projectId: id,
  //     memberId: userId,
  //   });
  //   // Commit the transaction
  //   db.query('COMMIT');
  //   return res.send({
  //     rows: projectActivity.rows,
  //     rowCount: projectActivity.rowCount,
  //   });
  // } catch (error) {
  //   // Rollback the transaction
  //   db.query('ROLLBACK');
  //   return res.status(500).send();
  // }
};

export const indexMemberRoles = async (req: Request, res: Response) => {
  // try {
  //   const projectMemberRoles = await ProjectMemberRole.find();
  //   if (projectMemberRoles.length === 0) res.status(404).send();
  //   return res.send({
  //     rows: projectMemberRoles,
  //     rowCount: projectMemberRoles.length,
  //   });
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

export const indexMembers = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // const { uid } = req.user;
  // try {
  //   const { id: userId } = await User.findOne(uid);
  //   if (!userId) return res.status(404).send();
  //   const projectMembers = (
  //     await ProjectMember.findByProjectId({ projectId: id, memberId: userId })
  //   ).rows;
  //   if (!projectMembers.length) return res.status(403).send();
  //   return res.send({ rows: projectMembers, rowCount: projectMembers.length });
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

export const invite = async (req: Request, res: Response) => {
  // const { uid } = req.user;
  // const { email, roleId } = req.body;
  // const { id } = req.params;
  // const tokenMessage = {
  //   invitationTo: email,
  //   projectId: id,
  //   invitedBy: uid,
  //   roleId,
  // };
  // const tokenOptions = {
  //   algorithm: 'HS256',
  //   expiresIn: '1d',
  // };
  // try {
  //   const token = jwt.sign(tokenMessage, process.env.JWT_SECRET, tokenOptions);
  //   // send invite link to email
  //   const msg = {
  //     to: email,
  //     from: 'sourabh.rawatcc@gmail.com', // Change to your verified sender
  //     subject: 'Test: Issue Tracker Member Invitation',
  //     text: `You are invited to ${id} by ${email}`,
  //     html: `
  //       <strong>
  //         <p>You are invited to Project: ${id} by ${email}</p>
  //       </strong>
  //       <a href="http://localhost:4000/api/projects/${id}/members/confirm?inviteToken=${token}">
  //         Click to Accept Invite
  //       </a>
  //     `,
  //   };
  //   await sgMail.send(msg);
  //   return res.send('Email sent!');
  // } catch (error) {
  //   return res.status(500).send('Cannot send email');
  // }
};

export const showIssuesStatusCount = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // const { uid } = req.user;
  // try {
  //   const { id: userId } = await User.findOne(uid);
  //   if (!userId) return res.status(404).send();
  //   const statusCount = (
  //     await Project.statusCount({ projectId: id, memberId: userId })
  //   ).rows;
  //   return res.send(statusCount);
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

export const show = async (req: Request, res: Response) => {
  // const { uid } = req.user;
  // const { id } = req.params;
  // try {
  //   db.query('BEGIN');
  //   const { id: userId } = await User.findOne(uid);
  //   if (!userId) return res.status(404).send();
  //   const project = (await Project.findOne({ projectId: id, memberId: userId }))
  //     .rows[0];
  //   if (!project) return res.status(403).send();
  //   db.query('COMMIT');
  //   return res.send(project);
  // } catch (error) {
  //   db.query('ROLLBACK');
  //   return res.status(500).send();
  // }
};

export const update = async (req: Request, res: Response) => {
  // const { uid } = req.user;
  // const { id } = req.params;
  // const { name, description, status, startDate, endDate } = req.body;
  // try {
  //   db.query('BEGIN');
  //   const { id: userId } = await User.findOne(uid);
  //   const updatedProject = (
  //     await Project.updateOne({
  //       id,
  //       body: req.body,
  //     })
  //   ).rows[0];
  //   if (name) {
  //     const updatedNameActivityTypeId = await ProjectActivityTypes.findOne({
  //       name: 'UPDATED_NAME',
  //     });
  //     await ProjectActivity.insertOne({
  //       projectId: id,
  //       typeId: updatedNameActivityTypeId,
  //       userId,
  //     });
  //   }
  //   if (description) {
  //     // eslint-disable-next-line operator-linebreak
  //     const updatedDescriptionActivityTypeId =
  //       await ProjectActivityTypes.findOne({
  //         name: 'UPDATED_DESCRIPTION',
  //       });
  //     await ProjectActivity.insertOne({
  //       projectId: id,
  //       typeId: updatedDescriptionActivityTypeId,
  //       userId,
  //     });
  //   }
  //   if (status) {
  //     const updatedStatusActivityTypeId = await ProjectActivityTypes.findOne({
  //       name: 'UPDATED_STATUS',
  //     });
  //     await ProjectActivity.insertOne({
  //       projectId: id,
  //       typeId: updatedStatusActivityTypeId,
  //       userId,
  //     });
  //   }
  //   if (startDate) {
  //     const updatedStartDateActivityTypeId = await ProjectActivityTypes.findOne(
  //       { name: 'UPDATED_START_DATE' },
  //     );
  //     await ProjectActivity.insertOne({
  //       projectId: id,
  //       typeId: updatedStartDateActivityTypeId,
  //       userId,
  //     });
  //   }
  //   if (endDate) {
  //     const updatedEndDateActivityTypeId = await ProjectActivityTypes.findOne({
  //       name: 'UPDATED_END_DATE',
  //     });
  //     await ProjectActivity.insertOne({
  //       projectId: id,
  //       typeId: updatedEndDateActivityTypeId,
  //       userId,
  //     });
  //   }
  //   db.query('COMMIT');
  //   return res.send(updatedProject);
  // } catch (error) {
  //   db.query('ROLLBACK');
  //   return res.status(500).send();
  // }
};
