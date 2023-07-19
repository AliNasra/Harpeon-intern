const { listCity } = require("../functions/listCity.ts");

/**
   * @openapi
   * /listCities:
   *  get:
   *     tags:
   *     - List Cities
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: A temporary token that allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     description: Allows a user to list the cities recorded in the server's database
   *     responses:
   *       200:
   *         description: The city list has been retrieved and returned successfully
   *       400:
   *         description: An error encountered while fetchin the cities from the database     
   */

const listCities = async (_: any, res: any) => {
    //console.log("Request Received");
    const city_list_Reponse = await listCity();
    if (city_list_Reponse.success == true) {
        res.status(200).json(city_list_Reponse);
    }
    else {
        res.status(400).json(city_list_Reponse);
    }
}
export { listCities }