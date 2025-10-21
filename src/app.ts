import { main } from './scrapper.js';

(async () => {
    try {
        console.log('Starting BCRA scraping...');
        await main(0);
        console.log('✅ Scraping completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Scraping failed:', error);
        process.exit(1);
    }
})();
