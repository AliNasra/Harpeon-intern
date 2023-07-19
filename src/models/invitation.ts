import {z} from "zod";
const inviteSchema = z.object({
    inviter: z.string(),
    invited: z.string(),
    job_id: z.number()
})
module.exports = {inviteSchema};