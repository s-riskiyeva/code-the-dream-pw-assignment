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

  listOfBreedsByCountry.forEach((breedData) => {
    const listElement = document.createElement("li");
    listElement.textContent = `${breedData.name}`;

    // breed_group
    // description
    // history
    // life_span
    // temperament
    // weight.imperial
    // image
    console.log(breedData.breed_group);
    console.log(breedData.description);
    console.log(breedData.history);
    console.log(breedData.life_span);
    console.log(breedData.temperament);
    console.log(breedData.weight.imperial);

    listElement.addEventListener("click", () => {
      const breedDetailsContainer = document.getElementById("breedDetailsCard");

      breedDetailsContainer.innerHTML = `
      <div class="breed-details-card">
        
        <div class="profile-data">
          <h2>${breedData.name}</h2>
          
          <div class="breed-data">
            <div class="data-items"><b>Group:</b> ${breedData.breed_group}</div>
            <div class="data-items"><b>Lifespan:</b> ${breedData.life_span} yrs</div>
            <div class="data-items"><b>Weight:</b> ${breedData.weight.imperial} lbs</div>
          </div>

          <div class="info-block">
            <h3>Description</h3>
            <p>${breedData.description}</p>
          </div>

          <div class="info-block">
            <h3>History</h3>
            <p>${breedData.history}</p>
          </div>

          <div class="info-block">
            <h3>Temperament</h3>
            <p class="temperament">${breedData.temperament}</p>
          </div>
        </div>
      </div>
    `;
    });

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
