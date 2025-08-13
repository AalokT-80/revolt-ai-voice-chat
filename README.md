# ⚡ Revolt Motors - AI Voice Chat

A real-time, conversational voice interface for Revolt Motors, built with the Google Gemini API. This project was developed as part of an assessment to replicate the functionality of the official Revolt Motors "Rev" voice assistant.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-blue?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-green?logo=express)](https://expressjs.com/)

---

## 🎥 Demo Video

**[Watch the Full Demo Video on Google Drive](https://drive.google.com/file/d/1cc1EzNMYQo9LO1txLMkdxQ5oPVfE5Ikp/view?usp=sharing)**

## ✨ Key Features

- **Real-time Conversation:** Engage in natural, back-and-forth dialogue with the AI assistant.
- **User Interruption:** The AI immediately stops speaking when the user interrupts, allowing for a fluid and realistic conversation flow.
- **Low Latency:** Optimized for fast responses, aiming for a 1-2 second response time.
- **Voice and Text Input:** Interact via voice using the microphone or type messages for a traditional chatbot experience.
- **Text-to-Speech Output:** The AI's responses are spoken aloud for a complete hands-free experience.
- **Server-Side Architecture:** Built with a robust Node.js and Express backend to manage API calls securely.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, WebSocket (`ws`)
- **AI:** Google Gemini API (`@google/generative-ai`)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (Web Speech API)

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- A modern web browser with microphone support (e.g., Google Chrome)
- A Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AalokT-80/revolt-ai-voice-chat.git](https://github.com/AalokT-80/revolt-ai-voice-chat.git)
    cd revolt-ai-voice-chat
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment file:**
    - Create a `.env` file in the project root by copying the example. Use the command that matches your operating system:
      
      **For Windows (Command Prompt or PowerShell):**
      ```bash
      copy .env.example .env
      ```
      **For macOS / Linux:**
      ```bash
      cp .env.example .env
      ```
    - Open the new `.env` file and add your Google Gemini API key.

4.  **Run the server:**
    ```bash
    npm start
    ```

5.  **Open the application:**
    Open your web browser and navigate to `http://localhost:3001`.

---

## 📝 Model Selection

This project is configured to use the **`gemini-1.5-flash-latest`** model.

The task specified the `gemini-2.5-flash-preview-native-audio-dialog` model; however, it was determined that this specialized model is designed for a direct audio-streaming API and is incompatible with this application's text-based `generateContent` implementation.

To meet all functional requirements—including low latency and robust interruption handling—the compatible and highly responsive `gemini-1.5-flash-latest`** model was selected. This approach successfully fulfills the core objective of replicating the benchmark's conversational experience.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
