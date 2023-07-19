const { inviteSchema } = require("../models/invitation.ts");
const { INVITE, LAWYER, JOB } = require("./initializeDatabase.ts");

const sendInvitation = async (params: any) => {
  try {
    const inviter = params.inviter;
    const invited = params.invited;
    const job_id = params.job_id;
    inviteSchema.parse({
      inviter: inviter,
      invited: invited,
      job_id: job_id,
    });
    const verificationCheckInviter = await LAWYER.findOne({
      attributes: ['verified', 'state'],
      where: { username: inviter }
    });
    const verificationCheckInvited = await LAWYER.findOne({
      attributes: ['verified', 'state'],
      where: { username: invited }
    });
    const work = await JOB.findOne({
      where: {
        job_id: job_id,
        job_ended: false
      }
    })
    if (!work) {
      return { success: false, result: "Job with such ID doesn't exist!" };
    }
    else {
      if (work.principal_lawyer != inviter) {
        return { success: false, result: "This job wasn't assigned to the current user!" };
      }
    }

    if (verificationCheckInvited.verified == true && verificationCheckInvited.state == true && verificationCheckInviter.verified == true && verificationCheckInviter.state == false) {
      await INVITE.create({
        inviter: inviter,
        invited: invited,
        job_id: job_id,
      });
      return { success: true, result: "Invitation sent successfully!" };
    }
    else {
      return { success: false, result: "Both users should be verified!" };
    }

  } catch (error) {
    return { success: false, result: error };
  }
};
export { sendInvitation };
