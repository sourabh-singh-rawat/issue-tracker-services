import { Request, Response } from 'express';
// import toSnakeCase from 'src/utils/to-snake-case.util.js';

const index = async (req: Request, res: Response) => {
  // const { uid } = req.user;
  // // eslint-disable-next-line
  // const { status, priority, assigneeId, projectId, limit, page, sortBy } =
  //   req.query;
  // const filterOptions = {
  //   status,
  //   priority,
  //   'issues.projectId': projectId,
  //   assigneeId,
  // };
  // const pagingOptions = {
  //   limit: parseInt(limit, 10),
  //   offset: parseInt(limit, 10) * parseInt(page, 10),
  // };
  // const sortOptions: any = {};
  // if (sortBy) {
  //   const [field, order] = sortBy.split(':');
  //   sortOptions.field = toSnakeCase(field);
  //   sortOptions.order = order;
  // }
  // try {
  //   const { id } = await User.findOne(uid);
  //   const issues = (
  //     await Issue.find({
  //       reporterId: id,
  //       filterOptions,
  //       pagingOptions,
  //       sortOptions,
  //     })
  //   ).rows;
  //   const { rowCount } = await Issue.rowCount({
  //     reporterId: id,
  //     filterOptions,
  //     pagingOptions: {},
  //     sortOptions: {},
  //   });
  //   return res.send({ rows: issues, rowCount });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).send();
  // }
};

const show = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // try {
  //   const issue = (await Issue.findOne(id)).rows[0];
  //   if (!issue) res.status(404).send();
  //   return res.send({ ...issue });
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

const update = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // const updatables = {
  //   name: req.body.name,
  //   description: req.body.description,
  //   status: req.body.status,
  //   priority: req.body.priority,
  //   reporter_id: req.body.reporterId,
  //   project_id: req.body.projectId,
  //   assignee_id: req.body.assigneeId,
  //   due_date: req.body.dueDate,
  // };
  // try {
  //   const issue = (await Issue.updateOne(id, updatables)).rows[0];
  //   return res.send(issue);
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

const indexStatus = async (req: Request, res: Response) => {
  // try {
  //   const issueStatus = await IssueStatus.find();
  //   res.send({ rows: issueStatus.rows, rowCount: issueStatus.rowCount });
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const indexPriority = async (req: Request, res: Response) => {
  // try {
  //   const issuePriority = await IssuePriority.find();
  //   res.send({ rows: issuePriority.rows, rowCount: issuePriority.rowCount });
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const destroy = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // try {
  //   const issue = (await Issue.deleteOne(id)).rows[0];
  //   if (!issue) res.status(404);
  //   return res.send(issue);
  // } catch (error) {
  //   return res.status(500).send();
  // }
};

const create = async (req: Request, res: Response) => {
  // const { uid } = req.user;
  // const { body } = req;
  // try {
  //   db.query('BEGIN');
  //   const { id: userId } = await User.findOne(uid);
  //   const reporterId = await ProjectMember.findOne({ memberId: userId });
  //   const createdIssue = (await Issue.insertOne({ reporterId, ...body }))
  //     .rows[0];
  //   // Add created activity to project activity // replace this with trigger
  //   const createdIssueActivityTypeId = await ProjectActivityTypes.findOne({
  //     name: 'CREATED_ISSUE',
  //   });
  //   await ProjectActivity.insertOne({
  //     projectId: body.projectId,
  //     typeId: createdIssueActivityTypeId,
  //     userId,
  //   });
  //   // TODO: Add created activity to issue activity
  //   db.query('COMMIT');
  //   return res.send(createdIssue);
  // } catch (error) {
  //   db.query('ROLLBACK');
  //   console.log(error);
  //   return res.status(500).send();
  // }
};

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
