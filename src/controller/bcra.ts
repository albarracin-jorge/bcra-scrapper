import { drizzle } from "drizzle-orm/mysql2";
import { eq, and } from "drizzle-orm";
import { quotesTable } from "../db/schema.js";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL!);

export const saveQuotes = async (data: any[]) => {
    try {
        for (const quote of data) {
            const existingQuote = await db
                .select()
                .from(quotesTable)
                .where(
                    and(
                        eq(quotesTable.bankName, quote.bankName),
                        eq(quotesTable.hour, quote.hour),
                        eq(quotesTable.date, quote.date)
                    )
                )
                .limit(1);

            if (existingQuote.length > 0) {
                await db
                    .update(quotesTable)
                    .set({
                        buy: quote.buy,
                        sell: quote.sell,
                        updatedAt: new Date(),
                    })
                    .where(
                        and(
                            eq(quotesTable.bankName, quote.bankName),
                            eq(quotesTable.hour, quote.hour),
                            eq(quotesTable.date, quote.date)
                        )
                    );
                console.log(`Quote updated for bank: ${quote.bankName}`);
            } else {
                await db.insert(quotesTable).values(quote);
                console.log(`Quote inserted for bank: ${quote.bankName}`);
            }
        }
    } catch (error) {
        console.error("Error saving quotes:", error);
        throw error;
    }
};