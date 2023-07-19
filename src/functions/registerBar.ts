const { LAWYER } = require("./initializeDatabase.ts");

const registerBar = async (data:any)=>{
      const username = data.username;
      const bar_id = data.bar_id;
      return LAWYER.update(
        {bar_id: bar_id},
        {where: {username: username}}
      ).then((val:any)=>{
        return {success: true,result:val};
      })
      .catch((error:any)=>{
        return {success: false,result:error};
      })
  };
export{registerBar};