const authorName = document.getElementById("author");
const displayTime = document.getElementById("time");
const weatherDiv = document.getElementById("weather");
fetch(
  "https://api.unsplash.com/photos/random?client_id=kSz-T1a0U_D5i3lBSZM0Ho9n-UtaWb0PLczj0axsKNs&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    authorName.textContent = `By: ${data.user.name}`;
  });

fetch("https://api.coingecko.com/api/v3/coins/ethereum")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong!");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
    <img src = ${data.image.small} />
    <span>Ethereum</span>
    `;
    document.getElementById("crypto-bottom").innerHTML = `
    <p>🎯: ${data.market_data.current_price.inr} Rs.</p>
    <p>👆: ${data.market_data.high_24h.inr} Rs.</p>
    <p>👇: ${data.market_data.low_24h.inr} Rs.</p>
    `;
  })
  .catch((err) => console.log(err));

function getCurrentTime() {
  let date = new Date();
  let time = date.toLocaleTimeString("en-us", { timeStyle: "short" });
  displayTime.innerHTML = time;
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Something went wrong");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherDiv.innerHTML = `
      <img src = ${weatherIcon} />
      <p class = "weather-temp">${Math.round(data.main.temp)}°F</p>
      <p class = "weather-city">${data.name}</p>
      `;
    })
    .catch((err) => console.log(err));
});
