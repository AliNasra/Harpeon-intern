import {z} from "zod"
const citySchema = z.object({
    city_id : z.number().optional(),
	city_name : z.string()
})
module.exports = {citySchema}