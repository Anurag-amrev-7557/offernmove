const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const User = require("../models/user.js");
const generateOTP = require("./generateOTP");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
    const email = req.body.email;
    const otp = generateOTP();
    const htmlContent = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Secure OTP Verification</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 10px;
                            }
                            .container {
                                background-color: #ffffff;
                                border-radius: 8px;
                                max-width: 600px;
                                margin: auto;
                                padding: 0 10px;
                                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                padding-bottom: 20px;
                            }
                            .logo {
                                width: 150px;
                            }
                            .content {
                                font-size: 16px;
                                color: #333333;
                                line-height: 1.5;
                            }
                            .otp-code {
                                font-size: 24px;
                                font-weight: 580;
                                color: #007bff; /* Corporate color */
                                margin: 20px 0;
                                letter-spacing: 0.25px;
                            }
                            .footer {
                                text-align: center;
                                font-size: 12px;
                                color: #777777;
                                margin-top: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <img src="https://i.ibb.co/pvHMhNN/Offer-Nmove.png" alt="Company Logo" class="logo">
                            </div>
                            <div class="content">
                                <p>Your verification code is:</p>
                                <div class="otp-code">${otp}</div>
                                <p>Please enter this code to complete your verification.</p>
                                <p>If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.</p>
                                <br>
                                <p>Thanks,</p>
                                <p>OfferNMove account team</p>
                            </div>
                            <br>
                            <br>
                            <div class="footer">
                                <p>&copy; 2024 OfferNMove. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                    `;

    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "Verify your email address",
        html: htmlContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully!");
        }
    });

    res.status(200).json({
        success: true,
        message: "Email sent successfully!",
        otp,
    });
});

const checkUser = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        const userExists = await User.findOne({ email }); 

        if (userExists) {
            return res.json({ exists: true });
        }
        
        return res.json({ exists: false });
    } catch (error) {
        console.error("Error checking user existence:", error);
        return res.status(500).json({ error: "An error occurred while checking user existence." });
    }
});

module.exports = { sendEmail, checkUser };