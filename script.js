import { API_KEY } from "./config.js";

const url = "https://api.thecatapi.com/v1/images/search";

async function catsFacts() {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
  });

  const factsData = await response.json();
  console.log(factsData);
}

catsFacts();
