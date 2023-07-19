const { generateAccessToken } = require("../functions/generateAccessToken.ts");
const { refreshToken } = require("../functions/refreshToken.ts");

/**
   * @openapi
   * /refreshToken:
   *  post:
   *     tags:
   *     - Refresh Token
   *     parameters:
   *     - in: body
   *       name: username
   *       description: The username of the user whose Authorization key has expired
   *       schema:
   *         type: string
   *       example:
   *         alec_bradley
   *       required: true
   *     - in: body
   *       name: refreshtoken
   *       description: The more durable refresh token to be used for refreshing the Authorization Token
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     description: The user's token is refreshed and renewed automatically if he/she overstays their session
   *     responses:
   *       200:
   *         description: A new authorization token is create successfully
   *       400:
   *         description: The refresh token is either incorrect or expired
   */

const refresh = async (req: any, res: any) => {
  const { username, refreshtoken } = req.body;
  const tokenCheck = await refreshToken({
    username: username,
    refreshtoken: refreshtoken,
  });

  if (tokenCheck.success == false) {
    res.status(400).json(tokenCheck);
  }
  const accessToken = await generateAccessToken({ username: username });
  res.status(200).json({ success: true, accessToken });
}
export { refresh };