const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const dbDebugger =require("debug")('app:db')
const debug =require("debug")('app:startup')

const Joi =require("joi")
const logger =require("./middleware/logger");
const config =require("config");
const courses =require("./routes/courses");
const home =require("./routes/home");



const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(helmet());
// app.use(logger)
//use routes
app.use('/api/courses',courses);
app.use('./',home);



//Templating Enginies

app.set("view engine","pug")
app.set("views","./views")


//Environment
console.log(`Node_Env ${process.env.NODE_ENV}`)
console.log(`app ${app.get('env')}`)

//Configuration
console.log("Application Name: " + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
console.log("Mail Password: " + config.get('mail.password'));


if (app.get('env')==='development') {
    app.use(morgan("tiny"))
    debug("Morgan Enabled...")
}

dbDebugger("Connected Db ...")



const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`listening on $${port}`))