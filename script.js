var weather = {
  tempC: '#',
  tempF: '#',
  city: '#',
  descrip: '#',
  unit: 'C',
  id: '0',
  icon: '#'
};
var bgImage = {
  thunder: "url(http://www.wallpaperup.com/uploads/wallpapers/2015/06/12/720362/big_thumb_c3a945073ee87a7a3704c50c4c0e69e9.jpg)",
  sunny: "url(http://www.youwall.com/wallpapers/201408/sunny-forest-wallpaper.jpg)",
  rain: "url(http://all4desktop.com/data_images/original/4249066-rain.jpg)",
  snow: "url(http://www.wallpaperup.com/uploads/wallpapers/2013/01/07/28265/big_thumb_a37ef69062c8eccadcd03fa1b7d46bf7.jpg)",
  misty: "url(https://bluemountainthyme.files.wordpress.com/2013/08/img_8131.jpg)",
  clear: "url(http://cdn.paper4pc.com/images/clear-sky-wallpaper-1.jpg)",
  cloud: "url(http://www.mynews13.com/content/dam/news/images/2013/06/weather-seminole-county-clouds-062813.JPG)",
  extreme: "url(https://i.ytimg.com/vi/n2vNRvBrKpA/maxresdefault.jpg)"
};
$(document).ready(function() {
  getLocation();
  $("#weather").hover(function() {
    $(this).css("color", "black");
  }, function() {
    $(this).css("color", "white");

  });
  setTime();
});

function getLocation() {

  $.getJSON('http://ip-api.com/json?callback=?', function(data) {
    weather.city = data.city;
    getWeather(data.city, data.countryCode);
  });

}

function getWeather(city, countryCode) {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' +
      city + "," + countryCode + '&units=metric&APPID=605ef2a44f1459ac284b86b5905a486e',
    success: function(data) {

      weather.tempC = Math.round(data.main.temp);
      weather.descrip = data.weather[0].description;
 setSun(data.sys.sunrise, data.sys.sunset);     setBackground(data.weather[0].id);
      $("#city").html(weather.city);
     $("#humid").html("Humidity: "+data.main.humidity +"%");
$("#wind").html("Wind: " + data.wind.speed +" mph"); 
      $("#weather").html(weather.tempC + " &#176;" + weather.unit);
      weather.icon = data.weather[0].icon;
      $("#icon").html(weather.descrip + "<br><img src='https://openweathermap.org/img/w/"  + weather.icon + ".png'>");
    }
     
  });
}
function setSun(sunrise,sunset){
  var date = new Date(sunrise * 1000);
  $("#sunrise").html("Sunrise: "+date.getHours()+
":" + date.getMinutes() + ":" + date.getSeconds() + "am");
  date = new Date(sunset * 1000);
  $("#sunset").html("Sunset: "+ (date.getHours() - 12) +
":" + date.getMinutes() + ":" + date.getSeconds() + "pm");
}

function changeUnit() {
  weather.tempF = Math.round(weather.tempC * (9 / 5) + 32);
  if (weather.unit === 'C') {
    weather.unit = 'F';
    $("#weather").html(weather.tempF + " &#176;" + weather.unit);
  } else {
    weather.unit = 'C';
    $("#weather").html(weather.tempC + " &#176;" + weather.unit);
  }
}
function setTime() {
  var arrDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var time = new Date();
  var day = arrDay[time.getDay()];
  var hours = time.getHours();
  var min = time.getMinutes();
  var ampm = hours>12?" pm":" am";
  if(hours > 12) {
    hours = hours - 12;
  }
  if(hours == 0)
    hours += 12;
  if(min < 10)
    min = "0" + min;
  $("#date").html(time.getMonth() + 1 +"/" + time.getDate() + "/" + time.getFullYear());
  $("#day").html(day);
  $("#time").html(hours + ":" + min + ampm);
}
function setBackground(id) {
  //thunder
  if (id < 232)
    $('body').css("background-image", bgImage.thunder);
  //rain
  if (id < 531 && id > 232)
    $('body').css("background-image", bgImage.rain);
  //snow
  if (id < 622 && id > 531)
    $('body').css('background-image', bgImage.snow);
  //misty
  if (id < 781 && id > 622)
    $('body').css('background-image',
      bgImage.misty);
  //clear
  if (id === 800)
    $('body').css('background-image', bgImage.clear);
  //cloud
  if (id <= 804 && id > 800)
  
    $('body').css('background-image', bgImage.cloud);
  //extreme
  if (id >= 900)
    $('body').css('background-image', bgImage.extreme);

}