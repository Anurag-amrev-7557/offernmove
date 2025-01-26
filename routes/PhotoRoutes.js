const express = require("express");
const router = express.Router();
const connection = require("./db");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-photos", upload.array("photos", 10), (req, res) => {
    const files = req.files;


    if (files.length < 5 || files.length > 10) {
        return res.status(400).json({ message: "Please upload between 5 and 10 photos." });
    }

    const userId = req.body.user_id;

    const query = "INSERT INTO photos (user_id, photo_data) VALUES ?";
    const values = files.map(file => [userId, file.buffer]);


    connection.query(query, [values], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error while uploading photos." });
        }
        res.json({ message: "Photos uploaded successfully!" });
    });
});

module.exports = router;
