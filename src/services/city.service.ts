const { CITY } = require("../utils/initializeDatabase.ts");

const addCity = (data: any) => {
  return CITY.create({
    city_name: data.city_name,
  }).then(() => {
    return { success: true, result: "City added successfully!" };
  })
    .catch((error: any) => {
      return { success: false, result: error };
    })
};


const listCity = () => {
  return CITY.findAll({
    attributes: ["city_id", "city_name"],
    order: [
      ['city_id', 'ASC'],
    ]
  }).then((val: any) => {
    return { success: true, result: val };
  })
    .catch((error: any) => {
      return { success: false, result: error };
    })
};

export { addCity, listCity };