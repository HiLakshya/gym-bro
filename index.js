const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const router = express.Router();


app.get('/', (req, res) => {
   
    const filePath = path.resolve(__dirname + '/index.html');
    res.sendFile(filePath);
});

app.get('/getEx', async (req, res) => {
    let bodyPart = req.query.bodyPart;
    let BaseURL = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=1000000`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.key,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(BaseURL, options);
        const data = await response.json();
        console.log("Excercises fetched");
        // console.log(data);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching exercises' });
    }
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));

