const { createJob, setEndJob } = require("../services/job.service.ts");


/////////////////////////////////////////////////////////////////////////


const endJob = (async (req: any, res: any) => {
    const params = {
        username: req.body.username,
        job_id: req.body.job_id,
    }
    const sendRequest = await setEndJob(params);
    if (sendRequest.success == true) {
        return res.status(200).json(sendRequest);
    }
    else {
        return res.status(400).json(sendRequest);
    }
});


/////////////////////////////////////////////////////////////////////////


const newJob = (async (req: any, res: any) => {
    const end_date = Date.parse(req.body.end_date);
    const username = req.body.username;
    const params = {
        username: username,
        end_date: end_date
    }
    const newJobCheck = await createJob(params);
    if (newJobCheck.success == true) {
        return res.status(200).json(newJobCheck);
    }
    else {
        return res.status(400).json(newJobCheck);
    }
});


/////////////////////////////////////////////////////////////////////////


export {
    newJob,
    endJob
}