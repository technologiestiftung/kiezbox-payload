import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" ADD COLUMN "anchor" varchar;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "anchor" varchar;
  ALTER TABLE "pages_blocks_content_media_block" ADD COLUMN "anchor" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "anchor" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "anchor" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "anchor" varchar;
  ALTER TABLE "pages_blocks_card_block" ADD COLUMN "anchor" varchar;
  ALTER TABLE "pages_blocks_event_block" ADD COLUMN "anchor" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "anchor" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "anchor" varchar;
  ALTER TABLE "_pages_v_blocks_content_media_block" ADD COLUMN "anchor" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "anchor" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "anchor" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "anchor" varchar;
  ALTER TABLE "_pages_v_blocks_card_block" ADD COLUMN "anchor" varchar;
  ALTER TABLE "_pages_v_blocks_event_block" ADD COLUMN "anchor" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" DROP COLUMN "anchor";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "anchor";
  ALTER TABLE "pages_blocks_content_media_block" DROP COLUMN "anchor";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "anchor";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "anchor";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "anchor";
  ALTER TABLE "pages_blocks_card_block" DROP COLUMN "anchor";
  ALTER TABLE "pages_blocks_event_block" DROP COLUMN "anchor";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "anchor";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "anchor";
  ALTER TABLE "_pages_v_blocks_content_media_block" DROP COLUMN "anchor";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "anchor";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "anchor";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "anchor";
  ALTER TABLE "_pages_v_blocks_card_block" DROP COLUMN "anchor";
  ALTER TABLE "_pages_v_blocks_event_block" DROP COLUMN "anchor";`)
}
