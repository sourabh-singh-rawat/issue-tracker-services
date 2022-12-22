/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
// eslint-disable-next-line
import dotenv from 'dotenv/config';
import User from '../../models/user/user.model.js';

const confirmInvite = async (req, res) => {
  const { inviteToken } = req.query;
  const validToken = jwt.verify(inviteToken, process.env.JWT_SECRET);

  // check if the invited user has already an account
  const user = (await User.findOneByEmail(validToken.inviteEmail)).rows[0];

  if (!user) {
    // Create a new account
    res.redirect(`http://localhost:3000/signup?inviteToken=${inviteToken}`);
  } else {
    // User exist, now check if the user is already authenticated
    res.redirect(`http://localhost:3000/signin?inviteToken=${inviteToken}`);
  }
};

export default confirmInvite;
