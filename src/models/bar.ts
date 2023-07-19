import {z} from "zod"
const barSchema = z.object({
    bar_id   : z.number().optional(),
	bar_name : z.string(),
	address  : z.string(),
	city_id  : z.number(),
	latitude : z.number(),
	longitude: z.number()
})
module.exports = {barSchema}