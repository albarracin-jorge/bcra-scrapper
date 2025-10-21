import express from 'express';
import { main } from './scrapper.js';

const app = express();
const port = process.env.PORT || 3000;

await main(0);

app.get('/', async (req, res) => {
    res.json({
        status: "OK",
        message: "BCRA Scrapper is running"
    });
});

app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
