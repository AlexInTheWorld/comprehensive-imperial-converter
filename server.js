// server.js
// where my node app starts

// Build on express
const express   = require("express");
const app       = express();
const routes    = require("./routes/api.js");
const helmet    = require( 'helmet' );

// Use Pug template engine to serve client side pages
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// Use Helmet Middleware to secure headers
// // Minimize MIME type sniffing
app.use(helmet.noSniff());
// // Disable browsers' buggy cross-site scripting filter by setting the X-XSS-Protection header to 0
app.use(helmet.xssFilter());

// Serve static files from 'public' dir 
app.use(express.static("public"));

// Homepage
app.get("/", (req, res) => {
 res.render('index'); 
})

//Routed api
routes(app);

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + process.env.PORT);
});
