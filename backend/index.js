require('dotenv').config()

const express = require("express");
const cors = require("cors");
const axios = require('axios');


const app = express();

// Middleware to log the requests
function logRequests(req, res, next) {
    console.log(`${new Date().toISOString()} - ${req.method} Request to ${req.url}`);
    next();
}

// Use the built-in middleware for parsing JSON and handling CORS
app.use(express.json());
app.use(cors({ origin: true }));

// Use the custom logging middleware
app.use(logRequests);

// Define your route
app.post("/authenticate", async (req, res) => {
    console.log("Received request with body:", req.body);

    const username = req.body.username;

    try {
        const r = await axios.put(
            process.env.CHATENGINE_API_URL,
            {username: username, secret: username, first_name: username},
            {headers: {"private-key": process.env.PRIVATE_KEY}}
        )
        return res.status(r.status).json(r.data)
    } catch (e) {
            // Check if the error has a response
        if (e.response) {
            // Error has a response (e.g., 4xx or 5xx HTTP status code)
            return res.status(e.response.status).json(e.response.data);
        } else if (e.request) {
            // The request was made but no response was received
            console.error('Error: No response received', e.request);
            return res.status(500).json({ message: 'No response received from the server' });
        } else {
            // Something happened in setting up the request
            console.error('Error: Request setup failed', e.message);
            return res.status(500).json({ message: e.message });
        }
    }
});

// Start the server
app.listen(3001, () => {
    console.log("Server running on port 3001");
});

