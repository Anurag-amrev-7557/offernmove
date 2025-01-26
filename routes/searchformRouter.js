const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
require("dotenv").config();
const db = require('../mysql/db'); 

router.get('/search-results', async (req, res) => {
    try {
        const query = req.query['search-query'] || ''; 
        console.log('Search Query:', query);

        // Split the query into individual keywords
        const keywords = query.toLowerCase().split(/\s+/); 
        console.log('Keywords:', keywords);

        // Base query to filter based on state or city
        let statecityquery = 'SELECT * FROM address WHERE 1=1';
        const addressParams = [];

        // Loop through each keyword and add it to the query
        keywords.forEach((keyword) => {
            statecityquery += ' AND (LOWER(state) LIKE ? OR LOWER(city) LIKE ?)';
            addressParams.push(`%${keyword}%`, `%${keyword}%`);
        });

        console.log(addressParams);
        // Execute the query
        const [results] = await db.execute(statecityquery, addressParams);

        console.log('Search Results:', results);
        
        // Send the filtered results as a response
        res.status(200).json({ addresses: results });

    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
