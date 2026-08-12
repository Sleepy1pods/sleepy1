import type { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `You are the official AI assistant for Sleepy1, an innovative Indian startup providing private, smart rest pods across universities, corporate parks, hospitals, and railway stations. 
Your goal is to help users understand what Sleepy1 is, how to book a pod, and answer any general questions in a friendly, concise, and helpful manner. 
Keep your responses short and to the point. Always maintain a premium and modern tone.`;

export const handleChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400).json({ success: false, message: 'Message is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({ success: false, message: 'Gemini API key is not configured on the server.' });
      return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Initialize the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    // Format history for Gemini
    // Expected incoming history format: [{ role: 'user' | 'assistant', content: '...' }]
    let formattedHistory = Array.isArray(history) ? history.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    })) : [];

    // Gemini API requires the first message in history to be from the 'user'.
    while (formattedHistory.length > 0 && formattedHistory[0]?.role === 'model') {
      formattedHistory.shift();
    }

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    res.status(200).json({
      success: true,
      response: responseText
    });
  } catch (error: any) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process chat message', 
      error: error.message 
    });
  }
};
