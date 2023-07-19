const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const accessToken = process.env.ACCESSTOKEN;
const {LAWYER} = require("../functions/initializeDatabase.ts");

const verifyAccount = async (params:any) => {
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
                {verified: true},
                {where: {username: verificationResult.username}}
              ).then((val:any)=>{
                return ({success:true, result : val})
              })
              .catch((error:any)=>{
                return ({success:false, result: error}) 
              })
            }
          }).then((val:any)=>{
            return val;
          })
          .catch((error:any)=>{
            return ({success:false, result: error})  
          });
  };
export{
    verifyAccount
}