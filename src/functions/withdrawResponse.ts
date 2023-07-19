const { JOB } = require("./initializeDatabase");

const withdrawResponse = (async (params: any) => {
    const job_check = await (JOB.findOne({
        where: {
            principal_lawyer: params.username,
            job_id: params.job_id
        }
    }));
    if (!job_check) {
        return { success: false, result: "Data Mismatch: Please check the data correctness" };
    }
    else {
        if (params.response == true) {
            return JOB.update({
                withdrawRequest: false,
                assistant_lawyer: null
            })
                .then((val: any) => {
                    if (!val) {
                        return { success: false, result: "Error encountered: Please try the service later again" };
                    }
                    else {
                        return { success: true, result: "The withdraw request has been responded to successfully!" };
                    }
                })
                .catch((error: any) => {
                    return { success: false, result: error }
                })
        }
        else {
            return JOB.update({
                withdrawRequest: false,
            })
                .then((val: any) => {
                    if (!val) {
                        return { success: false, result: "Error encountered: Please try the service later again" };
                    }
                    else {
                        return { success: true, result: "The withdraw request has been responded to successfully!" };
                    }
                })
                .catch((error: any) => {
                    return { success: false, result: error }
                })

        }
    }

});
export {
    withdrawResponse
}