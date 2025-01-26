const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const { email, title, rating, review } = req.body;
    const query = "INSERT INTO reviews (email, title, rating, review) VALUES (?, ?, ?, ?)";

    db.query(query, [email, title, rating, review], (err, results) => {
        if (err) {
            console.error("Error inserting review:", err);
            res.status(500).send("Error inserting review");
        } else {
            res.status(200).send("Review submitted successfully");
        }
    });
});

module.exports = router;
