const { getUserProfile, availableLawyers, acceptInvitation, loginUser, rateUser, registerBar, registerUser, sendInvitation, sendWithdrawRequest, withdrawResponse } = require("../services/user.service");
const { generateAccessToken } = require("../services/token.service.ts");


/////////////////////////////////////////////////////////////////////////


const freeLawyers = async (req: any, res: any) => {
  const payload = { bar_id: req.params['bar_id'] };
  const results = await availableLawyers(payload);
  if (results.success == true) {
    res.status(200).json(results);
  }
  else {
    res.status(400).json(results);
  }
}


/////////////////////////////////////////////////////////////////////////


const invitationResponse = (async (req: any, res: any) => {
  const invitation_id = parseInt(req.body.invitation_id);
  const username = req.body.username;
  const params = {
    invitation_id: invitation_id,
    username: username
  };
  const invitationCheck = await acceptInvitation(params);
  if (invitationCheck.success == true) {
    return res.status(200).json(invitationCheck);
  }
  else {
    return res.status(400).json(invitationCheck);
  }
});


/////////////////////////////////////////////////////////////////////////


const invite = async (req: any, res: any) => {
  const payload = {
    inviter: req.body.username,
    invited: req.body.username,
    job_id: parseInt(req.body.job_id)
  };
  const results = await sendInvitation(payload);
  if (results.success == true) {
    res.status(200).json(results);
  }
  else {
    res.status(400).json(results);
  }
}


/////////////////////////////////////////////////////////////////////////


const login = async (req: any, res: any) => {
  const username = req.body.username;
  const password_login = req.body.password;
  const params = {
    username: username,
    password: password_login,
  };
  const token = await generateAccessToken({ username: req.body.username });
  console.log("Access Token:", token);
  const loginResults = await loginUser(params);
  if (loginResults.success == true) {
    loginResults['accessToken'] = token;
    res.status(200).json(loginResults);
  }
  else {
    res.status(400).json(loginResults);
  }
}


/////////////////////////////////////////////////////////////////////////


const rate = async (req: any, res: any) => {
  const payload = {
    username: req.body.username,
    rated: req.body.username,
    rating: req.body.rating
  };
  const results = await rateUser(payload);
  if (results.success == true) {
    res.status(200).json(results);
  }
  else {
    res.status(400).json(results);
  }
}


/////////////////////////////////////////////////////////////////////////


const register = async (req: any, res: any) => {
  const payload = {
    username: req.body.username,
    bar_id: req.body.bar_id
  };
  const registrationCheck = await registerBar(payload);
  if (registrationCheck.success == true) {
    res.status(200).json(registrationCheck);
  }
  else {
    res.status(400).json(registrationCheck);
  }
}


/////////////////////////////////////////////////////////////////////////


const respondWithdraw = async (req: any, res: any) => {
  var responseCheck = 1;
  var response = req.body.response;
  if (response == 'true') {
    response = true;
  }
  else if (response == 'false') {
    response = false;
  }
  else {
    responseCheck = 0;
  }
  if (responseCheck == 1) {
    const params = {
      username: req.body.username,
      job_id: req.body.job_id,
      response: response
    }
    withdrawResponse(params).then((val: any) => {
      console.log(val);
      if (val.success == true) {
        res.status(200).json(val);
      }
      else {
        res.status(400).json(val);
      }
    })
  }
  else {
    res.status(400).json("The response must be either true or false");
  }
};


/////////////////////////////////////////////////////////////////////////


const showProfile = async (res: any, req: any) => {
  const results = await getUserProfile({ username: req.body.username });
  if (results.success == true) {
    res.status(200).json(results);
  }
  else {
    res.status(400).json(results);
  }
}


/////////////////////////////////////////////////////////////////////////


const signup = async (req: any, res: any) => {
  const payload = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    birth_date: req.body.birth_date,
    email: req.body.email,
    address: req.body.address,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };
  const registerResult = await registerUser(payload);
  if (registerResult.success == true) {
    res.status(200).json(registerResult);
  }
  else {
    res.status(400).json(registerResult);
  }
}


/////////////////////////////////////////////////////////////////////////


const withdraw = async (req: any, res: any) => {
  const payload = {
    username: req.body.username,
    job_id: req.body.job_id
  }
  const dispatchCheck = await sendWithdrawRequest(payload);
  if (dispatchCheck.success == true) {
    res.status(200).json(dispatchCheck);
  }
  else {
    res.status(400).json(dispatchCheck);
  }
}


/////////////////////////////////////////////////////////////////////////


export {
  withdraw, signup, showProfile, respondWithdraw, register, rate, login, invite, invitationResponse,
  freeLawyers
}