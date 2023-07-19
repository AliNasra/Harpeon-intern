const { currentLocation } = require("../functions/currentLocation.ts");

/**
   * @openapi
   * /getCurrentLocation:
   *  get:
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

const getCurrentLocation = (_: any, res: any) => {
    const location = currentLocation();
    if (location.success == true) {
      res.status(200).json(location);
    } else {
      res.status(400).json(location);
    }
  }
  export{getCurrentLocation}