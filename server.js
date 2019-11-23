// Dependencies
// ===========================================================
var express = require("express");
const path = require('path');
var app = express();
var PORT = process.env.PORT || 3000;

// set up the express app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
// Data
// ===========================================================
const reservations = [
  {
    customerName: "Eric",
    phoneNumber: "555-555-5555",
    customerEmail: "eric@aol.com",
    customerID: "eric"
  },
  {
    customerName: "Liz",
    phoneNumber: "555-555-5555",
    customerEmail: "liz@aol.com",
    customerID: "liz"
  }
];
const waitlist = [
  {
    customerName: "Scott",
    phoneNumber: "555-555-5555",
    customerEmail: "scott@aol.com",
    customerID: "scott"
  },
  {
    customerName: "Phil",
    phoneNumber: "555-555-5555",
    customerEmail: "phil@aol.com",
    customerID: "phil"
  }
];
// Routes
// ===========================================================
// general route
//html routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//api routes
app.get('/api/tables', (req, res) => {
  return res.json(reservations);
});
app.get('/api/waitlist', (req, res) => {
  return res.json(waitlist);
});
//sends back the new add form we create
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, './public/reserve.html'));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, './public/tables.html'));
});

// getting raw data from client, add an object to the dataz
app.post('/api/tables', (req, res) => {
  //format for my db
  waitlist.push(req.body);
  const newReservation = req.body;
  console.log(newReservation);

// get one object from dataz
app.get('/api/tables/:table', (req, res) => {
  const chosen = req.params.reservation;
  /* find object in db based on routeName */
  const chosenOne = reservations.filter(obj => {
    return obj.routeName === chosen;
  });
  if (chosenOne.length) {
    return res.json(chosenOne[0]);
  }
  return res.send('reservation, i do not see.');
});


  //make new route based on name (takes care of spaces, upper/lowercase, to make one character name)
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  //add new character to db
  reservations.push(newReservation);

  //send back what i just added
  res.json(newReservation);
});
// Listener starts server
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});