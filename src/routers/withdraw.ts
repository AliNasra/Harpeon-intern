const { sendWithdrawRequest } = require("../functions/sendWithdrawRequest.ts");

/**
   * @openapi
   * /withdraw/{job_id}:
   *  get:
   *     tags:
   *     - Withdraw
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token which enables the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: path
   *       name: job_id
   *       description: The unique identifier which singles out the specific job from which the user wants to withdraw
   *       required: true
   *       schema:
   *         type: integer
   *       example:
   *          213
   *     description: Allows a lawyer to withdraw from a job case where he/she is an assistant lawyer
   *     responses:
   *       200:
   *         description: Withdrawl request is delivered successfully
   *       400:
   *         description: The user might not have partaken in this job as an assistant lawyer
   */

const withdraw = async (req: any, res: any) => {
    const payload = {
        username: req.body.username,
        job_id: req.params['job_id']
    }
    const dispatchCheck = await sendWithdrawRequest(payload);
    if (dispatchCheck.success == true) {
        res.status(200).json(dispatchCheck);
    }
    else {
        res.status(400).json(dispatchCheck);
    }
}
export { withdraw }