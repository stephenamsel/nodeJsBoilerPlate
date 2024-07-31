const nodemailer = require("nodemailer");
const { ImapFlow } = require('imapflow'); 

let NodeMailerTransporterInput = {
    host: "smtp.ethereal.email",
    port: process.env(EMAIL_PORT),
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env("EMAIL_USER"),
      pass: process.env("EMAIL_PW"),
    },
  };
NodeMailerTransporterInput.port ??= 587;

let ReceiverInputs = {
    host: 'ethereal.email',
    port: 993,
    secure: true,
    auth: {
        user: process.env("EMAIL_USER"),
        pass: process.env("EMAIL_PW")
    }
};
RecieverInput.port ??= 993;

export const sender = nodemailer.createTransport(NodeMailerTransporterInput);
export const reciever = new ImapFlow(ReceiverInputs);

