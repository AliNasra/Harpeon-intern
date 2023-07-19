const { citySchema } = require("../models/city.ts");
const { CITY } = require("./initializeDatabase.ts");

const addCity = (data: any) => {
      citySchema.safeParse(data);
      return CITY.create({
          city_name: data.city_name,
        }).then(()=>{
        return { success: true, result: "City added successfully!" };
      })
      .catch((error:any)=>{
        return { success: false, result: error };
      })  
  };
export{addCity};