const nodemailer = require("nodemailer");

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function sendPasswordEmail(email, password) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your eduManagePro Account Password",
    text: `Dear User,

Your password for eduManagePro is: ${password}

Please keep it confidential and do not share it with anyone.

If you did not request this, please ignore this email.

Best regards,
eduManagePro Team
support@edumanagepro.com
www.edumanagepro.com`,
    html: `<p>Dear User,</p>

<p>Your <strong>eduManagePro</strong> password is:</p>
<h2>${password}</h2>

<p>Please keep it confidential and do not share it with anyone.</p>

<p>If you did not request this, please ignore this email.</p>

<p>Best regards,<br>
<strong>eduManagePro Team</strong><br>
support@edumanagepro.com<br>
<a href="https://www.edumanagepro.com">Visit our website</a></p>`
  });

}

module.exports = { sendPasswordEmail };
