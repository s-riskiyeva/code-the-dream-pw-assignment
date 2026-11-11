const { apiKey } = require("./config.js");

const url = "https://api.thecatapi.com/v1/images/search";

console.log(apiKey);

async function catsFacts() {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
  });

  const factsData = await response.json();
  console.log(factsData);
}

catsFacts();
