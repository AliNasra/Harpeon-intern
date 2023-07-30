const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const accessToken = process.env.ACCESSTOKEN;
const { LAWYER } = require("../utils/initializeDatabase.ts");

const generateAccessToken = (async (user: any) => {
  const newToken = await jwt.sign(user, accessToken, { expiresIn: "5400s" });
  return newToken;
});


const refreshToken = async (body: any) => {
  try {
    const verificationResult = jwt.verify(body.refreshtoken, accessToken);
    var extractedUsername = verificationResult.username;
  }
  catch (error: any) {
    return {
      success: false,
      result: "Invalid Refresh Key"
    }
  }
  const username = body.username;
  if (username != extractedUsername) {
    return {
      success: false,
      result: "Faulty Refresh Key"
    }
  }
  return LAWYER.findOne({
    where: { username: username },
  }).then((result: any) => {
    if (!result) {
      return {
        success: false,
        result: "No matching user was found"
      };
    } else {
      return {
        success: true,
        result: "User with matching credentials found!",
      };
    }
  })
    .then((val: any) => { return val; })
    .catch((error: any) => {
      return { success: false, result: error };
    })
};


export { generateAccessToken, refreshToken };