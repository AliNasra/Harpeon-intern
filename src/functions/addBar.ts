const { barSchema } = require("../models/bar.ts");
const { BAR } = require("./initializeDatabase.ts");

const addBar = (data: any) => {
      barSchema.safeParse(data);
      const name = data.bar_name;
      const address = data.address;
      const latitude = data.latitude;
      const longitude = data.longitude;
      const city_id = data.city_id;
      return BAR.create({
          bar_name: name,
          address: address,
          latitude: latitude,
          longitude: longitude,
          city_id: city_id,
        }).then(()=>{
          return { success: true, result: "Bar added successfully!" };
        })
        .catch((error:any)=>{return { success: false, result: error }});
  };
  export{addBar};