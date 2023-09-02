const { inviteSchema } = require("../schema/invitation.ts");
import { invitationBody } from "../model/invitation";
import { Request, Response, NextFunction } from 'express';
type AuthenticationRequest = Request & {body: invitationBody}


const verifyInvitation = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const inviter = req.body.inviter;
        const invited = req.body.invited;
        const job_id = req.body.job_id;
        inviteSchema.parse({
            inviter: inviter,
            invited: invited,
            job_id: job_id,
        });
        next();
    }
    catch (error) {
        return res.status(404).json({ success: false, msg: "Missing data" });
    }
}
export { verifyInvitation }