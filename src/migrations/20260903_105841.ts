import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_media_block" DROP COLUMN "media_caption";
  ALTER TABLE "_pages_v_blocks_content_media_block" DROP COLUMN "media_caption";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_media_block" ADD COLUMN "media_caption" varchar;
  ALTER TABLE "_pages_v_blocks_content_media_block" ADD COLUMN "media_caption" varchar;`)
}
