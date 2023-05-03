const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    // res.send("Server in now running on brower");
    res.sendFile(__dirname + "/signup.html");
})

app.post("/signupServer", function(req, res){
    const fname = (req.body.fname);
    const lname = (req.body.lname);
    const email = (req.body.email);

    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields :{
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/Lists/4687deace8";

    const method = {
        method: "POST",
        auth: "vikas1:fe52aba47b14653bd15b3bb8164133f9-us21"
    }

    const request = https.request(url, method, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failer.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    // request.write(jsonData);
    request.end();


    // Api ket
    // fe52aba47b14653bd15b3bb8164133f9-us21
    // List id 
    // 4687deace8
})

app.post("/failuer", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server in run on port 3000");
})