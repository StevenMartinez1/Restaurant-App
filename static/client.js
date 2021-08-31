var slideIndex = 1;



document.getElementById('sub').addEventListener("click", function(event) {
  event.preventDefault();
  if(document.getElementById('location').value === "" ||  document.getElementById('location').value == null){
    document.getElementById('location').style.backgroundColor = "red";
    return;
  }
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
    load_restaurant_details(restaurant_json);
  }
}

function load_restaurant_details(restaurant_json){
  document.getElementById("restaurant_information").style.display = "flex";
  var info = document.getElementById("restaurant_information")

  for(var i = 0; i < 10; i++){
    var img_src = restaurant_json[i]["image_url"];
    info.innerHTML += '<img class="restaurant_image" src="' + img_src + '">';
    //document.getElementById("restaurant_image").src=restaurant_json[0]["image_url"];
  }

  showDivs(slideIndex);

}

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("restaurant_image");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "flex";
}