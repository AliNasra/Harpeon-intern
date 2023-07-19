const { rateSchema } = require("../models/rate.ts");
const { RATE } = require("./initializeDatabase.ts");

const rateUser = async (params: any) => {
      const rater = params.username;
      const rated = params.rated;
      const rating = params.rating;
      rateSchema.parse({
        rater: rater,
        rated: rated,
        rating: rating,
      });
      return RATE.create({
        rater: rater,
        rated: rated,
        rating: rating,
      }).then((val:any)=>{
        return { success: true, result: val };
      })
      .catch((error:any)=>{
        return { success: false, result: error };
      })
  };
export{
    rateUser
};