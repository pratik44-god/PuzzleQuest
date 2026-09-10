import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { huntsTable } from "./hunt";
import { usersTable } from "./user";

export const huntBadgeEnum = pgEnum("hunt_badge_enum", [
  "EXPLORER",
  "PATHFINDER",
  "TREASURE_HUNTER",
  "LEGEND",
]);

export const huntCompletionsTable = pgTable("hunt_completions", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),

  huntId: uuid("hunt_id")
    .references(() => huntsTable.id)
    .notNull(),

  score: integer("score").notNull(),
  xpEarned: integer("xp_earned").notNull(),
  badge: huntBadgeEnum("badge").notNull(),
  questionCount: integer("question_count").notNull(),

  completedAt: timestamp("completed_at").defaultNow(),
});
