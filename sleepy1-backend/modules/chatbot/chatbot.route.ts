import { Router } from 'express';
import { handleChat } from './chatbot.controller.js';

const router = Router();

// POST /api/chatbot/chat
router.post('/chat', handleChat);

export default router;
