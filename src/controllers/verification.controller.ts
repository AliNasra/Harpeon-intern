const { sendVerificationEmail, verifyAccount } = require("../services/verification.service.ts");


/////////////////////////////////////////////////////////////////////////


const sendEmail = async (req: any, res: any) => {
    const payload = { username: req.body.username }
    const dispatchCheck = await sendVerificationEmail(payload);
    if (dispatchCheck.success == true) {
        res.status(200).json(dispatchCheck);
    }
    else {
        res.status(400).json(dispatchCheck);
    }
}


/////////////////////////////////////////////////////////////////////////


const verify = async (req: any, res: any) => {
    const token = req.params['token']
    const payload = { token: token }
    const verificationOutput = await verifyAccount(payload);
    if (verificationOutput.success == true) {
        res.status(200).json(verificationOutput);
    }
    else {
        res.status(400).json(verificationOutput);
    }
}


/////////////////////////////////////////////////////////////////////////


export { verify, sendEmail }