const { setEndJob } = require("../functions/setEndJob");

/**
   * @openapi
   * /endJob/{job_id}:
   *  get:
   *     tags:
   *     - End Job
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       schema:
   *         type: string
   *       required: true
   *       description: A temporary token that allows the user to access the services of the API
   *     - in: path
   *       name: job_id
   *       example:
   *         54   
   *       required: true
   *       description: The unique identifier of the target job
   *       schema:
   *         type: integer 
   *     description: Allows the user to declare a job instance done and completed
   *     responses:
   *       200:
   *         description: Job state is updated
   *       400:
   *         description: An error was encountered while logging the new job into the database
   */

const endJob = (async (req: any, res: any) => {
    const params = {
        username: req.body.username,
        job_id: req.params['job_id'],
    }
    const sendRequest = await setEndJob(params);
    if (sendRequest.success == true) {
        return res.state(200).json(sendRequest);
    }
    else {
        return res.state(400).json(sendRequest);
    }
});
export {
    endJob
}