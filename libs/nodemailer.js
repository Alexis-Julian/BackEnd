import nodemailer from "nodemailer";
import env from "../config/enviroment.config.js";
export const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "buzzar50@gmail.com",
    pass: env.GOOGLE,
  },
});

export async function sendMail(email, token) {
  const mailoption = {
    from: "ServiceData <buzzar50@gmail.com>",
    to: email,
    subject: "Reset Password",
    html: `
    <h1>Visita el sitio web:</h1>
    <a href="http://localhost:8080/view/user/password/${token}">Ir al sitio web</a>
    `,
  };
  let result = await transport.sendMail(mailoption);
}
