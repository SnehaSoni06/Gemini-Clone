
// AIzaSyDscT56x1lyLTHCY2JZgcSBsIqWWD34Xa8
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
    GoogleGenerativeAI,
    HarmCategory,               //used for configuring safety settings, which help in preventing harmful content generation.
    HarmBlockThreshold,          //same as HarmCategory
  } from "@google/generative-ai"
  
  const apiKey = 'AIzaSyA4eOUsOX5RrbYDibhY_kC30zWdW3zKygg'; 
  const genAI = new GoogleGenerativeAI(apiKey);       //Initializing the Generative AI Client
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);   //Sends the prompt to the AI model and waits for the response.
    const response=result.response;
    console.log(response.text());
    // console.log(result.response.text());
    return response.text();
  }
  
  export default run;