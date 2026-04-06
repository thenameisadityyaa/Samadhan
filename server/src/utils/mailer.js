const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Standard configuration
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendStatusEmail = async (email, title, status) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Update on your Samadhan Report: ${title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #0d9488;">Samadhan Update</h2>
          <p>Hello,</p>
          <p>The status of your recently reported issue (<strong>${title}</strong>) has been updated by the municipal authorities!</p>
          <p>New Status: <span style="font-weight: bold; color: #1e293b; background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px;">${status}</span></p>
          <p>Thank you for making our community better.</p>
          <br />
          <hr />
          <p style="font-size: 12px; color: #64748b;">Samadhan Civic Operations Platform</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email} for report ${title}`);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

module.exports = { sendStatusEmail };
