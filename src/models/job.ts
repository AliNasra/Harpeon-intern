import {z} from "zod"
const jobSchema = z.object({
    job_id : z.number().optional(),
	principal_lawyer : z.string(),
	assistant_lawyer : z.string().optional(),
    end_date: z.date()
})
module.exports = {jobSchema}