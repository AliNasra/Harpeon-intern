const { CITY } = require("../utils/initializeDatabase.ts");
const { BAR } = require("../utils/initializeDatabase.ts");

const addBar = (data: any) => {
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
    }).then(() => {
        return { success: true, result: "Bar added successfully!" };
    })
        .catch((error: any) => { return { success: false, result: error } });
};


const checkBarCity = async (data: any) => {
    const city_name = data.city_name;
    return BAR.findAll({
        attributes: ['bar_name', 'address', 'latitude', 'longitude', 'city_id'],
        include: [
            {
                model: CITY,
                attributes: [],
                where: {
                    "city_name": city_name,
                }
            }
        ],

    }).then((val: any) => {
        if (!val) {
            return { success: false, result: "Matcing bars weren't found" };
        }
        else {
            return { success: true, result: val };
        }
    })
        .catch((error: any) => {
            console.log(error);
            return { success: false, result: error };
        })
};
export { checkBarCity, addBar };