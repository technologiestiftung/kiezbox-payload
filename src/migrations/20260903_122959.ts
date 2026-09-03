import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_media_block_content_width" AS ENUM('balanced', 'contentLarge', 'mediaLarge');
  CREATE TYPE "public"."enum__pages_v_blocks_content_media_block_content_width" AS ENUM('balanced', 'contentLarge', 'mediaLarge');
  ALTER TABLE "pages_blocks_content_media_block" ADD COLUMN "content_width" "enum_pages_blocks_content_media_block_content_width" DEFAULT 'balanced';
  ALTER TABLE "_pages_v_blocks_content_media_block" ADD COLUMN "content_width" "enum__pages_v_blocks_content_media_block_content_width" DEFAULT 'balanced';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_media_block" DROP COLUMN "content_width";
  ALTER TABLE "_pages_v_blocks_content_media_block" DROP COLUMN "content_width";
  DROP TYPE "public"."enum_pages_blocks_content_media_block_content_width";
  DROP TYPE "public"."enum__pages_v_blocks_content_media_block_content_width";`)
}
