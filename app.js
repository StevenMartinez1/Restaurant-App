require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const yelp = require('yelp-fusion');

const api_key = process.env.YELP_API_KEY;

const client = yelp.client(api_key);


function get_yelp_request(search_request){
  client.search(search_request)
  .then(function(response){
      console.log(response.jsonBody["businesses"].length);
      return response.jsonBody;
    })
    .catch((error) => {
      console.log(error);
  });
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

  //restaurants = get_yelp_request(search_request);\
  restaurants = get_yelp_request(search_request);

  //console.log(restaurants)
  console.log("Yes/n/n/n/n");

  //res.send(restaurants);
  res.json(restaurants)
});

app.listen(3000);
