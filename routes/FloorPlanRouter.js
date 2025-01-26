const express = require('express');
const router = express.Router();
const db = require('../mysql/db'); // Ensure this is the correct path to your database connection

// POST request to save floor plan details (bedroom, hall, kitchen)
router.post('/home/floor-plan', async (req, res) => {
    const { bedroom, hall, kitchen } = req.body;

    // Validate the input (optional)
    if (typeof bedroom !== 'number' || typeof hall !== 'number' || typeof kitchen !== 'number') {
        return res.status(400).send('Invalid input. Bedroom, hall, and kitchen should be numbers.');
    }

    // SQL query to insert data into hosting_data table
    const query = `
        INSERT INTO hosting_data (bedroom, hall, kitchen)
        VALUES (?, ?, ?);
    `;
    
    try {
        // Execute the query with the provided values
        const [results] = await db.execute(query, [bedroom, hall, kitchen]);
        res.status(200).send('Data saved successfully');
    } catch (err) {
        console.error('Error inserting data: ', err);
        res.status(500).send('Error saving data');
    }
});

module.exports = router;
