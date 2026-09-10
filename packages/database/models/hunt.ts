import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const difficultyTypeEnum = pgEnum("difficulty_type_enum", ["EASY", "MEDIUM", "HARD"])

export const huntStatusEnum = pgEnum("hunt_status_enum", ["DRAFT", "PUBLISHED"])

export const huntTagEnum = pgEnum("hunt_tag_enum", [
  "ADVENTURE",
  "MYSTERY",
  "PIRATES",
  "FANTASY",
])


export const huntsTable = pgTable("hunts", {

  id: uuid("id").primaryKey().defaultRandom(),
  
  title: varchar("title", {length: 60}).notNull(),
  description: varchar("description", {length: 6000}).notNull(),
  image: text("image").notNull(),
  difficulty: difficultyTypeEnum("difficulty").notNull(),
  status: huntStatusEnum("status").notNull().default("DRAFT"),
  tag: huntTagEnum("tag").notNull().default("ADVENTURE"),
  playCount: integer("play_count").notNull().default(0),
  creatorsId: uuid("creators_id").references(() => usersTable.id),



  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});



