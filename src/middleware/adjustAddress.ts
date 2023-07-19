//const request = require("request");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.GEOCODINGTOKEN; 
const axios = require("axios");
const {CITY} = require("../functions/initializeDatabase.ts");
const adjustAddress = async (req: any, res: any, next: any) => {
    try {
      const buildingNo = req.params['buildingNo'];
      const streetName = req.params['streetName'];
      const countyName = req.params['countyName'];
      const cityName = req.params['cityName'];
      const countryName = req.params['countryName'];
      const zipCode = req.params['zipCode'];
      CITY.findOne({
        where: { city_name: cityName },
      }).then((val1: any) => {
        if (!val1) {
          console.log("Didn't pass the check");
          res.status(401).json("A city of the inserted credentials wasn't found");
        } else {
          req.body.city_id = val1.city_id;
          const address =
            buildingNo +
            " " +
            streetName +
            " " +
            countyName +
            " " +
            cityName +
            " " +
            countryName +
            " " +
            zipCode;
          const params = {
              auth: token,
              locate: address,
              json: '1'
          };
          axios.get('https://geocode.xyz', {params}).then((response:any )=>{
            console.log("Geocoding result:",response.data);
            req.body.address= address;
            req.body.longitude = parseFloat(response.data.longt);
            req.body.latitude  = parseFloat(response.data.latt); 
            next();
          })  
        }
      });
    } catch (error) {
      res.send(401).json({ success: false, result: error });
    }
  };

export{
  adjustAddress
}