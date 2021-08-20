

document.getElementById('sub').addEventListener("click", function(event) {
  event.preventDefault();
  console.log("Sending Filters to server.");
  var location = document.getElementById('location').value;
  var food_category = document.getElementById('food_category').value;
  send_filters(location, food_category)

});

function send_filters(location, food_category){
  var xhr = new XMLHttpRequest();
  var theUrl = "/submit";
  xhr.open("POST",theUrl);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({location: location, food_category: food_category}));

  xhr.onloadend = function(e){
    let r = xhr.responseText.toString();
    restaurant_json = JSON.parse(r)
    //console.log(restaurant_json[0]["image_url"]);
    console.log("Response Recieved");
    document.getElementById("restaurant_filters_box").style.display = "none";
    document.getElementById("restaurant_information").style.display = "flex";
    document.getElementById("restaurant_image").src=restaurant_json[0]["image_url"];
    //load_restaurant_details(restaurant_json);
  }
}

/*function load_restaurant_details(restaurant_json){



}*/