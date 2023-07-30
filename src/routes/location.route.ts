const express = require("express");
const { authenticateToken } = require("../middleware/authenticateToken.ts");
const { updateLocation, getCurrentLocation } = require("../controllers/location.controller.ts")
const locationRouter = express.Router();
var bodyParser = require("body-parser");


/**
   * @openapi
   * /getCurrentLocation:
   *  post:
   *     tags:
   *     - Get Current Location
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: A temporary token that allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     description: Informs the user on his/her current location
   *     responses:
   *       200:
   *         description: The user's current location has been successfully detected and retrieved
   *       400:
   *         description: An error was encountered while fetching the user's location
   */

locationRouter.post("/getCurrentLocation", authenticateToken, getCurrentLocation);

/**
   * @openapi
   * /updateLocation:
   *  post:
   *     tags:
   *     - Update Location
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token which entitles the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       required: true
   *     - in: body
   *       name: address   
   *       required: true
   *       description: The new address of the user in real world terms e.g. Hisarustu Cami Sokagi
   *       schema:
   *         type: string
   *     - in: body
   *       name: latitude
   *       description: The latitude half of the supplied address' coordinates
   *       required: true
   *       schema:
   *         type: float
   *     - in: body
   *       name: longitude
   *       description: The longitude half of the supplied address' coordinates   
   *       required: true
   *       schema:
   *         type: float
   *     - in: body
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

locationRouter.post("/updateLocation", bodyParser.json(), authenticateToken, updateLocation);


export { locationRouter };
