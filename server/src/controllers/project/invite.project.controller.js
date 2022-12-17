import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";

import sgMail from "../../config/sendgrid.config.js";

/**
 * Sends an email to the given email address
 * @return confirmation that the email is sent
 */
const invite = async (req, res) => {
  const { uid } = req.user;
  const { email, role_id } = req.body;
  const { id } = req.params;

  const tokenMessage = {
    invitationTo: email,
    projectId: id,
    invitedBy: uid,
    roleId: role_id,
  };

  const tokenOptions = {
    algorithm: "HS256",
    expiresIn: "1d",
  };

  try {
    const token = jwt.sign(tokenMessage, process.env.JWT_SECRET, tokenOptions);

    // send invite link to email
    const msg = {
      to: email,
      from: "sourabh.rawatcc@gmail.com", // Change to your verified sender
      subject: "Test: Issue Tracker Member Invitation",
      text: `You are invited to ${id} by ${email}`,
      html: `
        <strong>
          <p>You are invited to Project: ${id} by ${email}</p>
        </strong>
        <a href="http://localhost:4000/api/projects/${id}/members/confirm?inviteToken=${token}">
          Click to Accept Invite
        </a>
      `,
    };

    await sgMail.send(msg);

    res.send("Email sent!");
  } catch (error) {
    res.status(500).send("Cannot send email");
  }
};

export default invite;
