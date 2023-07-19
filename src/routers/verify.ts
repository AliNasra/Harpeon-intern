const { verifyAccount } = require("../functions/verifyAccount.ts");

/**
   * @openapi
   * /verify/{token}:
   *  post:
   *     tags:
   *     - Verify User
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
   *       name: token   
   *       required: true
   *       description: A temporary token used by the API to verify the authenticity of the user-supplied data
   *       schema:
   *         type: string 
   *     description: The user is verified by the token appended to the url
   *     responses:
   *       200:
   *         description: The user is verified as legit
   *       400:
   *         description: The token has expired
   */

const verify = async (req: any, res: any) => {
    const token = req.params['token']
    const payload = { token: token }
    const verificationOutput = await verifyAccount(payload);
    if (verificationOutput.success == true) {
        res.status(200).json(verificationOutput);
    }
    else {
        res.status(400).json(verificationOutput);
    }
}
export { verify }