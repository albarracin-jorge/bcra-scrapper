import express from 'express';
import { main } from './scrapper.js';
import cron from 'node-cron'; 
import { drizzle } from "drizzle-orm/mysql2";
import { quotesTable } from './db/schema.js';

const app = express();
const port = 3000;

// cron.schedule('*/3 11-15 * * 1-5', async () => {
//     await main(0);
// })

await main(0);

app.get('/', async (req, res) => {
    const db = drizzle(process.env.DATABASE_URL!);
    const [result] = await db.select().from(quotesTable).execute();
    console.log("✅ Conexión exitosa:", result);
    if(!result) return res.status(500).json({error: "Database connection error"});
    res.json({result: "Server running"});
});

app.listen(port, () => {
    console.log(`Server is running`);
});
