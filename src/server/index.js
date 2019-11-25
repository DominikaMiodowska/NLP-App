var path = require('path');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js');

var AYLIENTextAPI = require('aylien_textapi');
const dotenv = require('dotenv');

dotenv.config();
// console.log(process.env);

const baseURL = "https://api.aylien.com/api/v1/sentiment";

    
const app = express()
app.use(express.static('dist'))

var textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

textapi.baseURL = baseURL;

textapi.sentiment({'text': 'John is a very good football player'}, function(err, result, rateLimits) {
    console.log(rateLimits);
    console.log(result);
  });

;
console.log(textapi);

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'))
})


app.get("/api", (req, res) => {
    const { text } = req.query;
    console.log("Request to '/api' endpoint", text);
    textapi.sentiment({ text }, (error, result, remaining) => {
      console.log("Aylien Callback", result, remaining);
      res.send(result);
    });
  });

app.get('/article', (req, res) => {
    const { text } = req.query;
    console.log("Request to '/article' endpoint", text);
    textapi.sentiment({ url: text }, (error, result, remaining) => {
        console.log("Aylien Callback", result, remaining);
        res.send(result);
    });
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/get_sentiment_analysis', function (req, res) {
    textapi.sentiment({
        'text': 'John is a very good football player!'
    }, function(error, response) {
        if (error === null) {
            res.json(response);
            console.log(response);
            
        }
    });
})
