const { updateAddress } = require("../functions/updateAddress.ts");

/**
   * @openapi
   * /updateLocation/{address}/{latitude}/{longitude}/{city_id}:
   *  get:
   *     tags:
   *     - Update Location
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token which entitles the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       required: true
   *     - in: path
   *       name: address   
   *       required: true
   *       description: The new address of the user in real world terms e.g. Hisarustu Cami Sokagi
   *       schema:
   *         type: string
   *     - in: path
   *       name: latitude
   *       description: The latitude half of the supplied address' coordinates
   *       required: true
   *       schema:
   *         type: float
   *     - in: path
   *       name: longitude
   *       description: The longitude half of the supplied address' coordinates   
   *       required: true
   *       schema:
   *         type: float
   *     - in: path
   *       name: city_id
   *       description: The unique identifier of the city to which the user moved to  
   *       required: true
   *       schema:
   *         type: integer
   *     description: Allows a user to change his/her address
   *     responses:
   *       200:
   *         description: Address is updated successfully
   *       400:
   *         description: The inserted data may not be consistent with the schema
   */

const updateLocation = (async (req: any, res: any) => {
    const payload = {
        username: req.body.username,
        address: req.params['address'],
        latitude: req.params['latitude'],
        longitude: req.params['longitude'],
        city_id: req.params['city_id']
    };
    const updateProcedure = await updateAddress(payload);
    if (updateProcedure.success == true) {
        res.status(200).json(updateProcedure);
    }
    else {
        res.status(400).json(updateProcedure);
    }

});
export {
    updateLocation
};