const { withdraw, signup, showProfile, respondWithdraw, register, rate, login, invite, invitationResponse,
   freeLawyers } = require("../controllers/user.controller.ts");
const express = require("express");
const { authenticateToken } = require("../middleware/authenticateToken.ts");
var bodyParser = require("body-parser");
const userRouter = express.Router();


/**
   * @openapi
   * /signup:
   *  post:
   *      tags:
   *      - Sign up
   *      description: Allows a user to create an account on the platform
   *      parameters:
   *      - in: body
   *        name: username
   *        description: The username assigned to the user
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          alec_bradley
   *      - in: body
   *        name: password
   *        description: The password the unlocks the account of user
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          alecBrad2019
   *      - in: body
   *        name: name
   *        description: The first name of the user
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          Alec
   *      - in: body
   *        name: surname
   *        description: The last name of the user
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          Bradley
   *      - in: body
   *        name: birth_date
   *        description: The user's birthday
   *        required: true
   *        schema:
   *          type: date
   *        example:
   *          01/09/1995
   *      - in: body
   *        name: email
   *        description: The email address of the username
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          alec.bradley@gmail.com
   *      - in: body
   *        name: address
   *        description: The user's address in real-world setting e.g. Besiktas Meydani Cami Sokagi
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          Rumeli Hisari, Hisar Ustu Nispetiye Cd No:7, 34342 Sariyer/Istanbul
   *      - in: body
   *        name: latitude
   *        description: The latitude part of the coordinates that refer to the address
   *        required: true
   *        example:
   *          54.234
   *        schema:
   *          type: float
   *      - in: body
   *        name: longitude
   *        description: The longitude part of the coordinates that refer to the address
   *        required: true
   *        example:
   *          45.593
   *        schema:
   *          type: float
   *      responses:
   *        200:
   *          description: The user is registered successfully
   *        400:
   *          description: The inserted data may not be consistent with the defined schema of the user
   */

userRouter.post("/signup", bodyParser.json(), signup);

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

userRouter.post("/login", bodyParser.json(), login);

/**
   * @openapi
   * /availableLawyers:
   *  post:
   *     tags:
   *     - Available Lawyers
   *     paramters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: A temporary token that allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     description: Allow the user to list all available lawyers
   *     responses:
   *       200:
   *         description: The list of available lawyers has been compiled and retrieved successfully to the user.
   *       400:
   *         description: An error was encountered while fetching available lawyers
   */

userRouter.post("/availableLawyers", bodyParser.json(), authenticateToken, freeLawyers);

/**
   * @openapi
   * /invite:
   *  post:
   *     tags:
   *     - Invite
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: A temporary token that allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: body
   *       name: username   
   *       required: true
   *       description: The username of the lawyer whom the user wants to invite to cooperate on a job
   *       schema:
   *         type: String
   *       example:
   *         alec_bradley
   *     - in: body
   *       name: job_id   
   *       required: true
   *       description: The unique identifier for the job which is the cornerstone of the invitation 
   *       schema:
   *         type: integer
   *       example:
   *         12
   *     description: Allows a user to send a cooperation invitation to the fellow barpeople
   *     responses:
   *       200:
   *         description: Invitation is dispatced and delievered successfully
   *       400:
   *         description: Data inconsistency where either the user didn't create that job or the user isn't verified yet or the entered invitee username doesn't exist
   */

userRouter.post("/invite", bodyParser.json(), authenticateToken, invite);

/**
   * @openapi
   * /rateLawyer:
   *  post:
   *     tags:
   *     - Rate Lawyer
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *       description: The temporary token that allows the user to access the services of the API
   *     - in: body
   *       name: username   
   *       required: true
   *       description: The username of the user to be rated
   *       schema:
   *         type: string
   *     - in: body
   *       name: rating   
   *       required: true
   *       description: The user provides an integer on 10-scaling
   *       schema:
   *         type: integer
   *       example:
   *         8
   *     description: Allows a user to rate fellow lawyers
   *     responses:
   *       200:
   *         description: The rating has been recorded successfully
   *       400:
   *         description: The ratee username doesn't exist
   */

userRouter.post("/rateLawyer", bodyParser.json(), authenticateToken, rate);

/**
   * @openapi
   * /user/{username}:
   *  post:
   *     tags:
   *     - Get User Profile
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token which allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: body
   *       name: username
   *       description: The username of the lawyer whose non-confidential information would be displayed to the user   
   *       required: true
   *       schema:
   *         type: string
   *       example:
   *         alec_bradley
   *     description: Allows a user to preview the profile of another user on the system
   *     responses:
   *       200:
   *         description: User data have been retrieved successfully
   *       400:
   *         description: The inserted username might not exist in the database 
   */

userRouter.post("/user", bodyParser.json(), authenticateToken, showProfile);

/**
   * @openapi
   * /register:
   *  post:
   *     tags:
   *     - Register at Bar
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token that enables the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: body
   *       name: bar_id
   *       description: The unique identifier of a particular bar where the user wants to register him/herself 
   *       required: true
   *       schema:
   *         type: integer
   *       example:
   *         13
   *     description: Allows a user to register him/herself in a bar logged in the system
   *     responses:
   *       200:
   *         description: Registration is completed
   *       400:
   *         description: The bar whose ID was provided might not exist
   */

userRouter.post("/register", bodyParser.json(), authenticateToken, register);

/**
   * @openapi
   * /invitationResponse:
   *  post:
   *     tags:
   *     - Invitation Response
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: A temporary token that allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: body
   *       name: invitation_id   
   *       required: true
   *       description: A unique identifier that references a specific invitation instance
   *       schema:
   *         type: integer 
   *       example:
   *         32
   *     description: Allows the invitee user to respond to the partnership request forwarded by another user
   *     responses:
   *       200:
   *         description: Response is handled successfully
   *       400:
   *         description: Data inconsistency where either the user wasn't invited to cooperate on that job or the user isn't verified yet
   */

userRouter.post("/invitationResponse", bodyParser.json(), authenticateToken, invitationResponse);

/**
   * @openapi
   * /withdraw:
   *  post:
   *     tags:
   *     - Withdraw
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token which enables the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: body
   *       name: job_id
   *       description: The unique identifier which singles out the specific job from which the user wants to withdraw
   *       required: true
   *       schema:
   *         type: integer
   *       example:
   *          213
   *     description: Allows a lawyer to withdraw from a job case where he/she is an assistant lawyer
   *     responses:
   *       200:
   *         description: Withdrawl request is delivered successfully
   *       400:
   *         description: The user might not have partaken in this job as an assistant lawyer
   */

userRouter.post("/withdraw", bodyParser.json(), authenticateToken, withdraw);

/**
   * @openapi
   * /respondWithdraw:
   *  post:
   *     tags:
   *     - Respond to a withdraw request
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token that allows the user to access the endpoints of the server
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: body
   *       name: job_id   
   *       required: true
   *       description: The unique identifier of the JOB from which the user's partner wants to withdraw
   *       schema:
   *         type: integer
   *       example:
   *         56
   *     - in: body
   *       name: response 
   *       description: The response to the withdraw request with Either true for affirmative response or false for refusal
   *       required: true
   *       schema:
   *         type: boolean
   *       example:
   *         true
   *     description: Allows a user to respond either affirmatively or negatively to a partner's request
   *     responses:
   *       200:
   *         description: Response is recorded correctly
   *       400:
   *         description: The user might not be the principle lawyer of the job
   */

userRouter.post("/respondWithdraw", bodyParser.json(), authenticateToken, respondWithdraw);

export{
   userRouter
};

