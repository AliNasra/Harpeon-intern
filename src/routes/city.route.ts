const express = require("express");
const { authenticateToken } = require("../middleware/authenticateToken.ts");
const { listCities, appendCity } = require("../controllers/city.controller.ts")
var bodyParser = require("body-parser");
const cityRouter = express.Router();


/**
   * @openapi
   * /addCity:
   *  post:
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

cityRouter.post("/addCity", bodyParser.json(), appendCity);

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


cityRouter.post("/listCities", bodyParser.json(), authenticateToken, listCities);

export{
   cityRouter
};
