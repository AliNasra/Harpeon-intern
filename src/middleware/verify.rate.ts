const { rateSchema } = require("../schema/rate.ts");
import { rateBody } from "../model/rate";
import { Request, Response, NextFunction } from 'express';
type AuthenticationRequest = Request & {body: rateBody}

const verifyRate = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    try {
        const rater = req.body.username;
        const rated = req.body.rated;
        const rating = req.body.rating;
        rateSchema.parse({
            rater: rater,
            rated: rated,
            rating: parseInt(rating),
        });
        next();
    }
    catch (error) {
        return res.status(404).json({ success: false, msg: "Missing data" });
    }
}
export { verifyRate }
