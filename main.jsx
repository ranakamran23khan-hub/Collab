import React from 'react'
import ReactDOM from 'react-dom/client'

// Your Backend URL
const BACKEND_URL = "https://collab-code-l8gz.onrender.com";

// FUNCTION: Save code to MongoDB
export const saveCodeToCloud = async (roomID, codeContent) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomID,
        codeContent,
        language: "javascript" 
      })
    });
    console.log("Status: Code saved to MongoDB");
  } catch (err) {
    console.error("Cloud Save Error:", err);
  }
};

// FUNCTION: Load code from MongoDB
export const loadCodeFromCloud = async (roomID) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/load/${roomID}`);
    const data = await response.json();
    return data ? data.codeContent : "";
  } catch (err) {
    console.error("Cloud Load Error:", err);
    return "";
  }
};

// Start the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>
      <h1>Backend Connected!</h1>
      <p>Check the console (F12) to see database activity.</p>
    </div>
  </React.StrictMode>
)