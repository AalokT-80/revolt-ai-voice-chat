require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE');

// System instructions for Revolt Motors
const SYSTEM_INSTRUCTION = `You are Rev, the AI assistant for Revolt Motors, India's leading electric motorcycle company. You should only discuss topics related to:

- Revolt Motors electric motorcycles (RV400, RV1, RV BlazeX)
- Electric vehicle technology and features
- Revolt Motors company information, dealerships, and services
- Electric mobility, sustainability, and clean commuting
- Booking, pricing, and purchasing information for Revolt bikes
- Battery technology, charging, and range
- Revolt Motors locations and availability

Keep responses conversational, enthusiastic, and focused on Revolt Motors. If users ask about other topics, politely redirect them back to Revolt Motors and electric motorcycles. Be helpful, friendly, and knowledgeable about the revolutionary electric mobility solutions Revolt offers.

Always respond in a natural, conversational tone suitable for voice interaction. Keep responses concise but informative.`;

// Store active WebSocket connections and their Gemini sessions
const activeConnections = new Map();

// Create HTTP server
const server = require('http').createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');
  
  const connectionId = Date.now().toString();
  activeConnections.set(connectionId, { ws, geminiSession: null });

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      const connection = activeConnections.get(connectionId);
      
      if (data.type === 'start_session') {
        // Initialize Gemini Live session
        const model = genAI.getGenerativeModel({ 
          // CORRECTED: Reads the model from your .env file
          model: process.env.GEMINI_MODEL,
          systemInstruction: SYSTEM_INSTRUCTION 
        });
        
        const session = model.startChat({
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 1024,
          }
        });
        
        connection.geminiSession = session;
        ws.send(JSON.stringify({ type: 'session_started' }));
      }
      
      if (data.type === 'audio_data' && connection.geminiSession) {
        // Handle audio data from client
        // For now, we'll simulate audio processing
        ws.send(JSON.stringify({ type: 'audio_response', data: 'Audio received and processed' }));
      }
      
      if (data.type === 'text_message' && connection.geminiSession) {
        // Handle text messages (for testing)
        const result = await connection.geminiSession.sendMessage(data.message);
        const response = result.response.text();
        
        ws.send(JSON.stringify({ 
          type: 'text_response', 
          message: response,
          timestamp: Date.now()
        }));
      }
      
      if (data.type === 'interrupt') {
        // Handle user interruption
        ws.send(JSON.stringify({ type: 'interrupted' }));
      }
      
    } catch (error) {
      console.error('WebSocket message error:', error);
      ws.send(JSON.stringify({ type: 'error', message: error.message }));
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    activeConnections.delete(connectionId);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    activeConnections.delete(connectionId);
  });
});

// REST API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const model = genAI.getGenerativeModel({ 
      // CORRECTED: Reads the model from your .env file
      model: process.env.GEMINI_MODEL,
      systemInstruction: SYSTEM_INSTRUCTION 
    });
    
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 1024,
      }
    });
    
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    
    res.json({ 
      response,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Revolt Motors Voice Chat Server running on port ${PORT}`);
  console.log(`📱 WebSocket server ready for connections`);
  console.log(`🏍️ Rev is ready to talk about Revolt Motors!`);
});