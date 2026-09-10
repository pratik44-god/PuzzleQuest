CREATE TYPE "public"."hunt_badge_enum" AS ENUM('EXPLORER', 'PATHFINDER', 'TREASURE_HUNTER', 'LEGEND');

CREATE TABLE "hunt_completions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"hunt_id" uuid NOT NULL,
	"score" integer NOT NULL,
	"xp_earned" integer NOT NULL,
	"badge" "hunt_badge_enum" NOT NULL,
	"question_count" integer NOT NULL,
	"completed_at" timestamp DEFAULT now()
);

ALTER TABLE "hunt_completions" ADD CONSTRAINT "hunt_completions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "hunt_completions" ADD CONSTRAINT "hunt_completions_hunt_id_hunts_id_fk" FOREIGN KEY ("hunt_id") REFERENCES "public"."hunts"("id") ON DELETE no action ON UPDATE no action;
