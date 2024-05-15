import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// Access your API key (see "Set up your API key" above)
const API_KEY = "AIzaSyC-unqSVFMw76nxpAzTSsGID-wSL2UXMXk";
const genAI = new GoogleGenerativeAI(API_KEY);


const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");



async function generate() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const userInput = promptInput.value;

  // Construct the prompt using template literals and string interpolation
    const prompt = `You are a world champion debater.
    Structure of an argument: 1. Statement. 2. Reasons why the statement is true(as many reasons as possible). 3. Impacts of statement (why the statement is important).
    Structure of a statement: "The action within the motion" leads to or will lead to or has lead to "The conclusion or end point Of the argument".
    Example statements of arguments for the motion: This House Will legalize all drugs:
    1 - Legalizing all drugs will lead to more quality drugs.
    2 - Legalizing all drugs will lead to less black market.
    Create as many arguments as possible for the proposition of the Debate motion: ${userInput}.`;
  
    const result = await model.generateContentStream(prompt);
    const response = await result.response;
    const text = response.text();

    const markdown = marked(text);

    resultText.innerHTML = markdown; // Set innerHTML to display formatted text
    console.log(markdown);
  }
  

  promptInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      generate();
    }
  });
  generateBtn.addEventListener("click", generate);
  stopBtn.addEventListener("click", stop);