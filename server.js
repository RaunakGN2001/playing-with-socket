require('dotenv').config({path: __dirname + '/.env'})

const PORT = process.env['PORT'] || 3000; // port -- env variable

const express = require('express');
const path = require('path')
const app = express();
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



