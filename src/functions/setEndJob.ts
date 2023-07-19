const { JOB, LAWYER } = require("./initializeDatabase");

const setEndJob = (async (params: any) => {
    const job = await (JOB.findOne({
        where: {
            job_id: params.job_id,
            principal_lawyer: params.username
        }
    }));
    if (!job) {
        return { success: false, result: "Mismatch Error: The user has to be primary lawyer of the case" }
    }
    else {
        const principal_lawyer = await LAWYER.findOne({
            where: {
                username: job.principal_lawyer
            }
        });
        const assistant_lawyer = await LAWYER.findOne({
            where: {
                username: job.assitant_lawyer
            }
        });
        if (principal_lawyer) {
            await LAWYER.update({
                state: true
            }, {
                where: {
                    username: principal_lawyer.username
                }
            });
        }
        if (assistant_lawyer) {
            await LAWYER.update({
                state: true
            }, {
                where: {
                    username: assistant_lawyer.username
                }
            });
        }
        return JOB.update({
            job_ended: true
        }
            , {
                where: {
                    job_id: params.job_id
                }
            }
        )
            .then((val: any) => {
                if (!val) {
                    return { success: false, result: "Problem encountered. Please try the service later!" }
                }
                else {
                    return { success: true, result: "Job declared concluded successfully!" }
                }
            })
            .catch((error: any) => {
                return { success: false, result: error }
            })
    }
});
export {
    setEndJob
}