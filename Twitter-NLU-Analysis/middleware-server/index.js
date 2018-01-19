let port = process.env.PORT || 5000;

const express = require('express');
const app = express();

const axios = require('axios');

app.get('/', function(req, res){
    res.send("Main route accessed");
});

app.get("/api/search", (req,res) => {
    console.log(req.query.tweetQ);
    axios({
        url: "http://localhost:6000/analyze",
        method: 'get',
        auth: {
            username: "moazhamza",
            password: "password"
        },
        params: {
            'tweetQ': req.query.tweetQ
        }
    })
        .then(serviceResponse => {
            console.log(serviceResponse.data);
            res.json(serviceResponse.data);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/retrieve", (req,res) =>{
    console.log("Attempting to retrieve unique id", req.query.uniqueID);
    axios({
        url:"http://localhost:6000/results",
        method: "get",
        auth:{
            username: "moazhamza",
            password: "password"
        },
        params: {
            uniqueID: req.query.uniqueID
        }
    })
        .then(
            response => {
                console.log(response.data);
                res.json(response.data);
            }
    )
        .catch(
            err => res.json(err)
        )
});

app.listen(port, function(){
    console.log("Listening on port " + port);
});
