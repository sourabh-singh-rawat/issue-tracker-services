const create = async (req: any, res: any) => {
  // eslint-disable-next-line object-curly-newline
  // const { issueId, description, dueDate, completed } = req.body;
  // try {
  //   const createdTask = (
  //     await IssueTask.insertOne({
  //       issueId,
  //       description,
  //       dueDate,
  //       completed,
  //     })
  //   ).rows[0];
  //   res.send(createdTask);
  // } catch (error) {
  //   res.status(500).send(error);
  // }
};

const destroy = async (req: any, res: any) => {
  // const { taskId } = req.params;
  // try {
  //   const deletedTask = (await IssueTask.deleteOne({ taskId })).rows[0];
  //   if (!deletedTask) res.status(500).send();
  //   res.send(deletedTask);
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const index = async (req: any, res: any) => {
  // const { id } = req.params;
  // // filtering
  // const filterOptions = {};
  // // pagination
  // const pagingOptions = {
  //   limit: 10,
  //   offset: 0,
  // };
  // // sorting
  // const sortOptions = {};
  // try {
  //   const tasks = await IssueTask.find({
  //     id,
  //     filterOptions,
  //     pagingOptions,
  //     sortOptions,
  //   });
  //   res.send({ rows: tasks.rows, rowCount: tasks.rowCount });
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const show = async (req: any, res: any) => {
  // const { taskId } = req.params;
  // try {
  //   const task = (await IssueTask.findOne(taskId)).rows[0];
  //   if (!task) {
  //     res.status(500).send();
  //   }
  //   res.send(task);
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const update = async (req: any, res: any) => {
  // const { taskId } = req.params;
  // const { description, completed } = req.body;
  // try {
  //   const task = (
  //     await IssueTask.updateOne({
  //       taskId,
  //       updates: { description, completed },
  //     })
  //   ).rows[0];
  //   if (!task) {
  //     res.status(500).send();
  //   }
  //   res.send(task);
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const IssueTaskController = {
  create,
  index,
  show,
  update,
  destroy,
};

export default IssueTaskController;
