const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// CORS setup for your specific website
app.use(cors({
    origin: 'https://fyp-collabcode-js.vercel.app', 
    methods: ['GET', 'POST']
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ Connection Error: ", err));

// Database Schema
const CodeSchema = new mongoose.Schema({
    roomID: String,
    codeContent: String,
    language: String
});
const CodeModel = mongoose.model('CodeRecord', CodeSchema);

// Basic Save Route
app.post('/api/save', async (req, res) => {
    const { roomID, codeContent, language } = req.body;
    try {
        const result = await CodeModel.findOneAndUpdate(
            { roomID }, 
            { codeContent, language }, 
            { upsert: true, new: true }
        );
        res.json({ message: "Code saved!", data: result });
    } catch (err) {
        res.status(500).json({ error: "Save failed" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));