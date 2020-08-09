const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  flash = require('connect-flash'),
  Admin = require("./models/admin"),
  Hacker = require("./models/hacker"),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  methodOverride = require('method-override'),
  port = process.env.PORT || 3000,
  dotenv = require('dotenv'),
  passportLocalMongoose = require("passport-local-mongoose");
var sslRedirect = require('heroku-ssl-redirect');
dotenv.config();



// app config-----
app.use(cookieParser('CODA@Is@Great!!@By@KRITANSH'));
app.use(require("express-session")({
  secret: "This is a marketing panel",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "strict"
  }

}));
app.use(express.static(__dirname + "/public/"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
// app.use(sslRedirect());
// Require Admin Routes================================
var adminAuthRoutes = require("./routes/admin/auth"),
  adminDashRoutes = require("./routes/admin/dashboard");

// Require User Routes=================================
var userRoutes = require("./routes/user/hacker");




// mongoose config
const mongoURI="mongodb+srv://kintu:"+process.env.mongo_user+"@cluster0.gdz8c.mongodb.net/coda_v1?retryWrites=true&w=majority";
//Mongo connection
mongoose.connect(mongoURI);

//PASSPORT config

// passport.use('admin', new localStrategy(Admin.authenticate()));
passport.use('admin', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, Admin.authenticate()
));
// passport.use('employee', new localStrategy(Employee.authenticate()));
passport.serializeUser(function (user, done) {
  var key = {
    id: user.id,
    type: user.typeof
  }
  done(null, key);
})
passport.deserializeUser(function (key, done) {
  if (key.type === 'admin') {
    Admin.findOne({
      _id: key.id
    }, function (err, user) {
      done(err, user);
    })
  }

})

// Use Admin Routes======================
app.use("/admin", adminAuthRoutes);
app.use("/admin/dashboard", adminDashRoutes);

// Use User Routes=========================
app.use("/", userRoutes);




app.get("/", (req, res) => {
  Hacker.find({}, (err, hackers) => {
    if (err) {
      console.log(err);
      req.flash("error", "Database Error");
      res.redirect("back")

    } else {
      if (req.signedCookies['voted']) {
        // Do nothing
      } else {
        var voted = [];
        JSON.stringify(voted);
        // console.log(cart);
        res.cookie('voted', voted, { maxAge: 24 * 60 * 60 * 1000 * 365, signed: true });
      }
      res.render("user/index", { hackers: hackers })
    }

  })
})

app.listen(port, () => {
  console.log("Server Started on " + port);
})

