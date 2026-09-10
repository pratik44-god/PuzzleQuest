CREATE TYPE "public"."user_type_enum" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."difficulty_type_enum" AS ENUM('EASY', 'MEDIUM', 'HARD');--> statement-breakpoint
CREATE TYPE "public"."hunt_status_enum" AS ENUM('DRAFT', 'PUBLISHED');--> statement-breakpoint
CREATE TYPE "public"."question_type_enum" AS ENUM('TEXT', 'IMAGE');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"google_id" varchar,
	"full_name" varchar(80) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"profile_image_url" text,
	"role" "user_type_enum" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "hunts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(60) NOT NULL,
	"description" varchar(300) NOT NULL,
	"image" text NOT NULL,
	"difficulty" "difficulty_type_enum" NOT NULL,
	"status" "hunt_status_enum" DEFAULT 'DRAFT' NOT NULL,
	"creators_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "huntsQuestion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_type" "question_type_enum" NOT NULL,
	"question" varchar NOT NULL,
	"answer" varchar(20) NOT NULL,
	"hints" text[],
	"hunt_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"question_index" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hunts" ADD CONSTRAINT "hunts_creators_id_users_id_fk" FOREIGN KEY ("creators_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "huntsQuestion" ADD CONSTRAINT "huntsQuestion_hunt_id_hunts_id_fk" FOREIGN KEY ("hunt_id") REFERENCES "public"."hunts"("id") ON DELETE no action ON UPDATE no action;