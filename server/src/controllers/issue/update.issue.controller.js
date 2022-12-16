import Issue from "../../models/issue/issue.model.js";

/**
 * Update an issue
 * @param {*} req
 * @param {*} res
 * @returns Updated issue.
 */
const update = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = (await Issue.updateOne(id, req.body)).rows[0];
    return res.send(issue);
  } catch (error) {
    return res.status(500).send();
  }
};

export default update;
