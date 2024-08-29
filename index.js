const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

app.use("cors");
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})