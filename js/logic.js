$(document).ready(function(){

function typeWriter(id, text){
  var previous=$(id).text();
  $(id).text(previous+text);
}

function typer(id){
  var text=$(id).text();
  $(id).html("");
for (var i = 0; i < text.length; i++) {
  var time= i*100;
  setTimeout(typeWriter, time, id, text[i]);
  }
}

var fadeout= function (element){
  $(element).velocity("fadeOut", { delay: 0, duration: 1500 });
}

var startpage = function(){
  $("footer").css("display", "inherit");
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  $('.carousel').carousel();
   setInterval(function() {
     $('.carousel').carousel('next');
   }, 4000);
  // $("#P-btn").on("click", $('.carousel').carousel("two"));
  // $("#A-btn").on("click", $('.carousel').carousel("three"));
  // $("#C-btn").on("click", $('.carousel').carousel("four"));
}
var weatherAPI = function(){
  var APIKey = "2b7269eb9a0688007c36082e9ac678c8";
  var cityID =4138106;
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?id="+cityID+"&units=imperial&APPID="+APIKey;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(response);
    console.log(response.weather[0].icon[2]);
    var city= $("#weatherInfo").append("<p>"+response.name+"</p>");
    var weather= $("#weatherInfo").append("<p>Weather is Currently: "+response.weather[0].main+"</p>");
    var wind= $("#weatherInfo").append("<p>Wind: "+response.wind.speed+"mph</p>");
    var humidity= $("#weatherInfo").append("<p>humidity: "+response.main.humidity+"%</p>");
    var temp= $("#weatherInfo").append("<p>temp: "+Math.floor(response.main.temp)+"°F</p>");
    var icon= $("#weatherInfo").append("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    if(response.weather[0].icon[2]=="d"){
      $("#weatherCarousel").css("background-image", "url('./images/DCday.jpg')");
    }else if(response.weather[0].icon[2]=="n"){
      $("#weatherCarousel").css("background-image", "url('./images/DCnight.jpeg')");
      if ($(window).width() > 760) {
      $("#weatherCarousel .inside").css("margin-left", "60%");
      }
    }else{
      console.log("error in getAPI if/else");
    }
  });

}

weatherAPI();
setTimeout(typer, 2000, "#name");
typer("#jobTitle");
setTimeout(fadeout, 3500, "#title");
setTimeout(startpage, 5000);
if ($(window).width() < 760) {
   $("#floatingNavBtn").empty();
   $("#floatingNavBtn").append("<li><a id='P-btn' class='btn-floating red'><i class='material-icons'>palette</i></a></li><li><a id='A-btn' class='btn-floating yellow darken-1'><i class='material-icons'>account_circle</i></a></li><li><a id='C-btn' class='btn-floating green'><i class='material-icons'>contact_mail</i></a></li>")
   $("#floatingNav").removeClass("horizontal");
   $("#more_vert").text("more_vert");
   var holdHTML = $("#footerMain").innerHtml;
}else{


  // <div class="carousel-fixed-item center">
  //   <a class="btn waves-effect white grey-text darken-text-2">button</a>
  // </div>
}
});
