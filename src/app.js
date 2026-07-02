let express = require('express');
const { model } = require('mongoose');

let app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app