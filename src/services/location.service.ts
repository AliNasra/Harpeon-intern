const { Navigator } = require("node-navigator");
const { LAWYER } = require("../utils/initializeDatabase.ts");


const currentLocation = () => {
  const navigator = new Navigator();
  navigator.geolocation.getCurrentPosition((success: any, error: any) => {
    if (error) return { success: false, result: error };
    else return { success: true, result: success };
  });
};

const updateAddress = (async (params: any) => {
  const username = params.username;
  const newAddress = params.address;
  const newLat = params.latitude;
  const newlong = params.longitude;
  const city_id = params.city_id;
  return LAWYER.update(
    {
      address: newAddress,
      latitude: newLat,
      longitude: newlong,
      city_id: city_id
    },
    {
      where: {
        username: username
      }
    }
  ).then((val: any) => {
    return { success: true, result: val }
  })
    .catch((error: any) => {
      return { success: false, result: error };
    })

})
export { currentLocation, updateAddress };