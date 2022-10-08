const nodemailer = require('nodemailer');

const sendEmail = async (destination, message) => {
  try {
    let transporter = nodemailer.createTransport({
      port: 587,
      secure: false, // true for 465, false for other ports
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Email Confirmation" <no-reply@test.com>`, // sender address
      to: destination, // list of receivers
      subject: "Confirm Your Email", // Subject line
      html: message, // html body
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
  }

}

module.exports = sendEmail