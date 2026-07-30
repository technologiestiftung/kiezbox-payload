import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   ALTER TABLE "pages_blocks_card_block_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_card_block_cards_icon";
  CREATE TYPE "public"."enum_pages_blocks_card_block_cards_icon" AS ENUM('shield', 'sun', 'network', 'circuitBoard', 'microchip');
  UPDATE "pages_blocks_card_block_cards" SET "icon" = 'shield' WHERE "icon" NOT IN ('shield', 'sun', 'network', 'circuitBoard', 'microchip');
  ALTER TABLE "pages_blocks_card_block_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_card_block_cards_icon" USING "icon"::"public"."enum_pages_blocks_card_block_cards_icon";
  ALTER TABLE "_pages_v_blocks_card_block_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_card_block_cards_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_card_block_cards_icon" AS ENUM('shield', 'sun', 'network', 'circuitBoard', 'microchip');
  UPDATE "_pages_v_blocks_card_block_cards" SET "icon" = 'shield' WHERE "icon" NOT IN ('shield', 'sun', 'network', 'circuitBoard', 'microchip');
  ALTER TABLE "_pages_v_blocks_card_block_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_card_block_cards_icon" USING "icon"::"public"."enum__pages_v_blocks_card_block_cards_icon";
  ALTER TABLE "pages_blocks_card_block_cards" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_card_block_cards" DROP COLUMN "title";`);
}

export async function down({
	db,
	payload,
	req,
}: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   ALTER TABLE "pages_blocks_card_block_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_card_block_cards_icon";
  CREATE TYPE "public"."enum_pages_blocks_card_block_cards_icon" AS ENUM('star', 'heart', 'shield', 'check');
  ALTER TABLE "pages_blocks_card_block_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_card_block_cards_icon" USING "icon"::"public"."enum_pages_blocks_card_block_cards_icon";
  ALTER TABLE "_pages_v_blocks_card_block_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_card_block_cards_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_card_block_cards_icon" AS ENUM('star', 'heart', 'shield', 'check');
  ALTER TABLE "_pages_v_blocks_card_block_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_card_block_cards_icon" USING "icon"::"public"."enum__pages_v_blocks_card_block_cards_icon";
  ALTER TABLE "pages_blocks_card_block_cards" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_card_block_cards" ADD COLUMN "title" varchar;`);
}
