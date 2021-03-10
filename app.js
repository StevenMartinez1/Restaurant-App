require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const yelp = require('yelp-fusion');

const api_key = process.env.YELP_API_KEY;

const search_request = {
  term: 'Mexican',
  location: 'Davis',
  limit: 10
};

const client = yelp.client(api_key);

client.search(search_request)
.then(function(response){
    console.log(response.jsonBody["businesses"].length);
  })
  .catch((error) => {
    console.log(error);
});



app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
  res.sendFile(__dirname, + '/public/index.html');

})

console.log("Hello World");

app.listen(3000);
