const { LAWYER } = require("./initializeDatabase.ts");

const getUserProfile = async (params: any) => {
      const username = params.username;
      return LAWYER.findOne({
        where: {
          username: username,
        },
      }).then((result:any)=>{
          return { success: true, result: result };
      })
      .catch((error:any)=>{
        return { success: false, result: error };
      })
  };
export{getUserProfile};