const { availableLawyers } = require("../functions/availableLawyers.ts");
/**
   * @openapi
   * /availableLawyers:
   *  get:
   *     tags:
   *     - Available Lawyers
   *     paramters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: A temporary token that allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     description: Allow the user to list all available lawyers
   *     responses:
   *       200:
   *         description: The list of available lawyers has been compiled and retrieved successfully to the user.
   *       400:
   *         description: An error was encountered while fetching available lawyers
   */
const freeLawyers = async (req: any, res: any) => {
  const payload = { bar_id: req.params['bar_id'] };
  const results = await availableLawyers(payload);
  if (results.success == true) {
    res.status(200).json(results);
  }
  else {
    res.status(400).json(results);
  }
}
export { freeLawyers }