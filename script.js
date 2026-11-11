import { apiKey } from "./config.js";

const url = "https://api.thecatapi.com/v1/breeds";

const nameOfCountryInput = document.getElementById("nameOfCountryInput");
const nameOfCountryButton = document.getElementById("nameOfCountryButton");

const breedsByCountry = document.getElementById("listOfBreeds");

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

async function countryOfOriginFilter(country) {
  const listOfAllBreeds = await catsAllBreeds();

  breedsByCountry.innerHTML = "";

  const listOfBreedsByCountry = listOfAllBreeds.filter(
    (breeds) => breeds.origin === country
  );

  if (listOfBreedsByCountry.length === 0)
    breedsByCountry.innerHTML = `<p>No breeds found originating from ${country}.</p>`;

  const list = document.createElement("ul");

  listOfBreedsByCountry.forEach((breedName) => {
    const listElement = document.createElement("li");
    listElement.textContent = `${breedName.name}`;
    list.appendChild(listElement);
  });

  breedsByCountry.appendChild(list);
}

nameOfCountryButton.addEventListener("click", () => {
  const userInputValue = nameOfCountryInput.value.trim().replace(/\s+/g, " ");

  if (!userInputValue) {
    breedsByCountry.innerHTML = `<p>Please input a country name.</p>`;
    return;
  }

  const countryName = userInputValue
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  countryOfOriginFilter(countryName);
  nameOfCountryInput.value = "";
});
