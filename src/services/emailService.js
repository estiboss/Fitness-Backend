const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (to, subject, body) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: body,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve(info);
      }
    });
  });
};



// Define email parameters
const to = 'estichinazam@gmail.com'; // Receiver's email address
const subject = 'Test Email'; // Email subject
const body = 'This is a test email sent using nodemailer!'; // Email body

// Call the sendEmail function
sendEmail(to, subject, body)
  .then(() => console.log('Email sent successfully!'))
  .catch(error => console.error('Error sending email:', error));
