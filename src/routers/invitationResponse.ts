const { acceptInvitation } = require("../functions/acceptInvitation.ts");

/**
   * @openapi
   * /invitationResponse/{invitation_id}:
   *  get:
   *     tags:
   *     - Invitation Response
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
   *       name: invitation_id   
   *       required: true
   *       description: A unique identifier that references a specific invitation instance
   *       schema:
   *         type: integer 
   *       example:
   *         32
   *     description: Allows the invitee user to respond to the partnership request forwarded by another user
   *     responses:
   *       200:
   *         description: Response is handled successfully
   *       400:
   *         description: Data inconsistency where either the user wasn't invited to cooperate on that job or the user isn't verified yet
   */

const invitationResponse = (async (req: any, res: any) => {
    const invitation_id = parseInt(req.params['invitation_id']);
    const username = req.body.username;
    const params = {
        invitation_id: invitation_id,
        username: username
    };
    const invitationCheck = await acceptInvitation(params);
    if (invitationCheck.success == true) {
        return res.status(200).json(invitationCheck);
    }
    else {
        return res.status(400).json(invitationCheck);
    }
});
export {
    invitationResponse
}