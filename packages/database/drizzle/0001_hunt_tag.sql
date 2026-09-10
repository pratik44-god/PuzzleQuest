CREATE TYPE "public"."hunt_tag_enum" AS ENUM('ADVENTURE', 'MYSTERY', 'PIRATES', 'FANTASY');--> statement-breakpoint
ALTER TABLE "hunts" ADD COLUMN "tag" "hunt_tag_enum" DEFAULT 'ADVENTURE' NOT NULL;
