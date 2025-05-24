import express from 'express';
import { main } from './scrapper.js';
import cron from 'node-cron'; 

const app = express();
const port = 3000;

cron.schedule('*/3 11-21 * * 1-6', async () => {
    await main(0);
})

// await main(5);

app.get('/', async (req, res) => {
    res.json({result: "server running"});
});

app.listen(port, () => {
    console.log(`Server is running`);
});