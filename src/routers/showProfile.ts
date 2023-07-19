const { getUserProfile } = require("../functions/getUserProfile.ts");
/**
   * @openapi
   * /user/{username}:
   *  get:
   *     tags:
   *     - Get User Profile
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token which allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: path
   *       name: username
   *       description: The username of the lawyer whose non-confidential information would be displayed to the user   
   *       required: true
   *       schema:
   *         type: string
   *       example:
   *         alec_bradley
   *     description: Allows a user to preview the profile of another user on the system
   *     responses:
   *       200:
   *         description: User data have been retrieved successfully
   *       400:
   *         description: The inserted username might not exist in the database 
   */

const showProfile = async (res: any, req: any) => {
  const results = await getUserProfile({ username: req.params['username'] });
  if (results.success == true) {
    res.status(200).json(results);
  }
  else {
    res.status(400).json(results);
  }
}
export { showProfile }