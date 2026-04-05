import React from 'react'
import ReactDOM from 'react-dom/client'

// Your Backend URL
const BACKEND_URL = "https://collab-code-l8gz.onrender.com";

// FUNCTION: Save code to MongoDB
const saveTest = async () => {
  try {
    console.log("⏳ Sending data to Render...");
    const response = await fetch(`${BACKEND_URL}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomID: "test-room-123",
        codeContent: "console.log('Database Connection Success!');",
        language: "javascript" 
      })
    });
    const result = await response.json();
    console.log("✅ Success! Database says:", result);
    alert("Data saved to MongoDB!");
  } catch (err) {
    console.error("❌ Cloud Save Error:", err);
    alert("Save failed. Check console (F12).");
  }
};

// Start the app with a Test Button
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{color: 'white', textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif'}}>
      <h1 style={{color: '#61dafb'}}>🚀 Full-Stack Connected!</h1>
      <p>Click the button below to test your MongoDB connection.</p>
      
      <button 
        onClick={saveTest}
        style={{
          padding: '15px 30px', 
          fontSize: '18px', 
          cursor: 'pointer', 
          backgroundColor: '#61dafb', 
          border: 'none', 
          borderRadius: '5px',
          fontWeight: 'bold'
        }}
      >
        Test Database Save
      </button>

      <p style={{marginTop: '20px', color: '#888'}}>Open Console (F12) to see the logs.</p>
    </div>
  </React.StrictMode>
)
