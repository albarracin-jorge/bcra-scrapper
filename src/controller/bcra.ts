import { drizzle } from "drizzle-orm/mysql2";
import { quotesTable} from "../db/schema"
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL!);

export const saveQuotes = async (data: any) => {
    try {
        await db.insert(quotesTable).values(data);
        console.log("Data saved successfully");
    } catch (error) {
        console.error("Error saving data:", error);
        throw error;
    }
};