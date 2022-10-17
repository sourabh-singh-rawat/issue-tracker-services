import User from "../models/user.model.js";

const create = async (req, res) => {
  const { name, email, uid, photoURL } = req.body;

  try {
    const user = (await User.findOne(uid)).rows[0];
    if (user) {
      const updatedUser = (
        await User.updateOne({
          id: user.id,
          document: { name, photo_url: photoURL },
        })
      ).rows[0];

      return res.send(updatedUser);
    }

    const createdUser = (await User.insertOne(name, email, uid)).rows[0];
    res.send(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const user = (await User.findOne(id)).rows[0];
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  // Check if the operation is valid or not
  const updates = Object.keys(req.body);
  const updatebles = ["name", "email", "team_id"];
  const isValidOperation = updates.every((item) => updatebles.includes(item));

  if (!isValidOperation) return res.status(400).send();

  try {
    const user = (await User.updateOne(id, req.body)).rows[0];
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const user = (await User.deleteOne(id)).rows[0];
    if (!user) res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default {
  create,
  show,
  update,
  destroy,
};
