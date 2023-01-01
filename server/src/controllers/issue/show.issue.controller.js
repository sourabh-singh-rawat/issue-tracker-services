import Issue from '../../models/issue/issue.model.js';

/**
 * Show an issue
 * @param {*} req
 * @param {*} res
 * @returns Issue that is requested.
 */
const show = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = (await Issue.findOne(id)).rows[0];
    if (!issue) res.status(404).send();

    return res.send({ ...issue });
  } catch (error) {
    return res.status(500).send();
  }
};

export default show;
