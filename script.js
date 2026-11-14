const apiKey = import.meta.env.VITE_API_KEY;

const urlAllBreeds = "https://api.thecatapi.com/v1/breeds";
const urlImagesSearch = "https://api.thecatapi.com/v1/images/search";

const breedsByCountryButton = document.getElementById("breedsByCountryButton");
const catImagesGalleryButton = document.getElementById(
  "catImagesGalleryButton"
);
const breedsSection = document.getElementById("breedsSection");
const imagesGallerySection = document.getElementById("imagesGallerySection");

const nameOfCountryInput = document.getElementById("nameOfCountryInput");
const nameOfCountryButton = document.getElementById("nameOfCountryButton");
const breedsByCountry = document.getElementById("listOfBreeds");

const catsImagesContainer = document.getElementById("catsImages");
const loadRandomCatImageButton = document.getElementById(
  "loadRandomCatImageButton"
);

breedsByCountryButton.addEventListener("click", () => {
  breedsSection.style.display = "flex";
  imagesGallerySection.style.display = "none";

  breedsByCountryButton.classList.add("active");
  catImagesGalleryButton.classList.remove("active");
});

catImagesGalleryButton.addEventListener("click", () => {
  breedsSection.style.display = "none";
  imagesGallerySection.style.display = "block";

  catImagesGalleryButton.classList.add("active");
  breedsByCountryButton.classList.remove("active");

  fetchRandomCats();
});

async function catsAllBreeds() {
  const response = await fetch(urlAllBreeds, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

async function countryOfOriginFilter(country) {
  const listOfAllBreeds = await catsAllBreeds();

  breedsByCountry.innerHTML = "";

  const listOfBreedsByCountry = listOfAllBreeds.filter((breed) =>
    breed.origin?.toLowerCase().includes(country.toLowerCase())
  );

  if (listOfBreedsByCountry.length === 0) {
    breedsByCountry.innerHTML = `<p>No breeds found originating from ${country}.</p>`;
    return;
  }

  const list = document.createElement("ul");

  listOfBreedsByCountry.forEach((breedData) => {
    const listElement = document.createElement("li");
    listElement.textContent = `${breedData.name}`;

    listElement.addEventListener("click", () => {
      const breedDetailsContainer = document.getElementById("breedDetailsCard");
      const imageUrl = breedData.image?.url;

      const imageContent = imageUrl
        ? `<img src="${imageUrl}" alt="${breedData.name}" />`
        : `<p class="no-image-placeholder">No photo available for ${breedData.name} breed</p>`;

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

async function fetchCatsImages(has_breeds = 1, include_breeds = 1, limit = 3) {
  const queryParams = `?has_breeds=${has_breeds}&include_breeds=${include_breeds}&limit=${limit}`;

  const response = await fetch(`${urlImagesSearch}${queryParams}`, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

async function fetchRandomCats() {
  catsImagesContainer.innerHTML = "<p>Loading cats images...</p>";
  const imagesData = await fetchCatsImages(1, 1, 3);

  catsImagesContainer.innerHTML = imagesData
    .map((img) => {
      const breedName = img.breeds[0].name;
      const breedOrigin = img.breeds[0].origin;

      console.log(breedName);
      console.log(breedOrigin);

      return `
        <div class="gallery-card">
          <div class="gallery-card-inner">
            <div class="gallery-card-front">
              <img src="${img.url}" alt="${breedName}" loading="lazy" />
            </div>
            <div class="gallery-card-back">
              <h3>Breed: ${breedName}</h3>
              <p><b>Origin:</b> ${breedOrigin}</p>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  });
}

loadRandomCatImageButton.addEventListener("click", fetchRandomCats);
