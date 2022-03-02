require('dotenv').config()
require('./src/config/dbConfig')

const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require('./src/routes/authRoutes');
const publicRoutes = require('./src/routes/publicRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(authRoutes)
app.use(publicRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
