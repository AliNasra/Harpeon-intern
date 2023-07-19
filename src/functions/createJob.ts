const {JOB,LAWYER} = require("./initializeDatabase.ts");
const {jobSchema} = require("../models/job.ts");

const createJob = (async (params:any)=>{
    const end_date = params.end_date;
    const username = params.username;
    jobSchema.safeParse({
        principal_lawyer:username,
        end_date        :end_date
    })
    const current_user = await LAWYER.findOne({
        where:{username:username}
    });
    if (current_user.state == false || current_user.verified == false){
        return {success:false,result:"The user is either not verified or has already created a job already!"};
    }
    else{
        return JOB.create({
            principal_lawyer:username,
            end_date        :end_date
        }).then((val:any)=>{
            if (!val){
                return {success:false,result:"Job couldn't be created"};
            }
            else{
                return LAWYER.update(
                    {state:false},
                    {where:{username:username}}
                ).then((val:any)=>{
                    if (!val){
                        return {success:false,result:"Problem while updating user state encountered"};
                    }
                    else{
                        return {success:true,result:"Job added successfully"};
                    }
                }).catch((error:any)=>{
                    return {success:false,result:error};
                })
                
            }
        }).catch((error:any)=>{
            return {success:false,result:error};
        })
    }
    
})
export{
    createJob
}