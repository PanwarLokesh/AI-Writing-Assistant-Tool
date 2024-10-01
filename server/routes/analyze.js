
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Assuming this is the Gemini SDK
const analyzeRoute = express.Router();

require("dotenv").config();

// Initialize the Gemini (Google Generative AI) Client
const geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Load the Gemini API key from .env);

analyzeRoute.post("/", async (req, res) => {
  const { sentence } = req.body;
  if (!sentence) {
    return res.status(400).json({ error: "Sentence is required." });
  }

  try {
    // Using the Gemini SDK method to process the sentence
    const model = geminiClient.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const response = await model.generateContent(
      `You are a helpful assistant that rephrases sentences. Only return the rephrased sentences without any additional comments or context.Rephrase the following sentence: ${sentence}.Generate only there 3 different phrases`
    );

    // Process the response based on the SDK's return format
    const rephrasedSentences = response.response.text().split("\n").filter(
      (choice) => choice.trim() !== ""
    );
    
    console.log(rephrasedSentences);
    res.status(200).json(rephrasedSentences || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = analyzeRoute;
