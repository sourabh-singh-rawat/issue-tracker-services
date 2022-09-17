import User from "../models/user.model.js";

// create a user
const create = async (req, res) => {
  const { name, email, uid } = req.body;

  try {
    const user = (await User.insertOne(name, email, uid)).rows[0];
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get a list of users
const index = async (req, res) => {
  try {
    const users = (await User.find()).rows;
    res.send(users);
  } catch (error) {
    res.status(500);
  }
};

// get specific user
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

// update specific user
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

// delete specific user
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

export default { create, index, show, update, destroy };
