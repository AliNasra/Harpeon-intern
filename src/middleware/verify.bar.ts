const { barSchema } = require("../schema/bar.ts");
import { barBody } from "../model/bar";
import { Request, Response, NextFunction } from 'express';
type AuthenticationRequest = Request & {body: barBody}

const verifyBar = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        barSchema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(404).json({ success: false, msg: "Missing data" });
    }
}
export { verifyBar }
