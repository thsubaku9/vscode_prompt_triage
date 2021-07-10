const express = require('express')
const denv = require('dotenv').config()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken') 
const {userModel} = require('./connection')

var app = express()

app.use(bodyParser.json())

app.get("/",(req,res) => {    
    res.statusCode = 200
    res.send("Server is up")
})

app.get("/signup",(req,res) => {
    let payload = { 
        name: req.query?.name,
        uid: req.query?.uid
    }

    let res_jwt = jwt.sign(JSON.stringify(payload),process.env.SECRET)

    res.send({token: res_jwt})
})

app.get("/verify",(req,res) => {
    try {
        let _verify = jwt.verify(req.query?.token,process.env.SECRET)
        res.send(_verify)
    } catch (err) {
        res.send(err)
    }    
})

app.route("/db").get((req,res) =>{
    userModel.findOne({name:req.query?.name},(err,doc) => {
        if (err != null) {
            res.send(err)
        }
        console.log("/db access GET")
        console.log(doc)
        res.send("Done")
    })    
}).put((req,res) =>{    
}).post((req,res) =>{     
    let newUser = new userModel({name:req.query?.name})    
    newUser.save((err, data) => {
        if(err) {
            console.log(error);
        }
        else {
            res.send("Data inserted");
        }})    
}).delete((req,res) =>{
    
})

app.listen(process.env.PORT,() => {
    console.log(`Listening on ${process.env.PORT}`)
})