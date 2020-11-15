const dateFormat = require("dateformat");

const postCreatePaymentUrl = (req, res) => {
  const ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const tmnCode = "1SNJ89L8";
  const secretKey = "ODJLXOCEWMFIEJXHJNMZUVFFVRDDXLOT";
  const vnpUrl = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  const returnUrl = "http://localhost:3000/payment/success";

  const date = new Date();

  const createDate = dateFormat(date, "yyyymmddHHmmss");
  const orderId = dateFormat(date, "HHmmss");
  const amount = req.body.amount;
  const bankCode = req.body.bankCode;

  const orderInfo = req.body.orderDescription;
  const orderType = req.body.orderType;
  const locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  const currCode = "VND";
  const vnp_Params = {};
  vnp_Params["vnp_Version"] = "2";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  const querystring = require("qs");
  const signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false });

  const sha256 = require("sha256");

  const secureHash = sha256(signData);

  vnp_Params["vnp_SecureHashType"] = "SHA256";
  vnp_Params["vnp_SecureHash"] = secureHash;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });

  //Neu muon dung Redirect thi dong dong ben duoi
  res.status(200).json({ code: "00", data: vnpUrl });
  //Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
  //res.redirect(vnpUrl)
};

const checkReturnUrl = (req, res) => {
  const vnp_Params = req.query;

  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  const config = require("config");
  const tmnCode = config.get("vnp_TmnCode");
  const secretKey = config.get("vnp_HashSecret");

  const querystring = require("qs");
  const signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false });

  const sha256 = require("sha256");

  const checkSum = sha256(signData);

  if (secureHash === checkSum) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.render("success", { code: "97" });
  }
};

module.exports = {
  postCreatePaymentUrl,
  checkReturnUrl,
};
