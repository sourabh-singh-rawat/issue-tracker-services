import dotenv from 'dotenv/config';
import sgMail from '@sendgrid/mail';

const sendGridConfig = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(`${sendGridConfig}`);

export default sgMail;
