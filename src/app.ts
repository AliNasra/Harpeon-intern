const express = require("express");
const app = express();
const { authenticateToken } = require("./middleware/authenticateToken.ts");
//const { adjustAddress } = require("./middleware/adjustAddress.ts")
const { appendBar } = require("./routers/appendBar.ts");
const { appendCity } = require("./routers/appendCity.ts");
const { barsInCity } = require("./routers/barsInCity.ts");
const { freeLawyers } = require("./routers/freeLawyers.ts");
const { getCurrentLocation } = require("./routers/getCurrentLocation.ts");
const { invite } = require("./routers/invite.ts");
const { listCities } = require("./routers/listCities.ts");
const { login } = require("./routers/login.ts");
const { rate } = require("./routers/rate.ts");
const { refresh } = require("./routers/refresh.ts");
const { register } = require("./routers/register.ts");
const { showProfile } = require("./routers/showProfile.ts");
const { signup } = require("./routers/signup.ts");
const { verify } = require("./routers/verify.ts");
const { sendEmail } = require("./routers/sendEmail.ts");
const { updateLocation } = require("./routers/updateLocation.ts");
const { invitationResponse } = require("./routers/invitationResponse.ts");
const { newJob } = require("./routers/newJob.ts");
const { withdraw } = require("./routers/withdraw.ts");
const { endJob } = require("./routers/endJob.ts");
const { respondWithdraw } = require("./routers/respondWithdraw.ts");
var bodyParser = require("body-parser");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/addCity/:city_name", bodyParser.json(), appendCity);

app.get("/addBar/:bar_name/:address/:city_id/:latitude/:longitude", bodyParser.json(), appendBar);

app.post("/signup", bodyParser.json(), signup);

app.post("/login", bodyParser.json(), login);

app.get("/getCurrentLocation", authenticateToken, getCurrentLocation);

app.get("/listCities", bodyParser.json(), authenticateToken, listCities);

app.get("/barsInCity/:city_name", bodyParser.json(), authenticateToken, barsInCity);

app.get("/availableLawyers", bodyParser.json(), authenticateToken, freeLawyers);

app.get("/invite/:username/:job_id", bodyParser.json(), authenticateToken, invite);

app.get("/rateLawyer/:username/:rating", bodyParser.json(), authenticateToken, rate);

app.get("/user/:username", bodyParser.json(), authenticateToken, showProfile);

app.get("/register/:bar_id", bodyParser.json(), authenticateToken, register);

app.get("/updateLocation/:address/:latitude/:longitude/:city_id", bodyParser.json(), authenticateToken, updateLocation);

app.post("/sendEmail", bodyParser.json(), authenticateToken, sendEmail);

app.get("/verify/:token", bodyParser.json(), authenticateToken, verify);

app.get("/newJob/:end_date", bodyParser.json(), authenticateToken, newJob);

app.get("/invitationResponse/:invitation_id", bodyParser.json(), authenticateToken, invitationResponse);

app.post("/refreshToken", bodyParser.json(), refresh);

app.get("/withdraw/:job_id", bodyParser.json(), authenticateToken, withdraw);

app.get("/endJob/:job_id", bodyParser.json(), authenticateToken, endJob);

app.get("/respondWithdraw/:job_id/:response", bodyParser.json(), authenticateToken, respondWithdraw);

const swaggerOptions = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Harpeon Summer 2023 Lawyer App Backend Project",
         description: "This project is submitted as part of the deliverables of the aforementioned internship program",
         contact: {
            name: "Check Harpeon's website for contact info"
         },
         servers: [{
            url: '/docs',
            description: 'Development server',
         }]
      },
      components: {
         securitySchemas: {
            bearerAuth: {
               type: 'http',
               scheme: 'bearer',
               bearerFormat: 'JWT'
            }
         }
      },
      security:
      {
         bearerAuth: []
      }
   },
   apis: ['./src/routers/*.ts']
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.listen(5000, () => {
   console.log("The app is running");
   app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
});
