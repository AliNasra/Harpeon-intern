import {z} from "zod"
const rateSchema = z.object({
    rater : z.string(),
	rated : z.string(),
	rating : z.number().int().lte(10),
})
module.exports = {rateSchema}