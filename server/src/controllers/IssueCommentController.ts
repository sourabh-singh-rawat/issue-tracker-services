import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
  // const { uid } = req.user;
  // const { id: issueId } = req.params;
  // try {
  //   const { id } = await User.findOne(uid);
  //   const createdComment = (
  //     await IssueComment.insertOne({
  //       issueId,
  //       memberId: id,
  //       ...req.body,
  //     })
  //   ).rows[0];
  //   res.send(createdComment);
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const destroy = async (req: Request, res: Response) => {
  // const { commentId } = req.params;
  // try {
  //   const deletedComment = (await IssueComment.deleteOne(commentId)).rows[0];
  //   if (!deletedComment) res.status(500).send();
  //   res.send(deletedComment);
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const index = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // try {
  //   const comments = (await IssueComment.find({ issueId: id })).rows;
  //   const rowCount = (await IssueComment.rowCount(id)).rows[0].count;
  //   res.send({ rows: comments, rowCount: parseInt(rowCount, 10) });
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const update = async (req: Request, res: Response) => {
  // const { commentId } = req.params;
  // const { description } = req.body;
  // try {
  //   const updatedComment = (
  //     await IssueComment.updateOne({ commentId, description })
  //   ).rows[0];
  //   if (!updatedComment) {
  //     res.status(500).send();
  //   }
  //   res.send(updatedComment);
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const IssueCommentController = {
  create,
  index,
  update,
  destroy,
};

export default IssueCommentController;
