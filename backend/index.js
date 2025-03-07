const express = require('express');
const routes = require('./routes');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.raw({ type: "*/*", limit: "5mb" }));
app.use(routes);
app.listen(3000, () => {
    console.log('Listening on 3000');
});