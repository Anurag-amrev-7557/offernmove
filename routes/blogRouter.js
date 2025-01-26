const router = require("express").Router();

router.get("/", (req, res) => {res.render("pages/Blog/Blog", {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleMapKey: process.env.GOOGLE_MAP_KEY
});});

router.get("/buying-first-house", (req, res) => { res.render("pages/Blog/buyhouse", {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleMapKey: process.env.GOOGLE_MAP_KEY
}); });

router.get("/choosing-right-real-estate-agent", (req, res) => { res.render("pages/Blog/buyhouse", {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleMapKey: process.env.GOOGLE_MAP_KEY
}); });

router.get("/common-real-estate-scams-in-india", (req, res) => { res.render("pages/Blog/buyhouse", {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleMapKey: process.env.GOOGLE_MAP_KEY
}); });

router.get("/coliving-spaces-in-india", (req, res) => { res.render("pages/Blog/buyhouse", {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleMapKey: process.env.GOOGLE_MAP_KEY
}); });

router.get("/renting-vs-buying-in-india", (req, res) => { res.render("pages/Blog/buyhouse", {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleMapKey: process.env.GOOGLE_MAP_KEY
}); });

module.exports = router;