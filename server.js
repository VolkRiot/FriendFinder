const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname, 'app/public')));

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app, path);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});