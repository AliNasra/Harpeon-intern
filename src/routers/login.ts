const { generateAccessToken } = require("../functions/generateAccessToken.ts");
const { loginUser } = require("../functions/loginUser.ts");

/**
   * @openapi
   * /login:
   *  post:
   *     tags:
   *     - Login
   *     description: Allows a user to login into their accounts provided they exist
   *     parameters:
   *     - in: body
   *       name: username
   *       description: The username assigned to the user
   *       required: true
   *       schema:
   *         type: string
   *       example:
   *         alec_bradley
   *     - in: body
   *       name: password
   *       description: The password the unlocks the account of user
   *       required: true
   *       schema:
   *         type: string
   *       example:
   *         alecBrad2019
   *     responses:
   *       200:
   *         description: The user successfully logged in and acquired an authorization token
   *       400:
   *         description: Data mismatch where either the username or the password is uncorrect
   */
  
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
    if (loginResults.success == true){
        res.status(200).json(loginResults);
    }
    else{
        res.status(400).json(loginResults);
    }
}
export {login}