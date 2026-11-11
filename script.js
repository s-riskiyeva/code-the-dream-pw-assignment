import { apiKey } from "./config.js";

const url = "https://api.thecatapi.com/v1/breeds";

async function catsAllBreeds() {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
  });

  const listOfAllBreeds = await response.json();

  return listOfAllBreeds;
}

async function countryOfOriginFilter(country = "Egypt") {
  const listOfAllBreeds = await catsAllBreeds();

  const breedsByCountry = listOfAllBreeds.filter(
    (breeds) => breeds.origin === country
  );

  console.log(breedsByCountry);
}

countryOfOriginFilter();
