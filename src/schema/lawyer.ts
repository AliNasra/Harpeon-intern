import {z} from "zod"
const lawyerSchema = z.object({
    username : z.string(),
	password : z.string().min(6),
	name : z.string(),
	surname : z.string(),
	birth_date : z.date(),
	email : z.string().email(),
	address : z.string(),
	latitude : z.number(),
	longitude: z.number(),
	bar_id : z.number(),
	state : z.boolean().optional(),
	verified : z.boolean().optional()
})
module.exports = {lawyerSchema}