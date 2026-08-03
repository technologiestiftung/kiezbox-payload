import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_two_column" ADD COLUMN "reverse_columns" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_two_column" ADD COLUMN "reverse_columns" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_open_source" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_open_source" DROP COLUMN "eyebrow";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_open_source" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_open_source" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_two_column" DROP COLUMN "reverse_columns";
  ALTER TABLE "_pages_v_blocks_two_column" DROP COLUMN "reverse_columns";`)
}
