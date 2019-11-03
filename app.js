require('dotenv').config();
const path = require('path');
const fetch = require('node-fetch');
const express = require('express');

const app = express();
const port = process.env.PORT || '5000';
app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/img', async (req, res) => {

    const data = req.body;
    const { endpoint, inputValue, imgsNum, startFrom } = data;
    const key = process.env.GIPHY_KEY;

    const url = `http://api.giphy.com/v1/gifs/${endpoint}?api_key=${key}${inputValue && `&q=${inputValue.split(' ').join('+')}`}&limit=${imgsNum}&offset=${startFrom}`;

    console.log(url)

    const img_response = await fetch(url);
    const img_data = await img_response.json();
    res.json(img_data);
})