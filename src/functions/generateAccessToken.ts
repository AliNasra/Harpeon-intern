const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const accessToken = process.env.ACCESSTOKEN;

const generateAccessToken = (async (user: any) => {
    const newToken = await jwt.sign(user, accessToken, { expiresIn: "5400s" });
    return newToken;
  });
export{generateAccessToken};