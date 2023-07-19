const {JOB} = require("./initializeDatabase");

const sendWithdrawRequest = (async(params:any)=>{
    const jobConfirmation = await JOB.findOne({
        where: {assitant_lawyer:params.username,job_id: params.job_id}
    });
    if (!jobConfirmation){
        return {success:false,result:"Data mismatch: Please check the job_id"}
    }
    else{
        return JOB.update({
            withdrawRequest: true
        },{
            where:{
                job_id: params.job_id
            }    
        }  
        ).then((val:any)=>{
            if (!val){
                return {success: false, result: "Error encountered. Please try again"}
            }
            else{
                return {success:true,result:"Withdraw request has been sent successfully!"}
            }
        })
        .catch((error:any)=>{
            return {success:false,result:error}
        })
    }
})
export{
    sendWithdrawRequest
}