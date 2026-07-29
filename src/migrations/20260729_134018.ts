import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_media_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_media_block_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_media_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_media_block_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "pages_blocks_content_media_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_content_media_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_media_block_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_content_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_media_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_content_media_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_media_block_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "pages_blocks_content_media_block_links" ADD CONSTRAINT "pages_blocks_content_media_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_media_block" ADD CONSTRAINT "pages_blocks_content_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_media_block_links" ADD CONSTRAINT "_pages_v_blocks_content_media_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_media_block" ADD CONSTRAINT "_pages_v_blocks_content_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_media_block_links_order_idx" ON "pages_blocks_content_media_block_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_media_block_links_parent_id_idx" ON "pages_blocks_content_media_block_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_media_block_order_idx" ON "pages_blocks_content_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_media_block_parent_id_idx" ON "pages_blocks_content_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_media_block_path_idx" ON "pages_blocks_content_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_media_block_links_order_idx" ON "_pages_v_blocks_content_media_block_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_media_block_links_parent_id_idx" ON "_pages_v_blocks_content_media_block_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_media_block_order_idx" ON "_pages_v_blocks_content_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_media_block_parent_id_idx" ON "_pages_v_blocks_content_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_media_block_path_idx" ON "_pages_v_blocks_content_media_block" USING btree ("_path");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_media_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_media_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_media_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_content_media_block_links" CASCADE;
  DROP TABLE "pages_blocks_content_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_content_media_block_links" CASCADE;
  DROP TABLE "_pages_v_blocks_content_media_block" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_media_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_media_fk";
  
  DROP INDEX "pages_rels_media_id_idx";
  DROP INDEX "_pages_v_rels_media_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "media_id";
  DROP TYPE "public"."enum_pages_blocks_content_media_block_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_media_block_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_media_block_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_media_block_links_link_appearance";`)
}
