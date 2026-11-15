# code-the-dream-pw-assignment

advanced pre-work assignment for code the dream

"This is the Cats' World!" is an interactive web application built with vanilla JavaSscript, HTML5 and CSS.
1the application uses [The CAT API](https://thecatapi.com) and explores cat breeds.

## Table of Contents

- [Features](#features)
- [API Endpoints Used](#api-endpoints-used)
- [Installation](#installation)
- [Usage of Technologies](#usage-of-technologies)

## Features

- Breeds By Country (`/v1/breeds`):
  - Search cat breeds by the country of origin ("Egypt", "United States", "Russia", "Thailand")
  - Click on a breed button to open a detailed profile card with its photo and describing breed group, lifespan, weight, temperament, description, and history
- Cats Breeds Quiz (`/v1/images/search`):
  - Gallery of inetractive cards displaying random cat photos with associated breed and country of origin details
  - Guess the breed and origin by the photo, then click the card to flip it over and see the correct answer
  - Load new sets of cats on demand with the "Wanna See More Cats" button

## API Endpoints Used

1. `https://api.thecatapi.com/v1/breeds` — to retrieve the full list of cat breeds and their detailed properties
2. `https://api.thecatapi.com/v1/images/search` — to retrieve random cat images with breed names and origin data for the cats' breeds' quiz

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/s-riskiyeva/code-the-dream-pw-assignment
   cd code-the-dream-pw-assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory of the project and add your API key with the `VITE_` prefix:

   ```env
   VITE_API_KEY=thecatapi_key
   ```

4. Start the development server:

   - **Option A — Development Server (with live reload):**

     ```bash
     npm run dev
     ```

   - **Option B — Production Build & Preview:**

     ```bash
     npm run build
     npm run preview
     ```

5. Open the local URL shown in your terminal in your browser

## Usage of Technologies

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite)
