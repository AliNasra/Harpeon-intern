const { CITY } = require("./initializeDatabase.ts");

const listCity = () => {
       return CITY.findAll({
          attributes: ["city_id", "city_name"],
          order: [
            ['city_id', 'ASC'],
          ]
        }).then((val:any)=>{
          return { success: true, result: val };
        })
        .catch((error:any)=>{
          return { success: false, result: error };
        })
  };
export{listCity};