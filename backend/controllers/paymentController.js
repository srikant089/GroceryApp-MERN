import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_CLIENT_ID,
  key_secret: process.env.RAZORPAY_CLIENT_SECRET_KEY,
});

// Fetch the invoice using the invoice ID
export const invoice = async (req, res) => {
  await razorpayInstance.invoices.fetch(req.body.invoiceId);
}

export const processPayment = async (req, res) => {
  try {
    const options = {
      "amount": Number(req.body.amount * 100),
      "currency": "INR",
      "partial_payment": false
    };
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({
      success: true,
      Razorpay_Order: order,
    });
  } catch (error) {
    console.log('Error in processPayment', error);
    res
    .status(500)
    .json({ 
        message: 'Internal Server Error',
        success: false
    });
  }
};

//Send API Key
export const sendAPIKey = async (req, res) => {
  res.status(200).json({
    Razorpay_Api_Key: process.env.RAZORPAY_API_KEY,
  });
};

//Payment Verification
export const paymentVerification = async (req, res) => {
  try {
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
  } catch (error) {
    console.log('Error in processPayment', error);
    res
    .status(500)
    .json({ 
        message: 'Internal Server Error',
        success: false
    });
  }
};