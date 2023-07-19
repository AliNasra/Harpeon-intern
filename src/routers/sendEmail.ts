const { sendVerificationEmail } = require("../functions/sendVerificationEmail.ts");

/**
   * @openapi
   * /sendEmail:
   *  get:
   *     tags:
   *     - Send Verification Email
   *     paramters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token that allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     description: The system adminstrator sends a verification mail to the user's registered email address
   *     responses:
   *       200:
   *         description: The email is delivered successfully
   *       400:
   *         description: The mail might have been sent to an invalid email address
   */

const sendEmail = async (req: any, res: any) => {
    const payload = { username: req.body.username }
    const dispatchCheck = await sendVerificationEmail(payload);
    if (dispatchCheck.success == true) {
        res.status(200).json(dispatchCheck);
    }
    else {
        res.status(400).json(dispatchCheck);
    }
}
export { sendEmail }