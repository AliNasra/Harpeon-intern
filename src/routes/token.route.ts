const express = require("express");
const { refresh } = require("../controllers/token.controller.ts")
const tokenRouter = express.Router();
var bodyParser = require("body-parser");

/**
   * @openapi
   * /refreshToken:
   *  post:
   *     tags:
   *     - Refresh Token
   *     parameters:
   *     - in: body
   *       name: username
   *       description: The username of the user whose Authorization key has expired
   *       schema:
   *         type: string
   *       example:
   *         alec_bradley
   *       required: true
   *     - in: body
   *       name: refreshtoken
   *       description: The more durable refresh token to be used for refreshing the Authorization Token
   *       schema:
   *         type: string
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       required: true
   *     description: The user's token is refreshed and renewed automatically if he/she overstays their session
   *     responses:
   *       200:
   *         description: A new authorization token is create successfully
   *       400:
   *         description: The refresh token is either incorrect or expired
   */


tokenRouter.post("/refreshToken", bodyParser.json(), refresh);


export {
   tokenRouter
};

