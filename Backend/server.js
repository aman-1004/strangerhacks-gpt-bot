const express = require("express");
const bodyParser= require("body-parser");
const {isValid} = require('./helper')
const {arrayToString} = require('./helper')
const {generateResponse} = require('./helper')

const app= express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
// console.log(process.env.o_key)

app.post("/validate", async function(req,res){
    const API = req.body.API;
    console.log(req.body)
    const result = await isValid(API)
    console.log(result);
    res.sendStatus(result? 200: 401)
});

app.post("/", async function(req,res){
    const obj = req.body.array;
    arrayToString(obj);
    res.send(await generateResponse(obj));
});


app.listen(3000, function(err){

    if(!err){
        console.log("Server started on port 3000");
    }
    else{
        console.log(err);
    }
});