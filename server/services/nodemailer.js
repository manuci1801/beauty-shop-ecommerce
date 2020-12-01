const nodemailer = require("nodemailer");

const sendMail = async (to, subject, data) => {
  let testAccount = await nodemailer.createTestAccount();
  // console.log(testAccount);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    // auth: {
    //   user: "ol7sswpyi4q4ewdw@ethereal.email", // generated ethereal user
    //   pass: "b2WjccXrsyyQV61Er4", // generated ethereal password
    // },
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "123456khj001@gmail.com",
      pass: "Panel123@@",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "MIN Store", // sender address
    to,
    subject,
    html: data,
  });

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

function formatPrice(x) {
  x += "";
  return x.length
    ? x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : "";
}

const sendMailOrder = async (to, order) => {
  console.log(order);
  try {
    let tableProducts = order.products.map(
      (e) =>
        `<tr style={ font-size: "16px", font-style: "italic" }>
        <td>${e.productId.name}</td>
        <td style={ width: "10%" }${e.amount}</td>
        <td style={ width: "10%" }>
          ${formatPrice(e.productId.price)}₫
        </td>
      </tr>`
    );
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "123456khj001@gmail.com",
        pass: "Panel123@@",
      },
    });

    function getTotalTmp() {
      return order.products.reduce(
        (acc, e) => acc + e.productId.price * e.amount,
        0
      );
    }

    let info = await transporter.sendMail({
      from: "MIN Store", // sender address
      to,
      subject: "Đơn hàng từ MIN Store",
      html: `<div style={ font-size: "20px" }>
          <div style={ font-size: "24px", font-weight: "1000" }>
            Thông tin người nhận
          </div>
          <div>
            Họ tên: <strong>${order.name}</strong>
          </div>
          <div>
            Địa chỉ: <strong>${order.address}</strong>
          </div>
          <div>
            Số điện thoại: <strong>${order.phone}</strong>
          </div>
          <div>
            Ghi chú: <strong>${order.note}</strong>
          </div>
          <div style={ font-size: "24px", font-weight: "1000" }>
            Thông tin đơn hàng
          </div>
          <table style={ width: "100%", margin: "auto" }>
            <tr>
              <th>Hàng hóa</th>
              <th>SL</th>
              <th>GIá</th>
            </tr>
            ${tableProducts}
          </table>
          <table
            style={
              font-weight: "1000",
            }
          >
            <tr>
              <td>Tạm tính</td>
              <td>${formatPrice(getTotalTmp())}₫</td>
            </tr>
            <tr>
              <td>Phí ship</td>
              <td>${order.shipType === "fast" ? formatPrice(40000) : 0}₫</td>
            </tr>
            <tr>
              <td>Tổng tiền</td>
              <td>${formatPrice(order.total)}₫</td>
            </tr>
          </table>
        </>
    </div>
    `,
    });

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMail,
  sendMailOrder,
};
