import { mysqlTable, int, double, time, varchar, timestamp } from "drizzle-orm/mysql-core"

export const quotesTable = mysqlTable("quotes", {
    id: int('id').primaryKey().autoincrement(),
    bankName: varchar('bank_name', { length: 255 }),
    hour: time('hour'), // Antes era varchar, ahora corregido a TIME
    buy: double('buy'),
    sell: double('sell'),
    date: timestamp('date'), // Asumimos que querías la fecha completa. Si solo quieres DATE, se puede cambiar
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
    deletedAt: timestamp('deletedAt'), // Puede ser nulo si no está eliminado
})