const nodemailer = require("nodemailer");
const { ImapFlow } = require('imapflow');
const host = process.env("EMAIL_HOST") || "ethereal.email" // SET ENVIRONMENT VARIABLE. Ethereal is for testing
const hostProtocol = process.env("EMAIL_HOST_PROTOCOL") || "smtp"

let NodeMailerTransporterInput = {
    host: hostProtocol + "." + host,
    port: process.env(EMAIL_PORT),
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env("EMAIL_USER"),
      pass: process.env("EMAIL_PW"),
    },
  };
NodeMailerTransporterInput.port ??= 587;

let ReceiverInputs = {
    host: host,
    port: 993,
    secure: true,
    auth: {
        user: process.env("EMAIL_USER"),
        pass: process.env("EMAIL_PW")
    }
};

ReceiverInputs.port ??= 993;

export const Mailsender = nodemailer.createTransport(NodeMailerTransporterInput);
export const Mailreciever = new ImapFlow(ReceiverInputs);

