const express = require('express');
const cors = require('cors');
const db = require("./models");
const {logger, } = require('./middlewares');

const app = express();

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Use custom logging middleware
app.use(logger)

// Prepare DB
db.connection.sync();

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Login System', developer: { name: 'Muhammad Tayyab Sheikh', alias: 'cstayyab'} });
});

require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
