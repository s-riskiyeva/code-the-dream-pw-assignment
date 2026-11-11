import { apiKey } from "./config.js";

const url = "https://api.thecatapi.com/v1/breeds";

async function catsBreeds() {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
  });

  const listOfBreeds = await response.json();
}

catsBreeds();
