import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

class EmailUtil {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT ?? "2525"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      sender: process.env.SMTP_SENDER,
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.transporter.options.sender,
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailUtil;
