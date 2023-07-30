const { checkBarCity, addBar } = require("../services/bar.service.ts");
const { LAWYER } = require("../utils/initializeDatabase.ts");


/////////////////////////////////////////////////////////////////////////


const appendBar = async (req: any, res: any) => {
    const name = req.body.bar_name;
    const address = req.body.address;
    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);
    const city_id = parseInt(req.body.city_id);
    const payload = {
        bar_name: name,
        address: address,
        city_id: city_id,
        latitude: latitude,
        longitude: longitude,
    };
    const result = await addBar(payload);
    if (result.success == true) {
        res.status(200).json(result);
    }
    else {
        res.status(400).json(result);
    }
}


/////////////////////////////////////////////////////////////////////////


const barsInCity = async (req: any, res: any) => {
    const payload = {
        city_name: req.body.city_name
    };
    const queryResults = await checkBarCity(payload);
    if (queryResults.success == true) {
        console.log(queryResults);
        const { latitude, longitude } = await LAWYER.findOne({
            where: { username: req.body.username }
        });
        const distance = (latt: any, longt: any) => {
            const R = 6371000;
            const thetaA = latt * Math.PI / 180;
            const thetaB = latitude * Math.PI / 180;
            const diffTheta = (latitude - latt) * Math.PI / 180;
            const diffLambda = (longitude - longt) * Math.PI / 180;
            const a = Math.sin(diffTheta / 2) * Math.sin(diffTheta / 2) + Math.cos(thetaA) * Math.cos(thetaB) * Math.sin(diffLambda / 2) * Math.sin(diffLambda / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            const distance = R * c;
            console.log(distance, "in meters");
            return distance
        };
        queryResults.result.forEach(function (element: any) {
            element.distance = distance(element.latitude, element.longitude);
        });

        if (Array.isArray(queryResults.result)) {
            const temp = queryResults.result;
            console.log(temp);
            temp.sort((a: any, b: any) => {
                return a.distance - b.distance;
            });
            res.status(200).json({ success: true, result: temp });
        }
        else {
            res.status(200).json(queryResults);
        }


    }
    else {
        res.status(400).json(queryResults);
    }
}


/////////////////////////////////////////////////////////////////////////


export {
    barsInCity,
    appendBar
}