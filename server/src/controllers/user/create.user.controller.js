/* eslint-disable import/extensions */
import User from '../../models/user/user.model.js';

const create = async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { name, email, uid, photoURL } = req.body;

  try {
    const user = await User.findOne(uid);
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

    return res.send(createdUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default create;
