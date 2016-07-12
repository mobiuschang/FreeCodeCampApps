geo_api = "http://ip-api.com/json";
weather_url = "http://api.openweathermap.org/data/2.5/weather?q=";
APPID = "&APPID=39daf205ed933345fe041b3dc30e846d&units=imperial";
var country;
var city;
var tempC = 0;
var tempF = 0;
var getCurrentWeather = function(weatherURL) {
  $.ajax({
    url: weatherURL,
    type: 'GET',
    success: function(json) {
      console.log(JSON.stringify(json));
      weather = json.weather[0].main;
      id = json.weather[0].id;
      humidity = json.main.humidity;
      tempF = json.main.temp;
      tempC = (tempF - 32 ) * (5/9);
      tempC = tempC.toFixed(2);
      
      switch(weather) {
        case "Thunderstorm":
          $("body").addClass("bgThunderstorms");
          break;
        case "Drizzle":
          $("body").addClass("bgDrizzle");
          break;
        case "Rain":
          $("body").addClass("bgRain");
          break;
        case "Snow":
          $("body").addClass("bgSnow");
          break;
        case "Atomosphere":
          $("body").addClass("bgAdditional");
          break;
        case "Clouds":
          $("body").addClass("bgClouds");
          break;
        case "Clear":
          $("body").addClass("bgClear");
          break;
        case "Extreme":
          $("body").addClass("bgExtreme");
          break;
        default:
          
      }
      
      $("#tempF").html(tempF);
      $("#tempC").html(tempC);
      $("#humidity").html(humidity + "%");
      $("#weather").html(weather);
      $("#location").html(city + ", " + country);
    },
    error: function(err) {
      console.log("Error calling Weather API " + err);
    }
  });

}
var getWeatherInfo = function(geoLocUrl, weatherURL) {
  $.ajax({
    url: geoLocUrl,
    type: 'GET',
    success: function(json) {
      city = json.city;
      country = json.country;
      weatherApiURL = weatherURL + city + APPID;
      getCurrentWeather(weatherApiURL);
    },
    error: function(err) {
      console.log("Error getting weather info " + err);
    }
  });
}

getWeatherInfo(geo_api, weather_url);

$("#tempUnitC").click(function(){
  $(this).removeClass("disabled").addClass("active");
  $("#tempUnitF").removeClass("active").addClass("disabled");
  $("#tempF").hide();
  $("#tempC").show();
  $("body").addClass("bgClouds");

})

$("#tempUnitF").click(function(){
  $(this).removeClass("disabled").addClass("active");
  $("#tempUnitC").removeClass("active").addClass("disabled");
  $("#tempC").hide();
  $("#tempF").show();
  

})

$("#tempUnitC #tempUnitF").hover(function(){
  $(this).css("cursor", "pointer");
})

$(document).ready(function(){
  $("#tempC").hide();
  $("body").addClass("bgHeat");
})

