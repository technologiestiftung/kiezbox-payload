import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_link_appearance" AS ENUM('default', 'link');
  ALTER TABLE "header_nav_items" ADD COLUMN "link_appearance" "enum_header_nav_items_link_appearance" DEFAULT 'default';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_nav_items" DROP COLUMN "link_appearance";
  DROP TYPE "public"."enum_header_nav_items_link_appearance";`)
}
