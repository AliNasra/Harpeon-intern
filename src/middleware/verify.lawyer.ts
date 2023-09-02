const { lawyerSchema } = require("../schema/lawyer.ts");
import { lawyerBody } from "../model/lawyer";
import { Request, Response, NextFunction } from 'express';
type AuthenticationRequest = Request & {body: lawyerBody}

const verifyLawyer = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        lawyerSchema.safeParse(req.body);
        next();
    }
    catch (error) {
        return res.status(404).json({ success: false, msg: "Missing data" });
    }
}
export { verifyLawyer }