import nodemailer from "nodemailer";

export async function sendSelicAlertEmail(selicValue: string, to: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  
    await transporter.sendMail({
      from: '"Selic Alert" <no-reply@selic.com>',
      to,
      subject: `📈 Alerta: Nova Taxa Selic`,
      html: `<p>O valor atual da <strong>taxa Selic</strong> é: <strong>${selicValue}</strong>.</p>`,
    });
  }
  