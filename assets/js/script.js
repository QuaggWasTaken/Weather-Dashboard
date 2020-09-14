
const currentWeatherEl = $("#weather-now");
const prevCitiesEl = $("#prev-cities");
const cityInput = $("#city-input");
const weatherAPIKey = "03214d7620629621b3ec395ab6126e24";
var prevCitiesList = JSON.parse(localStorage.getItem("prevCities")) || [];
$("#right").hide();

cityList();

$("#search-button").click(function () {
    displayWeather(cityInput[0].value);
    prevCitiesList.unshift(cityInput[0].value);
    if (prevCitiesList.length >= 11) {
        prevCitiesList = prevCitiesList.slice(0, 10)
    }
    cityList();
});

function cityList() {
    prevCitiesEl[0].innerHTML = "";
    for (let i = 0; i < prevCitiesList.length; i++) {
        const city = prevCitiesList[i];
        var newLi = $(`<li>${city}</li>`);
        if (prevCitiesList.length == 1) {
            newLi.addClass("border rounded");
        } else {
            if (i == 0) {
                newLi.addClass("border rounded-top")
            } else if (i == prevCitiesList.length - 1) {
                newLi.addClass("border rounded-bottom")
            } else {
                newLi.addClass("border rounded-0")
            }
        }
        newLi.attr("onClick", "displayWeather(this.textContent)")
        prevCitiesEl.append(newLi);
    }
    localStorage.setItem("prevCities", JSON.stringify(prevCitiesList))
}

function displayWeather(city) {
    $.ajax(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=imperial`)
        .then(function (result) {
            console.log(result)
            console.log(currentWeatherEl[0])
            $("#city-name").text(result.name);
            $("#date").text(moment().format("MM/DD/YYYY"));
            $("#emoji").attr("src", `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`)
            $("#temp-span").text(result.main.temp)
            $("#humid-span").text(result.main.humidity)
            $("#wind-span").text(result.wind.speed)
            $("#right").show()
            return $.ajax(`https://api.openweathermap.org/data/2.5/uvi?&appid=${weatherAPIKey}&lat=${result.coord.lat}&lon=${result.coord.lon}`)
        })
        .then(function (result) {
            console.log(result);
            uvi = result.value;
            $("#uv-span").text(uvi);
            $("#uv-span").removeClass("green yellow red");
            if (uvi <= 5) {
                $("#uv-span").addClass("green");
            } else if (uvi >= 8) {
                $("#uv-span").addClass("red");
            } else {
                $("#uv-span").addClass("yellow");
            }
            return $.ajax(`https://api.openweathermap.org/data/2.5/onecall?lat=${result.lat}&lon=${result.lon}&exclude=current,minutely,hourly&appid=${weatherAPIKey}&units=imperial`)
        })
        .then(function (result) {
            console.log(result);
            var daily = result.daily.slice(0, 6)
            
            $("#future-cards").html("")
            for (let i = 0; i < daily.length; i++) {
                const day = daily[i];
                console.log(day);
                var newCard = $(`
                <div class="col">
                    <div class="card" style="width: 1fr;">
                        <div class="card-body">
                            <h5 class="card-title">${moment(day.dt, "X").format("MM/DD/YYYY")}</h5>
                            <h6 class="card-subtitle mb-2 text-muted"><img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt=""></h6>
                            <p class="card-text">Temp: <span class="card-temp"></span>${day.temp.day} °F</p>
                            <p class="card-text">Humidity: <span class="card-humid">${day.humidity}</span>%</p>
                        </div>
                    </div>
                </div>`)
                console.log(newCard);
                $("#future-cards").append(newCard);
            }
        })

}