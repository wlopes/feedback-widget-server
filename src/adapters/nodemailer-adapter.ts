import { MailAdapter, SendMailData } from "./mail-adapter";
import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASS
  }
});

export class NodemailerAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMailData){
    await transport.sendMail({
     from: 'Equipe lugarnenhum.net <no-reply@lugarnenhum.net>',
     to: 'Willian Lopes <willianlopes404@gmail.com>',
     subject: subject,
     html: body
    })
  }
}