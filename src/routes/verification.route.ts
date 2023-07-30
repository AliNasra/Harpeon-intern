const { authenticateToken } = require("../middleware/authenticateToken.ts");
const { verify, sendEmail } = require("../controllers/verification.controller.ts")
const express = require("express");
var bodyParser = require("body-parser");
const verificationRouter = express.Router();


/**
   * @openapi
   * /sendEmail:
   *  post:
   *     tags:
   *     - Send Verification Email
   *     paramters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token that allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     description: The system adminstrator sends a verification mail to the user's registered email address
   *     responses:
   *       200:
   *         description: The email is delivered successfully
   *       400:
   *         description: The mail might have been sent to an invalid email address
   */

verificationRouter.post("/sendEmail", bodyParser.json(), authenticateToken, sendEmail);


/**
   * @openapi
   * /verify/{token}:
   *  get:
   *     tags:
   *     - Verify User
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       description: The temporary token which allows the user to access the endpoints of the API
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     - in: path
   *       name: token   
   *       required: true
   *       description: A temporary token used by the API to verify the authenticity of the user-supplied data
   *       schema:
   *         type: string 
   *     description: The user is verified by the token appended to the url
   *     responses:
   *       200:
   *         description: The user is verified as legit
   *       400:
   *         description: The token has expired
   */


verificationRouter.get("/verify/:token", bodyParser.json(), authenticateToken, verify);

export{
   verificationRouter
};
