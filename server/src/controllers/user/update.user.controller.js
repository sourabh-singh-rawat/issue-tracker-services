import User from '../../models/user/user.model.js';

const update = async (req, res) => {
  const { id } = req.params;

  // Check if the operation is valid or not
  const updates = Object.keys(req.body);
  const updatebles = ['name', 'email'];
  const isValidOperation = updates.every((item) => updatebles.includes(item));

  if (!isValidOperation) return res.status(400).send();

  try {
    const user = (await User.updateOne(id, req.body)).rows[0];
    return res.send(user);
  } catch (error) {
    return res.status(500).send();
  }
};

export default update;
