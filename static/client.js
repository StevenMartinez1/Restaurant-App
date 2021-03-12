

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
  console.log("2")
  xhr.send(JSON.stringify({location: location, food_category: food_category}));

  xhr.onloadend = function(e){
    let r = xhr.responseText.toString();
    console.log(r);
    console.log("Response Recieved");
  }
}
