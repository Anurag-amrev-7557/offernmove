const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.EMAIL,  // Your email
          pass: process.env.EMAIL_PASSWORD,  // Your email password
      },
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: `"Anurag Verma" <${process.env.EMAIL}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = mailSender;