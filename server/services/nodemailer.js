const nodemailer = require("nodemailer");

const sendMail = async (to, subject, data) => {
  let testAccount = await nodemailer.createTestAccount();
  console.log(testAccount);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ol7sswpyi4q4ewdw@ethereal.email", // generated ethereal user
      pass: "b2WjccXrsyyQV61Er4", // generated ethereal password
    },
    // service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // auth: {
    //   user: "123456khj001",
    //   pass: "Panel123@@",
    // },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "123456khj002@gmail.com", // sender address
    to,
    subject,
    html: data,
  });

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = {
  sendMail,
};
