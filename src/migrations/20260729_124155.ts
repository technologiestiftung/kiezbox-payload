import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	// eyebrow column already added manually via dev push
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   ALTER TABLE "pages_blocks_card_block" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_card_block" DROP COLUMN "eyebrow";`);
}
