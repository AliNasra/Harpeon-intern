const express = require("express");
const { authenticateToken } = require("../middleware/authenticateToken.ts");
const { barsInCity, appendBar } = require("../controllers/bar.controller.ts")
var bodyParser = require("body-parser");
const barRouter = express.Router();


/**
   * @openapi
   * /addBar:
   *  post:
   *     tags:
   *     - Add Bar
   *     parameters:
   *     - in: body
   *       name: bar_name   
   *       required: true
   *       description: The name under which the bar operates
   *       schema:
   *         type: string
   *       example:
   *         Istanbul Barosu
   *     - in: body
   *       name: address   
   *       required: true
   *       description: The address of the bar in real world
   *       schema:
   *         type: string
   *       example:
   *          Istiklal Caddesi, Orhan Adli Apaydin Sokak, No:2, 34430, Beyoglu/ISTANBUL
   *     - in: body
   *       name: city_id   
   *       required: true
   *       description: The ID of the city where the bar is located
   *       schema:
   *         type: integer
   *       example:
   *         112
   *     - in: body
   *       name: latitude   
   *       required: true
   *       description: The latitude in the address coordinates
   *       schema:
   *         type: float
   *       example:
   *         42.123
   *     - in: body
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

barRouter.post("/addBar", bodyParser.json(), appendBar);

/**
   * @openapi
   * /barsInCity:
   *  post:
   *     tags:
   *     - Bars in City
   *     parameters:
   *     - in: body
   *       name: city_name   
   *       required: true
   *       description: The name of the city where we accommodates the intended bars
   *       schema:
   *         type: string
   *       example:
   *         Istanbul
   *     - in: header
   *       name: AuthorizationToken
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       schema:
   *         type: string
   *       required: true
   *       description: A temporary token that allows the user to access the endpoints of the API
   *     description: Allows the user to list the Bars currently registered in any city of choice
   *     responses:
   *       200:
   *         description: The list of the bars is retrieved, sorted ascendingly according to their distances from the user, and returned successfully.
   *       400:
   *         description: An error encountered while retrieving the data from the database
   */


barRouter.post("/barsInCity", bodyParser.json(), authenticateToken, barsInCity);

export { barRouter };
