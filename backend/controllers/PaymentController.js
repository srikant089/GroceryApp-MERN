const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_CLIENT_ID,
  key_secret: process.env.RAZORPAY_CLIENT_SECRET_KEY
});

// Fetch the invoice using the invoice ID
export const invoice = await razorpayInstance.invoices.fetch(invoiceId);


export const processPayment = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await razorpayInstance.orders.create(options);
  res.status(200).json({
    success: true,
    Razorpay_Order: order,
  });
};

//Send API Key
export const sendAPIKey = async (req, res) => {
  res.status(200).json({
    Razorpay_Api_Key: process.env.RAZORPAY_API_KEY,
  });
};

//Payment Verification
export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      reference: razorpay_payment_id,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};