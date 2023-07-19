const { addBar } = require("../functions/addBar.ts");
/**
   * @openapi
   * /addBar/{bar_name}/{address}/{city_id}/{latitude}/{longitude}:
   *  get:
   *     tags:
   *     - Add Bar
   *     parameters:
   *     - in: path
   *       name: bar_name   
   *       required: true
   *       description: The name under which the bar operates
   *       schema:
   *         type: string
   *       example:
   *         Istanbul Barosu
   *     - in: path
   *       name: address   
   *       required: true
   *       description: The address of the bar in real world
   *       schema:
   *         type: string
   *       example:
   *          Istiklal Caddesi, Orhan Adli Apaydin Sokak, No:2, 34430, Beyoglu/ISTANBUL
   *     - in: path
   *       name: city_id   
   *       required: true
   *       description: The ID of the city where the bar is located
   *       schema:
   *         type: integer
   *       example:
   *         112
   *     - in: path
   *       name: latitude   
   *       required: true
   *       description: The latitude in the address coordinates
   *       schema:
   *         type: float
   *       example:
   *         42.123
   *     - in: path
   *       name: longitude  
   *       description: The longitude in the address coordinates 
   *       required: true
   *       schema:
   *         type: float
   *       example:
   *         35.164
   *     description: Allows the administrator to add bars to the system
   *     responses:
   *       200:
   *         description: The bar has been added successfully
   *       400:
   *         description: The bar couldn't be added to the database
   */
const appendBar = async (req: any, res: any) => {
    const name = req.params['bar_name'];
    const address = req.params['address'];
    const latitude = parseFloat(req.params['latitude']);
    const longitude = parseFloat(req.params['longitude']);
    const city_id = parseInt(req.params['city_id']);
    const payload = {
      bar_name: name,
      address: address,
      city_id: city_id,
      latitude: latitude,
      longitude: longitude,
    };
    const result = await addBar(payload);
    if (result.success == true){
      res.status(200).json(result);
  }
  else{
      res.status(400).json(result);
  }
}
export{
    appendBar
}