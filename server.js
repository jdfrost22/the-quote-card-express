"use strict";

const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/image", async (req, res) => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.CLIENT_ID}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from Unsplash:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server.`);
});

