const express = require("express");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const path = require("path");
const session = require('express-session');
const ExpressError = require("./ExpressError.js");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const bodyParser = require('body-parser');
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());

require("dotenv").config();
require("./models/db.js");

//mysql
require('./mysql/db.js');


const authRouter = require("./routes/authRouter.js");
const hostRouter = require("./routes/hostRouter.js");
const addressRouter=require('./routes/addressRouter.js');
const FloorPlanRouter=require('./routes/FloorPlanRouter.js');
const blogRouter = require("./routes/blogRouter.js");
const offerRoute = require("./routes/offerRouter.js");
const searchRouter = require("./routes/searchformRouter.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use("/models", express.static(path.join(__dirname, "models")));
//admin
app.use(express.static(path.join(__dirname, 'public')));
app.use('/real-estate', express.static(path.join(__dirname, 'public/real-estate')));

// assets
app.use('/assets', express.static('public/real-estate/assets'));

// const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "mysupersecretstring",  
//     resave: false,
//     saveUninitialized: true, 
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGO_CONN || 'mongodb://localhost:27017/offernmove',
//         ttl: 14 * 24 * 60 * 60
//     }),
//     cookie: {
//         secure: process.env.NODE_ENV === "production",  
//         httpOnly: true, 
//         maxAge: 1000 * 60 * 60 * 24, 
//         sameSite: 'strict',  
//     }
// };
// app.use(session(sessionOptions));
// app.use(flash());


// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(cors({
    origin: 'localhost:8080',
    credentials: true,
}));


app.use((req, res, next) => {
    // res.locals.success = req.flash('success');
    // res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;  
    next();
});


app.use("/auth", authRouter);

app.use("/host", hostRouter);

app.use('/', addressRouter);
app.use('/',FloorPlanRouter);
app.use("/blog", blogRouter);
app.use('/offer',offerRoute);
app.use("/", searchRouter);

app.get("/", (req, res) => {
    res.render("landing/landing.ejs", {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleMapKey: process.env.GOOGLE_MAP_KEY,
    });
});

app.get("/listings", (req, res) => {
    res.render("listings/index.ejs", {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleMapKey: process.env.GOOGLE_MAP_KEY
    });
});

app.get("/show", (req, res) => {
    res.render("listings/show", {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleMapKey: process.env.GOOGLE_MAP_KEY
    });
});

//About page
app.get("/about-us", (req, res) => {
    res.render("pages/About", {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleMapKey: process.env.GOOGLE_MAP_KEY
    });
});


app.get("/contact-us", (req, res) => {
    res.render("pages/contactUs", {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleMapKey: process.env.GOOGLE_MAP_KEY
    });
});

app.get("/terms", (req, res) => {
    res.render("pages/Terms", {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleMapKey: process.env.GOOGLE_MAP_KEY
    });
});

app.get("/privacy", (req, res) => {
    res.render("pages/Privacy", {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleMapKey: process.env.GOOGLE_MAP_KEY
    });
});
app.get("/refund", (req, res) => {
    res.render("pages/Refund", {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleMapKey: process.env.GOOGLE_MAP_KEY
    });
});

app.get("/faqs", (req, res) => {
    res.render("pages/Faqs", {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleMapKey: process.env.GOOGLE_MAP_KEY
    });
});
app.get("/real-estate", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/index.html")); // Admin home page
});
app.get("/real-estate/addproperty.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/addproperty.html")); 
});
app.get("/real-estate/addproperty.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/propertydetails.html")); 
});

app.get("/real-estate/addagent.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/addagent.html")); 
});
app.get("/real-estate/.agentprofile.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/agentprofile.html")); 
});
app.get("/real-estate/agentslist.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/agentslist.html")); 
});
app.get("/real-estate/apartment.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/apartment.html")); 
});
app.get("/real-estate/contact.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/contact.html")); 
});
app.get("public/real-estate/extra_calendar.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/extra_calendar.html")); 
});
app.get("public/real-estate/extra_taskboard.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/extra_taskboard.html")); 
});
app.get("public/real-estate/file-manager.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/file-manager.html")); 
});
app.get("public/real-estate/office.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/office.html")); 
});
app.get("public/real-estate/propertydetails.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/propertydetails.html")); 
});
app.get("public/real-estate/propertygrid.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/propertygrid.html")); 
});
// app.get("public/real-estate/propertylist.html", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/real-estate/propertylist.html")); 
// });
app.get("public/real-estate/shop.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/real-estate/shop.html")); 
});


app.all('*', (req, res, next) => {
    res.render("404/404.ejs");
});


app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        console.error(`Error starting server: ${err.message}`);
        return;
    }
    console.log(`Server is running on port ${PORT}`);
});