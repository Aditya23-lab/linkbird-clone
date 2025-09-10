import { pgTable, serial, integer, text, varchar,timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users"; // adjust path if needed
import { relations } from "drizzle-orm";
// Users table
// export const usersTable = pgTable('"Users"', {
//   id: serial("id").primaryKey(),                 // auto-increment PK
// //   name: varchar("name", { length: 255 }).notNull(),
//  name: text("name").notNull(),
//   email: text("email").notNull().unique(),
//   password: text("password"),                     // store hashed password
// });

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  emailVerified: text("emailVerified"),  // can be null initially
  image: text("image"),                   // optional

});

// Leads table
export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").notNull(),
  company: text("company"),
//   campaign: text("campaign"),
campaignId: integer("campaign_id")
  .notNull()
  .references(() => campaignsTable.id),

  status: text("status"),
  lastContact: text("last_contact"),
  userId: integer("user_id").notNull() .references(() => usersTable.id),          // FK to users.id
});

// Links table
// export const linksTable = pgTable("links", {
//   id: serial("id").primaryKey(),
//   url: text("url").notNull(),
//   description: text("description"),
//   userId: integer("user_id").notNull(),         // FK to users.id
// });
export const linksTable = pgTable("links", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  clicks: integer("clicks").default(0),
  userId: integer("userId")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("createdAt").defaultNow(),
});
// Campaigns table
// export const campaignsTable = pgTable("campaigns", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
//   status: text("status"),
//   totalLeads: text("total_leads"),
//   successfulLeads: text("successful_leads"),
//   responseRate: text("response_rate"),
//   createdDate: text("created_date"),
// });

// // Campaigns table
// export const campaignsTable = pgTable("campaigns", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
//   status: text("status"),
//   totalLeads: text("totalleads"),
//   successfulLeads: text("successfulleads"),
//   responseRate: text("responserate"),
//   createdDate: text("createddate"),
//   // ❌ no userId
// });


// export const campaignsTable = pgTable("campaigns", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
//   status: text("status"),
//   totalleads: text("totalleads"),
//   successfulleads: text("successfulleads"),
//   responserate: text("responserate"),
//   createddate: text("createddate"),
//   user_id: integer("user_id") // <--- add this line
// });
// export const campaignsTable = pgTable("campaigns", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
//   status: text("status"),
//   totalLeads: integer("totalleads").default(0).notNull(),
//   successfulLeads: integer("successfulleads").default(0).notNull(),
//   responseRate: integer("responserate").default(0).notNull(),
//   createdDate: timestamp("createddate").defaultNow().notNull(),
//   userId: integer("user_id").notNull().references(() => usersTable.id), // ✅ consistent with other tables
// });


export const campaignsTable = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  status: text("status"),

  // ✅ match DB exactly (no snake_case)
  totalleads: integer("totalleads").notNull().default(0),
  successfulleads: integer("successfulleads").notNull().default(0),
  responserate: integer("responserate").notNull().default(0),
  createddate: timestamp("createddate").notNull().defaultNow(),

  user_id: integer("user_id").references(() => usersTable.id),
});

export const campaignsRelations = relations(campaignsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [campaignsTable.user_id],
    references: [usersTable.id],
  }),
}));