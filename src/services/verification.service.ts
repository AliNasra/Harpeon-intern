const { generateAccessToken } = require("../controllers/token.controller.ts")
const { LAWYER } = require("../utils/initializeDatabase.ts");
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const adminEmail = process.env.EMAIL;
const adminPassword = process.env.PASSWORD;
const accessToken = process.env.ACCESSTOKEN;
dotenv.config();


const sendVerificationEmail = async (params: any) => {
    try {
        console.log("Email:", adminEmail);
        console.log("Password:", adminPassword);
        const user = await LAWYER.findOne({ where: { username: params.username } });
        const transporter = nodemailer.createTransport(smtpTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            sendmail: true,
            service: 'gmail',
            auth: {
                user: adminEmail,
                pass: adminPassword
            }
        }));
        const token = await generateAccessToken(params);
        const mailConfigurations = {
            from: adminEmail,
            to: user.email,
            subject: 'Email Verification',
            text: `Copy the link below verify your account http://localhost:5000/verify/${token} `
        };
        console.log(mailConfigurations);
        return await transporter.sendMail(mailConfigurations).then(
            (val: any) => {
                if (!val) {
                    return { success: false, result: "Message couldn't be sent" };
                }
                else {
                    return { success: true, result: val };
                }
            }
        ).
            catch((error: any) => {
                return { success: false, result: error };
            })

    }
    catch (error) {
        console.log(error);
        return { success: false, result: error };
    }
};



const verifyAccount = async (params: any) => {
    const token = params.token;
    const verificationResult = jwt.verify(token, accessToken);
    console.log("Verification Results:", verificationResult);
    return LAWYER.findOne({
        where: { username: verificationResult.username },
    }).then((result: any) => {
        if (!result) {
            return ({ success: false, result: "No user with this token is found" });
        } else {
            return LAWYER.update(
                { verified: true },
                { where: { username: verificationResult.username } }
            ).then((val: any) => {
                return ({ success: true, result: val })
            })
                .catch((error: any) => {
                    return ({ success: false, result: error })
                })
        }
    }).then((val: any) => {
        return val;
    })
        .catch((error: any) => {
            return ({ success: false, result: error })
        });
};


export { sendVerificationEmail, verifyAccount };
