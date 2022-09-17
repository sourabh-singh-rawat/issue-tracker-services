import sgMail from "@sendgrid/mail";
import sendGridConfig from "../configs/sendgrid.config.js";

sgMail.setApiKey(sendGridConfig);

export default sgMail;
