window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-des");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let iconText = document.querySelector(".icon-text");
  let windSpeed = document.querySelector(".wind-speed");

  let temperatureSection = document.querySelector(".degree-section");
  let temperatureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //const proxy = "https://cors-anywhere.herokuapp.com/";
      //const api = `https://api.openweathermap.org/data/2.5/weather?&callback&units=imperial&lat=${lat}&lon=${long}&appid=daa115717a8cea43598f780072eea351`;

      const api = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${long}&exclude=hourly,daily&appid=daa115717a8cea43598f780072eea351`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp, wind_speed } = data.current;
          const { description } = data.current.weather[0];
          const { icon } = data.current.weather[0];
          // const { wind_speed } = data.current;

          let img = data.current.weather[0].icon;
          let iconurl = "http://openweathermap.org/img/w/" + img + ".png";
          locationTimezone.textContent = data.timezone;
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          iconText.textContent = icon;
          windSpeed.textContent = wind_speed;
          $("#wicon").attr("src", iconurl);

          //change F to C

          let celcius = (temp - 32) * (5 / 9);

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = Math.floor(celcius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }
});
