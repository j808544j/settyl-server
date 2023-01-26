const express = require("express");
const superagent = require("superagent");
const app = express();
require("dotenv").config();
const port = process.env.port || 5000;

const cities = [
  "Aba",
  "Abakaliki",
  "Abeokuta",
  "Abraka",
  "Abraka",
  "Abuja",
  "Ado-Ekiti",
  "Adodo",
  "Aganga",
  "Agege",
  "Agidingbi",
  "Ajegunle",
  "Ajuwon",
  "Akure",
  "Alimosho",
  "Anambra",
  "Apapa",
  "Ayobo",
  "Benin City",
  "Birnin Kebbi",
  "Bonny",
  "Burutu",
  "chennai",
  "Calabar",
  "Chafe",
  "Damaturu",
  "Egbeda",
  "Ekpoma",
  "chandigarh",
  "mumbai",
];
const PAGE_SIZE = 10;
const NO_OF_PAGES = Math.ceil(cities.length / PAGE_SIZE);

app.get("/weather", async (req, res) => {
  const page_no = req.query.page > NO_OF_PAGES ? 1 : req.query.page || 1;
  const startIndex = (page_no - 1) * PAGE_SIZE;
  const endIndex = page_no * PAGE_SIZE;
  const selectedCities = cities.slice(startIndex, endIndex);
  const weatherData = await getWeatherData(selectedCities);
  res.send({ data: weatherData, noOfPages: NO_OF_PAGES });
});

async function getWeatherData(cities) {
  const res = await Promise.all(
    cities.map((city) =>
      superagent
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.APP_ID}`
        )
        .catch((e) => new Error(e))
    )
  );
  return res;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
