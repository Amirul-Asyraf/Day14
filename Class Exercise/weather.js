console.log("file OK")

var apiKey = 'a0da27e32e7361a1f2338d96dbeb5cf9';
var timeZone = document.getElementById('timeZone');
var currentTemp = document.getElementById('current-temp');


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    alert('Your Browser not support')
}

function showPosition(position) {
    console.log('My Location is:', position)
    callWeatherApi(position);
}
    
function callWeatherApi(pos) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        // var timezone = data.timezone;
        // var humidity = data.current.humidity;
        // var temp = data.current.temp;
        // // var icon = `http://openweathermap.org/img/w/${data.iconCode}.png`;

        // // icon.innerHTML = data.current.weather.icon;
        // timeZone.innerHTML = `Timezone: ${timezone}`;
        // currentTemp.innerHTML = `Temperature: ${temp}\u{00B0}C`;
        // console.log(`Timezone: ${timezone}, Humidity: ${humidity}`);
    });
}

function currentApi(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        console.log('current city: ', data);

        //how to get icon ????
        var icon = document.getElementById('weather-icon');
        console.log(data.weather[0].icon);

        icon.src = 'url(http://openweathermap.org/img/w/' + data.weather[0].icon +'.png)';
        //get current datetime
        var dateTime = moment().utc(data.dt).format('MMMM Do YYYY, h:mm:ss a');
        console.log(dateTime);
    });

    
}

// currentApi();