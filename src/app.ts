const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
app.use(bodyParser.urlencoded({ extended: false }));
const { swaggerDocs } = require('./utils/swagger.ts');
const {barRouter} = require("./routes/bar.route.ts");
const {cityRouter} = require("./routes/city.route.ts");
const {jobRouter} = require("./routes/job.route.ts");
const {locationRouter} = require("./routes/location.route.ts");
const {tokenRouter} = require("./routes/token.route.ts");
const {userRouter} = require("./routes/user.route.ts");
const {verificationRouter} = require("./routes/verification.route.ts");

app.use('/', barRouter);
app.use('/', cityRouter);
app.use('/', jobRouter);
app.use('/', locationRouter);
app.use('/', tokenRouter);
app.use('/', userRouter);
app.use('/', verificationRouter);

app.listen(5000, () => {
   console.log("The app is running");
   app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
});

