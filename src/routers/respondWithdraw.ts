const { withdrawResponse } = require("../functions/withdrawResponse");

/**
   * @openapi
   * /respondWithdraw/{job_id}/{response}:
   *  get:
   *     tags:
   *     - Respond to a withdraw request
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token that allows the user to access the endpoints of the server
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: path
   *       name: job_id   
   *       required: true
   *       description: The unique identifier of the JOB from which the user's partner wants to withdraw
   *       schema:
   *         type: integer
   *       example:
   *         56
   *     - in: path
   *       name: response 
   *       description: The response to the withdraw request with Either true for affirmative response or false for refusal
   *       required: true
   *       schema:
   *         type: boolean
   *       example:
   *         true
   *     description: Allows a user to respond either affirmatively or negatively to a partner's request
   *     responses:
   *       200:
   *         description: Response is recorded correctly
   *       400:
   *         description: The user might not be the principle lawyer of the job
   */

const respondWithdraw = (async (req: any, res: any) => {
    var responseCheck = 1;
    var response = req.params['response'];
    if (response == 'true') {
        response = true;
    }
    else if (response == 'false') {
        response = false;
    }
    else {
        responseCheck = 0;
        return res.state(400).json("The response must be either true or false");
    }
    if (responseCheck == 1) {
        const params = {
            username: req.body.username,
            job_id: req.params['job_id'],
            response: response
        }
        const sendRequest = await withdrawResponse(params);
        if (sendRequest.success == true) {
            return res.state(200).json(sendRequest);
        }
        else {
            return res.state(400).json(sendRequest);
        }
    }
});
export {
    respondWithdraw
}