const { registerBar } = require("../functions/registerBar.ts");
/**
   * @openapi
   * /register/{bar_id}:
   *  get:
   *     tags:
   *     - Register at Bar
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token that enables the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: path
   *       name: bar_id
   *       description: The unique identifier of a particular bar where the user wants to register him/herself 
   *       required: true
   *       schema:
   *         type: integer
   *       example:
   *         13
   *     description: Allows a user to register him/herself in a bar logged in the system
   *     responses:
   *       200:
   *         description: Registration is completed
   *       400:
   *         description: The bar whose ID was provided might not exist
   */
const register = async (req: any, res: any) => {
  const payload = {
    username: req.body.username,
    bar_id: req.params['bar_id']
  };
  const registrationCheck = await registerBar(payload);
  if (registrationCheck.success == true) {
    res.status(200).json(registrationCheck);
  }
  else {
    res.status(400).json(registrationCheck);
  }
}
export { register }