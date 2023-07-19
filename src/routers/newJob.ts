const { createJob } = require("../functions/createJob.ts");

/**
   * @openapi
   * /newJob/{end_date}:
   *  get:
   *     tags:
   *     - New Job
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: A temporary token that allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: path
   *       name: end_date 
   *       description: The tentative deadline of the announced job  
   *       required: true
   *       example:
   *         05/12/2024
   *       schema:
   *         type: date
   *     description: Allows a user to create a new job
   *     responses:
   *       200:
   *         description: A job instance is instantiated successfully 
   *       400:
   *         description: The user is either unverified or unavailable
   */

const newJob = (async (req: any, res: any) => {
    const end_date = Date.parse(req.params['end_date']);
    const username = req.body.username;
    const params = {
        username: username,
        end_date: end_date
    }
    const newJobCheck = await createJob(params);
    if (newJobCheck.success == true) {
        return res.status(200).json(newJobCheck);
    }
    else {
        return res.status(400).json(newJobCheck);
    }
});
export {
    newJob
}