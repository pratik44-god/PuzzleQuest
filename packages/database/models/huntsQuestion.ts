import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  pgEnum,
  numeric,
  integer
} from "drizzle-orm/pg-core";
import { huntsTable } from "./hunt";

export const questionTypeEnum = pgEnum("question_type_enum", ["TEXT", "IMAGE"])

export const huntsQuestionTable = pgTable("huntsQuestion", {

  id: uuid("id").primaryKey().defaultRandom(),

  questionType: questionTypeEnum("question_type").notNull(),

  question: varchar("question").notNull(),

  questionText: varchar("question_text", { length: 600 }),

  answer: varchar("answer", { length: 100 }).notNull(),

  hints: text("hints").array(),

  huntId: uuid("hunt_id").references(() => huntsTable.id),


  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),

  questionIndex: integer("question_index").notNull(),

  timeLimitSeconds: integer("time_limit_seconds"),

});




