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

  console.log(listOfAllBreeds);

  breedsByCountry.innerHTML = "";

  const listOfBreedsByCountry = listOfAllBreeds.filter((breed) =>
    breed.origin?.toLowerCase().includes(country.toLowerCase())
  );

  if (listOfBreedsByCountry.length === 0)
    breedsByCountry.innerHTML = `<p>No breeds found originating from ${country}.</p>`;

  const list = document.createElement("ul");

  listOfBreedsByCountry.forEach((breedData) => {
    const listElement = document.createElement("li");
    listElement.textContent = `${breedData.name}`;

    listElement.addEventListener("click", () => {
      const breedDetailsContainer = document.getElementById("breedDetailsCard");
      const imageUrl = breedData.image?.url;

      const imageContent = imageUrl
        ? `<img src="${imageUrl}" alt="${breedData.name}" />`
        : `<p class="no-image-placeholder">No photo available for ${breedData.name} breed`;

      breedDetailsContainer.innerHTML = `
      <div class="breed-details-card">
        <div class="breed-image">
          ${imageContent}
        </div>
        
        <div class="profile-data">
          <h2>${breedData.name}</h2>
          
          <div class="breed-data">
            <div class="data-items"><b>Group:</b> ${
              breedData.breed_group || "No data"
            }</div>
            <div class="data-items"><b>Lifespan:</b> ${
              breedData.life_span || "No data"
            } yrs</div>
            <div class="data-items"><b>Weight:</b> ${
              breedData.weight?.imperial || "No data"
            } lbs</div>
          </div>


          <div class="info-block">
            <h3>Temperament</h3>
            <p class="temperament">${
              breedData.temperament || "No data available"
            }</p>
          </div>

          <div class="info-block">
            <h3>Description</h3>
            <p>${breedData.description || "No data available"}</p>
          </div>

          <div class="info-block">
            <h3>History</h3>
            <p>${breedData.history || "No data available"}</p>
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
