import { log } from "console";
import { result } from "lodash";

const { checkBarCity } = require("../functions/checkBarCity.ts");
const { LAWYER } = require("../functions/initializeDatabase.ts");

/**
   * @openapi
   * /barsInCity/{city_name}:
   *  get:
   *     tags:
   *     - Bars in City
   *     parameters:
   *     - in: path
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

const barsInCity = async (req: any, res: any) => {
  const payload = {
    city_name: req.params['city_name']
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

    //console.log("Query Results are",JSON.stringify(queryResults));
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
export { barsInCity }