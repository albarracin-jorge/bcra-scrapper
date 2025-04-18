import express from 'express';
import { main } from './scrapper.js';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const result = await main(4)
    res.json(result);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})


