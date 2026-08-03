import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_open_source_badge_primary_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_open_source_badge_secondary_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_two_column_vertical_alignment" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_open_source_badge_primary_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_open_source_badge_secondary_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_vertical_alignment" AS ENUM('start', 'center', 'end');
  CREATE TABLE "pages_blocks_open_source" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"text" jsonb,
  	"show_accent_line" boolean DEFAULT true,
  	"badge_primary_label" varchar,
  	"badge_primary_enable_link" boolean,
  	"badge_primary_link_type" "enum_pages_blocks_open_source_badge_primary_link_type" DEFAULT 'reference',
  	"badge_primary_link_new_tab" boolean,
  	"badge_primary_link_url" varchar,
  	"badge_secondary_label" varchar,
  	"badge_secondary_enable_link" boolean,
  	"badge_secondary_link_type" "enum_pages_blocks_open_source_badge_secondary_link_type" DEFAULT 'reference',
  	"badge_secondary_link_new_tab" boolean,
  	"badge_secondary_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vertical_alignment" "enum_pages_blocks_two_column_vertical_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_open_source" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"text" jsonb,
  	"show_accent_line" boolean DEFAULT true,
  	"badge_primary_label" varchar,
  	"badge_primary_enable_link" boolean,
  	"badge_primary_link_type" "enum__pages_v_blocks_open_source_badge_primary_link_type" DEFAULT 'reference',
  	"badge_primary_link_new_tab" boolean,
  	"badge_primary_link_url" varchar,
  	"badge_secondary_label" varchar,
  	"badge_secondary_enable_link" boolean,
  	"badge_secondary_link_type" "enum__pages_v_blocks_open_source_badge_secondary_link_type" DEFAULT 'reference',
  	"badge_secondary_link_new_tab" boolean,
  	"badge_secondary_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"vertical_alignment" "enum__pages_v_blocks_two_column_vertical_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_open_source" ADD CONSTRAINT "pages_blocks_open_source_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column" ADD CONSTRAINT "pages_blocks_two_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_open_source" ADD CONSTRAINT "_pages_v_blocks_open_source_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_column" ADD CONSTRAINT "_pages_v_blocks_two_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_open_source_order_idx" ON "pages_blocks_open_source" USING btree ("_order");
  CREATE INDEX "pages_blocks_open_source_parent_id_idx" ON "pages_blocks_open_source" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_open_source_path_idx" ON "pages_blocks_open_source" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_column_order_idx" ON "pages_blocks_two_column" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_column_parent_id_idx" ON "pages_blocks_two_column" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_column_path_idx" ON "pages_blocks_two_column" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_open_source_order_idx" ON "_pages_v_blocks_open_source" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_open_source_parent_id_idx" ON "_pages_v_blocks_open_source" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_open_source_path_idx" ON "_pages_v_blocks_open_source" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_column_order_idx" ON "_pages_v_blocks_two_column" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_column_parent_id_idx" ON "_pages_v_blocks_two_column" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_column_path_idx" ON "_pages_v_blocks_two_column" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_open_source" CASCADE;
  DROP TABLE "pages_blocks_two_column" CASCADE;
  DROP TABLE "_pages_v_blocks_open_source" CASCADE;
  DROP TABLE "_pages_v_blocks_two_column" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_open_source_badge_primary_link_type";
  DROP TYPE "public"."enum_pages_blocks_open_source_badge_secondary_link_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_vertical_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_open_source_badge_primary_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_open_source_badge_secondary_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_vertical_alignment";`)
}
