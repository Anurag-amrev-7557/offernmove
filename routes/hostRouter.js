const router = require("express").Router();

router.get("/home", (req, res) => {res.render("hosting/hosting.ejs");});


router.get("/home/about-place", (req, res) => {res.render("hosting/hosting-place.ejs");});

router.get("/home/location", (req, res) => {res.render("hosting/hosting-location.ejs");});

router.get("/home/floor-plan", (req, res) => {res.render("hosting/hosting-floor-plan.ejs");});

router.get("/home/stand-out", (req, res) => {res.render("hosting/hosting-standout.ejs");});

router.get("/home/photos", (req, res) => {res.render("hosting/hosting-photos.ejs");});

module.exports = router;  
