const { rateUser } = require("../functions/rateUser.ts");

/**
   * @openapi
   * /rateLawyer/{username}/{rating}:
   *  get:
   *     tags:
   *     - Rate Lawyer
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *       description: The temporary token that allows the user to access the services of the API
   *     - in: path
   *       name: username   
   *       required: true
   *       description: The username of the user to be rated
   *       schema:
   *         type: string
   *     - in: path
   *       name: rating   
   *       required: true
   *       description: The user provides an integer on 10-scaling
   *       schema:
   *         type: integer
   *       example:
   *         8
   *     description: Allows a user to rate fellow lawyers
   *     responses:
   *       200:
   *         description: The rating has been recorded successfully
   *       400:
   *         description: The ratee username doesn't exist
   */

const rate = async (res: any, req: any) => {
  const payload = {
    username: res.body.username,
    rated: res.params['username'],
    rating: res.params['rating']
  };
  const results = await rateUser(payload);
  if (results.success == true) {
    res.status(200).json(results);
  }
  else {
    res.status(400).json(results);
  }
}
export { rate }