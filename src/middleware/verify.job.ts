const { jobSchema } = require("../schema/job.ts");
import { jobBody } from "../model/job";
import { Request, Response, NextFunction } from 'express';
type AuthenticationRequest = Request & {body: jobBody}

const verifyJob = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const end_date = req.body.end_date;
        const username = req.body.username;
        jobSchema.parse({
            principal_lawyer: username,
            end_date: end_date
        })
        next();
    }
    catch (error) {
        return res.status(404).json({ success: false, msg: "Missing data" });
    }
}
export { verifyJob }
