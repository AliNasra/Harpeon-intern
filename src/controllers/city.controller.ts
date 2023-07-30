const { addCity, listCity } = require("../services/city.service.ts");


/////////////////////////////////////////////////////////////////////////


const appendCity = async (req: any, res: any) => {
    const payload = {
        city_name: req.body.city_name
    };
    const response_expected = await addCity(payload);
    if (response_expected.success == true) {
        res.status(200).json(response_expected);
    }
    else {
        res.status(400).json(response_expected);
    }
}


/////////////////////////////////////////////////////////////////////////


const listCities = async (_: any, res: any) => {
    const city_list_Reponse = await listCity();
    if (city_list_Reponse.success == true) {
        res.status(200).json(city_list_Reponse);
    }
    else {
        res.status(400).json(city_list_Reponse);
    }
}


/////////////////////////////////////////////////////////////////////////


export { listCities, appendCity }