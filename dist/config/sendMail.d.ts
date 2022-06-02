declare const sendEmail: (to: string, url: string, txt: string) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export default sendEmail;
