const dotenv = require("dotenv");
dotenv.config();
const { lawyerSchema } = require("../models/lawyer.ts");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.REFRESHTOKEN;
const { LAWYER } = require("./initializeDatabase.ts");

const registerUser = function (reqBody: any) {
      const dataBody = reqBody;
      var refreshtokenUser = jwt.sign({ username: dataBody.username }, jwtKey);
      console.log("Refresh Token is ", refreshtokenUser);
      console.log(typeof refreshtokenUser);
      lawyerSchema.safeParse(dataBody);
      var hashedPassword = bcrypt.hashSync(dataBody.password, 10);
      return LAWYER.create({
          username: dataBody.username,
          password: hashedPassword,
          name: dataBody.name,
          surname: dataBody.surname,
          birth_date:dataBody.birth_date,
          email:dataBody.email,
          address:dataBody.address,
          latitude:dataBody.latitude,
          longitude:dataBody.longitude,
          bar_id:null,
          partner:null,
          state:true,
          verified:false
        }).then((val:any)=>{
          return { success: true, result: val };
        }).catch((error:any)=>{
          return { success: false, result: error };
        })
  };
export{registerUser};


