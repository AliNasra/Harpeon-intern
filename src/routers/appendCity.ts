const { addCity } = require("../functions/addCity.ts");

/**
   * @openapi
   * /addCity/{city_name}:
   *  get:
   *     tags:
   *     - Add City
   *     parameters:
   *     - in: path
   *       name: city_name   
   *       required: true
   *       description: The name of the city
   *       schema:
   *         type: string
   *       example:
   *         Istanbul
   *     description: Allows the administrator to add cities to the system
   *     responses:
   *       200:
   *         description: The city has been added successfully
   *       400:
   *         description: The city couldn't be added to the database
   */
const appendCity = async (req: any, res: any) => {
    const payload = { 
        city_name: req.params['city_name'] 
    };
    const response_expected = await addCity(payload);
    if (response_expected.success == true){
        res.status(200).json(response_expected);
    }
    else{
        res.status(400).json(response_expected);
    }
}
export{
    appendCity
}