import UserModel from "../models/Users.js";

const createUser = async (req, res) => {
  const { name, email, uid } = req.body;
  try {
    await UserModel.insertOne(name, email, uid);
  } catch (error) {
    console.log("Cannot create new user!", error);
  }
};

export default { createUser };
