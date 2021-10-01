var apiKey = 'a0da27e32e7361a1f2338d96dbeb5cf9';

var locationName = '';
var todayLocation = document.getElementById('location');
var todayDate = document.getElementById('today-date');
var todayTemp = document.getElementById('today-temp');
var todayWeather = document.getElementById('today-weather');
var todayWind = document.getElementById('today-wind');
var todayHumid = document.getElementById('today-humid');
var todayIcon = document.getElementById('today-icon');
var weatherCardHolder = document.getElementById('weather-card-holder');
var showLocation = document.getElementById('choose-location');
var locationIcon = document.getElementById('location-tab');
var weatherIcon = document.getElementById('weather-tab');
var locationTabPressed = false;
var weatherTabPressed = false;
var containerBg = document.getElementById('container');

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
        console.log(data);
        //current Day
        // var currentLocation = 
        console.log(data.name);
        var currentDate = moment().format('Do MMMM YYYY');
        var currentTemp = Math.ceil(data.current.temp);
        var currentWeather = data.current.weather[0].main;
        var currentHumid = data.current.humidity;
        var currentWind = data.current.wind_speed; 
        var currentIcon = data.current.weather[0].icon;

        todayDate.innerHTML = currentDate;
        todayTemp.innerHTML = `${currentTemp}\u{00B0}`;
        todayWeather.innerHTML = `Condition: ${currentWeather}`;
        todayHumid.innerHTML = `Humidity: ${currentHumid}`;
        todayWind.innerHTML = `Wind Speed: ${currentWind}m/s`;
        todayIcon.src = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;

        if (currentIcon == '01d' || currentIcon =='01n') {
            containerBg.style.backgroundImage = 'url(images/clear.jpg)';
        } else if (currentIcon == '02d'||currentIcon =='02n'||currentIcon =='03d'||currentIcon =='03n'||currentIcon =='04d'||currentIcon =='04n'){
            containerBg.style.backgroundImage = 'url(images/cloudy.jpg)';
        } else if (currentIcon == '09d'||currentIcon =='09n'||currentIcon =='10d'||currentIcon =='10n') {
            containerBg.style.backgroundImage = 'url(images/rain.jpg)';
        } else if (currentIcon == '11d'||currentIcon =='11n') {
            containerBg.style.backgroundImage = 'url(images/thunderstorm.jpg)';
        } else if (currentIcon == '13d'||currentIcon =='13n') {
            containerBg.style.backgroundImage = 'url(images/snow.jpg)';
        } else if (currentIcon == '50d'||currentIcon =='50n') {
            containerBg.style.backgroundImage = 'url(images/mist.jpg)';
        }

        //next 4 days
        var dateToday = moment().utc(data.daily.dt).format('dddd Do MMMM YYYY');
        // console.log(dateToday)
        

        for (i=0; i < 4; i++) {
            var weatherCard = document.createElement('div');
            weatherCard.classList.add('weather-card');
            var cardDay = document.createElement('h5');
            cardDay.classList.add('card-day');
            var cardDate = document.createElement('p');
            cardDate.classList.add('card-date')
            var cardIcon = document.createElement('img');
            cardIcon.classList.add('card-icon');
            var cardTemp = document.createElement('h1');
            cardTemp.classList.add('card-temp');
            var cardWeather = document.createElement('p');
            cardWeather.classList.add('card-weather');

            var nextDayDay = moment(dateToday, 'dddd Do MMMM YYYY').add((i+1), 'days').format('dddd');
            // console.log(nextDayDay);
            var nextDayDate = moment(dateToday, 'dddd Do MMMM YYYY').add((i+1), 'days').format('Do MMMM');
            // console.log(nextDayDate);
            var nextDayTemp = Math.ceil(data.daily[i+1].temp.max);
            var nextDayWeather = data.daily[i+1].weather[0].main;
            var icon = data.daily[i+1].weather[0].icon;
            cardDay.innerHTML = nextDayDay;
            cardDate.innerHTML = nextDayDate;
            cardTemp.innerHTML = `${nextDayTemp}\u{00B0}`;
            cardWeather.innerHTML = nextDayWeather;
            cardIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            weatherCard.append(cardDay);
            weatherCard.append(cardDate);
            weatherCard.append(cardIcon);
            weatherCard.append(cardTemp);
            weatherCard.append(cardWeather);

            weatherCardHolder.append(weatherCard);
        }
    });
}

function currentApi(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        console.log('current city: ', data);

        locationName = city;
        todayLocation.innerHTML = locationName;
        var lon = data.coord.lon;
        var lat = data.coord.lat;

        var location = {'coords': {'latitude': lat, 'longitude': lon}};

        console.log(lat, lon);
        // var removeCard = document.getElementsByClassName('weather-card');
        while(weatherCardHolder.hasChildNodes()){
            weatherCardHolder.removeChild(weatherCardHolder.firstChild);
        }
        showCity();
        callWeatherApi(location);
    });
}

function showCity () {
    if (locationTabPressed == false) {
        // locationIcon.classList.add('location-tab-onclick');
        locationIcon.style.color = '#fefcfb'; 
        weatherIcon.style.color = 'lightgrey'
        showLocation.style.display = 'block';
        locationTabPressed = true;
        weatherTabPressed = false
    } else if (locationTabPressed == true) {
        // locationIcon.classList.remove('location-tab-onclick');
        locationIcon.style.color = 'lightgrey';
        weatherIcon.style.color = '#fefcfb';
        showLocation.style.display = 'none';
        locationTabPressed = false;
        weatherTabPressed = true;
    }
}

function showWeather () {
    // if (weatherTabPressed == true) {
    //     locationIcon.style.color = '#fefcfb'; 
    //     weatherIcon.style.color = 'lightgrey'
    //     showLocation.style.display = 'block';
    //     weatherTabPressed = false;
    // } else if (weatherTabPressed == false) {
    //     locationIcon.style.color = 'lightgrey';
    //     weatherIcon.style.color = '#fefcfb';
    //     showLocation.style.display = 'none';
    //     weatherTabPressed = true;
    // }

    if (weatherTabPressed == false) {
        locationIcon.style.color = 'lightgrey';
        weatherIcon.style.color = '#fefcfb';
        showLocation.style.display = 'none';
        weatherTabPressed = true;
    }
}