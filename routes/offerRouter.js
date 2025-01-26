const express = require('express');
const router = express.Router();

router.get("/offer1", (req, res) => { res.render("offers/offer-1.ejs",{
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleMapKey: process.env.GOOGLE_MAP_KEY
}); });

router.get("/offer2", (req, res) => { res.render("offers/offer-2.ejs",{
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleMapKey: process.env.GOOGLE_MAP_KEY
}); });

router.get("/offer3", (req, res) => { res.render("offers/offer-3.ejs",{
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleMapKey: process.env.GOOGLE_MAP_KEY
}); });

router.get("/offer4", (req, res) => { res.render("offers/offer-4.ejs",{
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleMapKey: process.env.GOOGLE_MAP_KEY
}); });

module.exports = router;  