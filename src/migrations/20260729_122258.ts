import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_card_block_cards_icon" AS ENUM('star', 'heart', 'shield', 'check');
  CREATE TYPE "public"."enum_pages_blocks_event_block_events_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_card_block_cards_icon" AS ENUM('star', 'heart', 'shield', 'check');
  CREATE TYPE "public"."enum__pages_v_blocks_event_block_events_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_card_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_card_block_cards_icon",
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_card_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_event_block_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"tag" varchar,
  	"date" timestamp(3) with time zone,
  	"location" varchar,
  	"content" jsonb,
  	"link_type" "enum_pages_blocks_event_block_events_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_event_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_card_block_cards_icon",
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_event_block_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"tag" varchar,
  	"date" timestamp(3) with time zone,
  	"location" varchar,
  	"content" jsonb,
  	"link_type" "enum__pages_v_blocks_event_block_events_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_event_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_card_block_cards" ADD CONSTRAINT "pages_blocks_card_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_block" ADD CONSTRAINT "pages_blocks_card_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_block_events" ADD CONSTRAINT "pages_blocks_event_block_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_event_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_block" ADD CONSTRAINT "pages_blocks_event_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_block_cards" ADD CONSTRAINT "_pages_v_blocks_card_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_block" ADD CONSTRAINT "_pages_v_blocks_card_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_block_events" ADD CONSTRAINT "_pages_v_blocks_event_block_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_event_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_block" ADD CONSTRAINT "_pages_v_blocks_event_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_card_block_cards_order_idx" ON "pages_blocks_card_block_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_block_cards_parent_id_idx" ON "pages_blocks_card_block_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_block_order_idx" ON "pages_blocks_card_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_block_parent_id_idx" ON "pages_blocks_card_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_block_path_idx" ON "pages_blocks_card_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_event_block_events_order_idx" ON "pages_blocks_event_block_events" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_block_events_parent_id_idx" ON "pages_blocks_event_block_events" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_block_order_idx" ON "pages_blocks_event_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_block_parent_id_idx" ON "pages_blocks_event_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_block_path_idx" ON "pages_blocks_event_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_block_cards_order_idx" ON "_pages_v_blocks_card_block_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_block_cards_parent_id_idx" ON "_pages_v_blocks_card_block_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_block_order_idx" ON "_pages_v_blocks_card_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_block_parent_id_idx" ON "_pages_v_blocks_card_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_block_path_idx" ON "_pages_v_blocks_card_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_event_block_events_order_idx" ON "_pages_v_blocks_event_block_events" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_block_events_parent_id_idx" ON "_pages_v_blocks_event_block_events" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_block_order_idx" ON "_pages_v_blocks_event_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_block_parent_id_idx" ON "_pages_v_blocks_event_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_block_path_idx" ON "_pages_v_blocks_event_block" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_card_block_cards" CASCADE;
  DROP TABLE "pages_blocks_card_block" CASCADE;
  DROP TABLE "pages_blocks_event_block_events" CASCADE;
  DROP TABLE "pages_blocks_event_block" CASCADE;
  DROP TABLE "_pages_v_blocks_card_block_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_block" CASCADE;
  DROP TABLE "_pages_v_blocks_event_block_events" CASCADE;
  DROP TABLE "_pages_v_blocks_event_block" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_card_block_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_event_block_events_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_block_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_event_block_events_link_type";`)
}
