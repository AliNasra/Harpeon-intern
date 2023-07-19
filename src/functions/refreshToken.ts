const { LAWYER } = require("./initializeDatabase.ts");

const refreshToken = async (body: any) => {
        const username = body.username;
        return LAWYER.findOne({
          where: { username: username},
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
        .then((val:any)=>{return val;})
        .catch((error:any)=>{
          return { success: false, result: error };
       })
  };
export{refreshToken};