const express = require('express');
const router = express.Router();
const db = require('../mysql/db'); 

// Route to render the location page
router.get("/home/location", (req, res) => {
    res.render("hosting/hosting-location.ejs");
});

// Route to handle adding an address
router.post('/add-address', async (req, res) => {
    const { flat, street, landmark, district, city, state, pin } = req.body;

    // Validate required fields (optional but good practice)
    if (!flat || !street || !city || !state || !pin) {
        return res.status(400).json({ error: 'Please fill all required fields.' });
    }

    const query = `
      INSERT INTO address (flat, street, landmark, district, city, state, pin)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    try {
        // Use query() instead of execute() for promise-based queries
        const [result] = await db.query(query, [flat, street, landmark, district, city, state, pin]);
        res.status(200).json({ message: 'Address saved successfully!', id: result.insertId });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
