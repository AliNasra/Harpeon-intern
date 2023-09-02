const express = require("express");
const jobRouter = express.Router();
const { newJob, endJob } = require("../controllers/job.controller.ts")
const { authenticateToken } = require("../middleware/authenticateToken.ts");
const { verifyJob } = require("../middleware/verify.job.ts");
var bodyParser = require("body-parser");


/**
   * @openapi
   * /newJob:
   *  post:
   *     tags:
   *     - New Job
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
   *       name: end_date 
   *       description: The tentative deadline of the announced job  
   *       required: true
   *       example:
   *         05/12/2024
   *       schema:
   *         type: date
   *     description: Allows a user to create a new job
   *     responses:
   *       200:
   *         description: A job instance is instantiated successfully 
   *       400:
   *         description: The user is either unverified or unavailable
   */

jobRouter.post("/newJob", bodyParser.json(), authenticateToken, verifyJob, newJob);

/**
   * @openapi
   * /endJob:
   *  post:
   *     tags:
   *     - End Job
   *     parameters:
   *     - in: header
   *       name: AuthorizationToken
   *       example:
   *         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
   *       schema:
   *         type: string
   *       required: true
   *       description: A temporary token that allows the user to access the services of the API
   *     - in: body
   *       name: job_id
   *       example:
   *         54   
   *       required: true
   *       description: The unique identifier of the target job
   *       schema:
   *         type: integer 
   *     description: Allows the user to declare a job instance done and completed
   *     responses:
   *       200:
   *         description: Job state is updated
   *       400:
   *         description: An error was encountered while logging the new job into the database
   */


jobRouter.post("/endJob", bodyParser.json(), authenticateToken, endJob);


export {
   jobRouter
};

