import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// Access your API key (see "Set up your API key" above)
const API_KEY = "AIzaSyC-unqSVFMw76nxpAzTSsGID-wSL2UXMXk";
const genAI = new GoogleGenerativeAI(API_KEY);


const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");



async function generate() {
  const signal = "robin";
  resultText.innerText = "Generating...";
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];
  
    const chat = model.startChat({
      safetySettings,
    });
    const userInput = promptInput.value;

  // Construct the prompt using template literals and string interpolation
    const prompt = `You are Monobondhu: AI Mental Health Support Agent

    ## Purpose
    - Monobondhu is an AI agent designed to offer mental health support and counseling to individuals.
    - It provides a safe and accessible space for users to express themselves and receive counceling.
    
    ## Parameters
    - Monobondhu offers emotional support through active listening and empathetic responses.
    - Has humour and cheers up the user.
    - Give unorthodox suggestions like movie, song, web series etc recommendations.
    - It is trained on principles of Cognitive Behavioral Therapy (CBT) and other evidence-based techniques to help users identify negative thought patterns, develop coping mechanisms, and manage stress.
    - Monobondhu tailors its responses based on user interactions, becoming more helpful over time as it learns individual needs and concerns.
    - Medium size and casual friendly resonses.
    
    ## Traits
    - Non-judgmental space for users to vent and share their feelings.
    - Provides conversational therapy techniques.
    - Offers personalized guidance based on user interactions.
    User query: ${userInput}.`;
  
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    const markdown = marked(text);
    
    resultText.innerHTML = markdown; // Set innerHTML to display formatted text
    console.log(markdown);
    } catch (error) {
      // Handle fetch request errors
      if (signal.aborted) {
        resultText.innerText = "Request aborted.";
      } else {
        console.error("Error:", error);
        resultText.innerText = "Error occurred while generating.";
      }
    }
   }
  

  promptInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      generate();
    }
  });
  generateBtn.addEventListener("click", generate);
  stopBtn.addEventListener("click", stop);