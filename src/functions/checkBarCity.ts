const { BAR, CITY, sequelizer } = require("./initializeDatabase.ts");

const checkBarCity = async (data: any) => {
      const city_name = data.city_name;
      return BAR.findAll({
          attributes:['bar_name','address','latitude','longitude','city_id'],
          include: [
            {
            model:CITY,
            attributes:[],
            where: {
              "city_name": city_name,
            }          
          }   
          ],
          
        }).then((val:any)=>{
          if (!val) {
            return { success: false, result: "Matcing bars weren't found" };
          }
          else{
            return { success: true, result: val };
          }
        })
        .catch((error:any)=>{
          console.log(error);
          return {success: false, result: error };
        })
  };
export{checkBarCity};