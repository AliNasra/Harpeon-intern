const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const accessToken = process.env.ACCESSTOKEN;
const {LAWYER} = require("../utils/initializeDatabase.ts");
import { Request, Response, NextFunction } from 'express';

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userHeader = req.get("Authorization");
      if (!userHeader) {
        return res.status(404).json({ success: false, msg: "Header not found" });
      } else {
        const token = userHeader.split(" ")[1];
        const verificationResult = jwt.verify(token, accessToken);
        console.log("Verification Results:", verificationResult);
        const results = (async () => {
          await LAWYER.findOne({
            where: { username: verificationResult.username },
          }).then((result: any) => {
            return JSON.stringify(result, null, 2);
          });
        });
        if (!results) {
          return res
            .status(401)
            .json({ success: false, msg: "No user with this token is found" });
        } else {
          req.body.username = verificationResult.username;
          next();
        }
      }
    } catch (error) {
      return res.status(401).json({ success: false, msg: error });
    }
  };
export{
    authenticateToken
}