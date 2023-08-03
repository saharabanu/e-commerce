const nodemailer = require("nodemailer");
const { smtpUserName, smtpUserPassword } = require("../secret");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: smtpUserName,
      pass: smtpUserPassword
    }
  });

  console.log("user", smtpUserName, "password",smtpUserPassword)

  const sendEmailWithNodeMailer = async (emailData) => {

   try {
    const emailOptions = {
        from: smtpUserName, // sender address
        to: emailData.email, // list of receivers
        subject: emailData.subject, // Subject line
       
        html: emailData.html
    };

    const info = await transporter.sendMail(emailOptions);
    console.log("message sent", info.response)
   } catch (error) {
    console.error("error occurred with sending email");
    throw error
    
   }

  }
  module.exports = sendEmailWithNodeMailer