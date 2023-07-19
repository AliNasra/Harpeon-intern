const { sendInvitation } = require("../functions/sendInvitation.ts");

/**
   * @openapi
   * /invite/{username}/{job_id}:
   *  get:
   *     tags:
   *     - Invite
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
   *       name: username   
   *       required: true
   *       description: The username of the lawyer whom the user wants to invite to cooperate on a job
   *       schema:
   *         type: String
   *       example:
   *         alec_bradley
   *     - in: path
   *       name: job_id   
   *       required: true
   *       description: The unique identifier for the job which is the cornerstone of the invitation 
   *       schema:
   *         type: integer
   *       example:
   *         12
   *     description: Allows a user to send a cooperation invitation to the fellow barpeople
   *     responses:
   *       200:
   *         description: Invitation is dispatced and delievered successfully
   *       400:
   *         description: Data inconsistency where either the user didn't create that job or the user isn't verified yet or the entered invitee username doesn't exist
   */

const invite = async (req: any, res: any) => {
  const payload = {
    inviter: req.body.username,
    invited: req.params['username'],
    job_id: parseInt(req.params['job_id'])
  };
  const results = await sendInvitation(payload);
  if (results.success == true) {
    res.status(200).json(results);
  }
  else {
    res.status(400).json(results);
  }
}
export { invite }