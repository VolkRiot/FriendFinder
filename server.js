const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname, '/app')));

require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);



app.listen(port, () => {
  console.log("Listening on " + port);
});