"use strict";

const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const cors = require("cors");

const corsOptions = {
    origin: `http://localhost:${PORT}`
}
app.use(cors(corsOptions));

app.use(express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function getRandomImage() {
    const endpoint = `https://api.unsplash.com/photos/random/?client_id=${process.env.CLIENT_ID}`;
    try {
        const response = await fetch(endpoint);
        const returnedData = await response.json();
        const receivedPhotoUrl = returnedData.urls.regular;

        return receivedPhotoUrl;
    } catch (error) {
        console.error(error);
    }
}

app.use("/api/v1/getRandomImage", async (request, response) => {
    response.status(200).json({
        status: 200,
        data: await getRandomImage(),
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server.`);
});

