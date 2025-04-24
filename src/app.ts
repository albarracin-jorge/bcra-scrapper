import express from 'express';
import { main } from './scrapper.js';
import cron from 'node-cron'; 

const app = express();
const port = 3000;

cron.schedule('*/10 11-15 * * 1-5', async () => {
// cron.schedule('* * * * *', async () => {
    await main(0);
})

// await main(0);

// app.get('/', async (req, res) => {
//     await main(0);
//     res.json({result: "ok"});
// });

app.listen(port, () => {
    console.log(`Server is running`);
});