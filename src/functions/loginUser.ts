const { LAWYER } = require("./initializeDatabase.ts");
var bcrypt = require("bcrypt");

const loginUser = async (data: any) => {
      return LAWYER.findOne({
          where: { username: data.username },
        }).then((result: any) => {
          if (!result){
            return {
              success: false,
              result: "Failed to find a user with the given username!",
            };
          }
          else{
            const pass = data.password;
            const truePass = result.password;
            console.log("True Password:", truePass);
            console.log("encrypted Result:", pass);
            const resultPasswordCheck = bcrypt
            .compare(pass, truePass)
            .then((match: any) => {
              console.log("True Password:", truePass);
              console.log("Match Result:", match);
              if (!match) {
                return { success: false, result: "Check the inserted password!" };
              } else {
                return { success: true, result: "Successfully logged in" };
              }
            });
          return resultPasswordCheck
          }
        })
        .then((val:any)=>{
          return val;
        })
        .catch((error:any)=>{
          return { success: false, result: error };
        });
  };
export{loginUser};