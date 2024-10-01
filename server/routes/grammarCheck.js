const express = require("express");
const grammarCheckRoute = express.Router();
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 

grammarCheckRoute.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required." });
  }
  try {
    const model = geminiClient.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const response = await model.generateContent(
      `You are a helpful assistant that checks and corrects grammar errors in the following ${text}. Only return corrected text without any additional comments or context.`
    );
    const correctedText = response.response.text().split("\n").map((choice) => choice);
    console.log(correctedText[0]);
    res.status(200).json(correctedText[0] || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = grammarCheckRoute;
