require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const yelp = require('yelp-fusion');

const https = require('https');

const api_key = process.env.YELP_API_KEY;

const client = yelp.client(api_key);

async function get_yelp_request(search_request){
  var x = await client.search(search_request)
  .then(function(response){
    console.log(response.jsonBody);
    return response.jsonBody;
  })
  .catch((error) => {
    console.log(error);
  });
  return x;
}


app.use(express.static(path.join(__dirname, 'public')));
app.use("/static", express.static('./static/'));

app.get('/', function(req,res){
  res.sendFile(__dirname, + '/public/index.html');

})

app.post('/submit', function(req,res){
  const search_request = {
    term: req.body.food_category,
    location: req.body.location,
    limit: 10
  };

  restaurants = get_yelp_request(search_request);

  restaurants.then(function(result){
    //console.log(result)
    //console.log(result["businesses"][0]["image_url"]);
    res.send(result["businesses"])
  })
});

app.listen(3000);
