import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-todos', async (req, res) => {
 try {
  const { prompt } = req.body;
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const fullPrompt = `Based on the following prompt, generate a to-do list. Return the list as a simple array of strings in JSON format. For example: ["item 1", "item 2", "item 3"]. The prompt is: "${prompt}"`;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  const text = await response.text();
  
  const startIndex = text.indexOf('[');
  const endIndex = text.lastIndexOf(']');
  const jsonString = text.substring(startIndex, endIndex + 1); 

  const todos = JSON.parse(jsonString);

  res.json({ todos });

} catch (error) {
  console.error('Error generating to-do list:', error);

  if (error.status === 503) {
    return res.status(503).json({ message: 'The AI model is currently busy. Please try again in a moment.' });
  }
  
  res.status(500).json({ message: 'Failed to generate to-do list.' });
}
});

export default router;