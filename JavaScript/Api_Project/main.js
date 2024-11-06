//정보를 입력한다 (위도,경도)
//해당 정보값에 속한 정보들을 결과 스크린에 보여준다

//버튼을 누른다
//해당 명칠에 속한 위도 , 경도 정보값이 데이터를 불러온다
//데이터를 보여준다

const API_KEY = "a1b7e90b8bf72e0272bc1c79563adc4e";

let lat, lon, url;

const country = {
  seoul: {
    lat: 37.5642135,
    lon: 127.0016985,
  },
  jeju: {
    lat: 20,
    lon: 30,
  },
  A: {
    lat: 50,
    lon: 80,
  },
};

let latValue = document.getElementById("lat-input");
let lonValue = document.getElementById("lon-input");
let confirmButton = document.getElementById("confirm-button");
let tab = document.querySelectorAll(".country-button div");

const getData = async () => {
  url = new URL(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  let header = new Headers();
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  let country = JSON.stringify(data.sys.country);
  let city = data.name;
  let weather = JSON.stringify(data.weather[0].main);

  render(country, city, weather);
  console.log(data);
};

const buttonSearch = (e) => {
  let s = e.target.id;
  lat = country[s].lat;
  lon = country[s].lon;
  getData();
};

for (let i = 0; i < tab.length; i++) {
  tab[i].addEventListener("click", (e) => buttonSearch(e));
}

const inputSearch = async () => {
  lat = latValue.value;
  lon = lonValue.value;
  getData();
};
confirmButton.addEventListener("click", inputSearch);

const render = (country, city, weather) => {
  let result = "";
  result = `<div class="result-content">나라: ${country}</div>
    <div class="result-content">도시: ${city}</div>
    <div class="result-content">날씨: ${weather}</div>`;
  document.getElementById("result-screen").innerHTML = result;
};
