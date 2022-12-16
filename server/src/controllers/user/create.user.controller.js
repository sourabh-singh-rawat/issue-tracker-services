import User from "../../models/User/user.model.js";

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
    res.status(500).send(error);
  }
};

export default create;
