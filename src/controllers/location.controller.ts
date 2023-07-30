const { currentLocation, updateAddress } = require("../services/location.service.ts");


/////////////////////////////////////////////////////////////////////////


const getCurrentLocation = (_: any, res: any) => {
    const location = currentLocation();
    if (location.success == true) {
        res.status(200).json(location);
    } else {
        res.status(400).json(location);
    }
}


/////////////////////////////////////////////////////////////////////////


const updateLocation = (async (req: any, res: any) => {
    const payload = {
        username: req.body.username,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        city_id: req.body.city_id
    };
    const updateProcedure = await updateAddress(payload);
    if (updateProcedure.success == true) {
        res.status(200).json(updateProcedure);
    }
    else {
        res.status(400).json(updateProcedure);
    }

});


/////////////////////////////////////////////////////////////////////////


export {
    updateLocation,
    getCurrentLocation
};