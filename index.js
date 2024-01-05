const express = require('express')
const path = require('path')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')
// Installing this using the following:
// npm install --save express path handlebars express-handlebars @handlebars/allow-prototype-access body-parser

// Lets create an app
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/users',require('./routes/api/users'))





app.listen(3000, () =>{
    console.log("Start Server 3000")
})

