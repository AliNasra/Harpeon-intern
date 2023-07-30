const { generateAccessToken, refreshToken } = require("../services/token.service.ts");


/////////////////////////////////////////////////////////////////////////


const refresh = async (req: any, res: any) => {
  const username = req.body.username;
  const refreshtoken = req.body.refreshtoken;
  console.log("The username is:", username);
  const tokenCheck = await refreshToken({
    username: username,
    refreshtoken: refreshtoken,
  });

  if (tokenCheck.success == false) {
    res.status(400).json(tokenCheck);
  }
  else {
    const accessToken = await generateAccessToken({ username: username });
    res.status(200).json({ success: true, accessToken });
  }

}


/////////////////////////////////////////////////////////////////////////


export { refresh };