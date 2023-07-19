const {INVITE,LAWYER,JOB} = require ("./initializeDatabase.ts");
const acceptInvitation = (async(params:any)=>{
    const username      = params.username;
    const invitation_id = params.invitation_id;

    return INVITE.findOne({
        where:{invitation_id:invitation_id}
    }).then((val:any)=>{
        if (!val){
            return {success:false,result:"Either an invitation of such kind wasn't defined or the invited lawyer took on another job!"}
        }
        else{
            const invitation = val;
            const invited = invitation.invited;
            const job_id = invitation.job_id;
            if (invited != username){
                return {success:false,result:"The invitation wasn't directed to the current user!"}
            }
            else{
                return LAWYER.update({
                    state:false
                },{
                where:{
                    username:invited
                }})
                .then((val:any)=>{
                    if (!val){
                        return {success:false,result:"Couldn't set the invited user's state accordingly"}
                    }
                    else{
                        return JOB.update({
                            assistant_lawyer: username
                        },{where:{job_id:job_id}})
                        .then((returnval:any)=>{
                            if (!returnval){
                                (async()=>{
                                    await LAWYER.update({
                                        state:true
                                    },{
                                    where:{
                                        username:invited
                                    }})
                                })();
                                return {success:false,result:"Couldn't update the job properties accordingly"};
                            }
                            else{
                                return {success:true,result:"Invitation gladly accepted. The lawyer won't be available for sometime!"}
                            }
                        })
                        .catch((error:any)=>{
                            (async()=>{
                                await LAWYER.update({
                                    state:true
                                },{
                                where:{
                                    username:invited
                                }})
                            })();
                            return {success:false,result:error};
                        })
                    }
                })
                .catch((error:any)=>{
                    return {success:false,result:error};
                })
            }

        }
    })
    .catch((error:any)=>{
        return {success:false,result:error};
    })
});

export{acceptInvitation};