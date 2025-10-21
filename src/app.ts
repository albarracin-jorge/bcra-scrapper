import express from 'express';
import { main } from './scrapper.js';
import cron from 'node-cron'; 
import { drizzle } from "drizzle-orm/mysql2";
import { quotesTable } from './db/schema.js';

const app = express();
const port = process.env.PORT || 3000;

// Configurar cron job para ejecutar el scraping cada 3 minutos entre 11-15hs de lunes a viernes
cron.schedule('*/3 11-15 * * 1-5', async () => {
    console.log('Running scheduled scraping...');
    try {
        await main(0);
    } catch (error) {
        console.error('Error in scheduled scraping:', error);
    }
});

app.get('/', async (req, res) => {
    try {
        const db = drizzle(process.env.DATABASE_URL!);
        const [result] = await db.select().from(quotesTable).execute();
        console.log("✅ Conexión exitosa:", result);
        if(!result) return res.status(500).json({error: "Database connection error"});
        res.json({
            status: "Server running",
            message: "BCRA Scrapper API is operational"
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({error: "Database connection error"});
    }
});

// Endpoint para ejecutar el scraping manualmente
app.get('/scrape', async (req, res) => {
    try {
        const daysAgo = parseInt(req.query.daysAgo as string) || 0;
        console.log(`Manual scraping initiated for ${daysAgo} days ago...`);
        const result = await main(daysAgo);
        res.json({
            success: true,
            message: 'Scraping completed successfully',
            data: result
        });
    } catch (error: any) {
        console.error('Scraping error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Scraping failed'
        });
    }
});

// Endpoint para obtener las últimas cotizaciones
app.get('/quotes', async (req, res) => {
    try {
        const db = drizzle(process.env.DATABASE_URL!);
        const limit = parseInt(req.query.limit as string) || 100;
        const quotes = await db.select().from(quotesTable).limit(limit).execute();
        res.json({
            success: true,
            count: quotes.length,
            data: quotes
        });
    } catch (error: any) {
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch quotes'
        });
    }
});

app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
