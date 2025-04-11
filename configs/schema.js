import { text } from "drizzle-orm/gel-core";
import { boolean, integer, numeric, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar(),
  email: varchar({ length: 255 }).notNull().unique(),
  paypalEmail: varchar().default(""),
  totalEarnings: integer("totalEarnings").default(0),
  withdrawableBalance: integer("withdrawableBalance").default(0),
  totalWithdrawnBalance: integer("totalWithdrawnBalance").default(0),
  hasWithdrawn: boolean("hasWithdrawn").default(false),
  lastPayoutDate: timestamp("lastPayoutDate", { mode: "date" }).defaultNow()
});



export const productsTable=pgTable('products',{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  title:varchar().notNull(),
  price:integer().notNull(),
  description:text().notNull(),
  about:text(),
  category:varchar().notNull(),
  imageUrl:varchar().notNull(),
  fileUrl:varchar().notNull(),
  message:varchar(),
  createdBy:varchar('createdBy').notNull().references(()=>usersTable.email)
});

export const cartTable=pgTable("cart",{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  email:varchar('email').notNull().references(()=>usersTable.email),
  productId: integer("productId").notNull().references(()=>productsTable.id)
})

export const orderTable=pgTable('orders',{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  email:varchar('email').notNull().references(()=>usersTable.email),
  productId: integer("productId").notNull().references(()=>productsTable.id),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow()
})



export const payoutTable = pgTable("payouts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  paypalEmail: varchar().references(() => usersTable.email),
  amount: integer("amount").notNull(),
  status: varchar("status").notNull().default("Pending"),
  transactionId: varchar({ length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow()
})

export const contactUsTable = pgTable("contact", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  inquiryType: varchar("inquiryType", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
