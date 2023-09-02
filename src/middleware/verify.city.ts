const { citySchema } = require("../schema/city.ts");
import { cityBody } from "../model/city";
import { Request, Response, NextFunction } from 'express';
type AuthenticationRequest = Request & {body: cityBody}


const verifyCity = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        citySchema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(404).json({ success: false, msg: "Missing data" });
    }
}
export { verifyCity }