const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/users",require('./routes/users.js'));
app.use("/api/account",require('./routes/account.js'));

module.exports = app;