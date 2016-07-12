geo_api = "http://ip-api.com/json";
weather_url = "https://api.forecast.io/forecast/1e518e55aa95c11adb0367ebba58e2dc/";
// APPID = "&APPID=39daf205ed933345fe041b3dc30e846d&units=imperial";
var country;
var city;
var latitude;
var longitude;
var tempC = 0;
var tempF = 0;
var getCurrentWeather = function(weatherURL) {
  $.ajax({
    url: weatherURL,
    type: 'GET',
    dataType: "jsonp",
    success: function(json) {
      console.log(JSON.stringify(json));
      weather = json.currently.icon;
      
      humidity = json.currently.humidity;
      tempF = json.currently.temperature;
      tempC = (tempF - 32 ) * (5/9);
      tempC = tempC.toFixed(2);
      
      switch(weather) {
        case "clear-day":
          $("body").addClass("bgClearDay");
          break;
        case "rain":
          $("body").addClass("bgRain");
          break;
        case "snow":
          $("body").addClass("bgSnow");
          break;
        case "sleet":
          $("body").addClass("bgSleet");
          break;
        case "wind":
          $("body").addClass("bgWind");
          break;
        case "fog":
          $("body").addClass("bgFog");
          break;
        case "cloudy":
          $("body").addClass("bgCloudy");
          break;
        case "partly-cloudy-day":
          $("body").addClass("bgPartlyCloudyDay");
          break;
        case "partly-cloudy-night":
          $("body").addClass("bgPartlyCloudyNight");
          break;
        default:
          $("body").addClass("bgClearDay");
          break;
          
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
      latitude = json.lat;
      longitude = json.lon;
      weatherApiURL = weatherURL + latitude + "," + longitude;
      // weatherApiURL = weatherURL + city + APPID;
      getCurrentWeather(weatherApiURL);
    },
    error: function(err) {
      console.log("Error getting weather info " + err);
    }
  });
}

getWeatherInfo(geo_api, weather_url);


$(document).ready(function(){
  $("#tempC").hide();
  
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
})

