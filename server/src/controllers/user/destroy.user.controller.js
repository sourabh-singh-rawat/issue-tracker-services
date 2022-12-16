import User from "../../models/User/user.model.js";

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

export default destroy;
