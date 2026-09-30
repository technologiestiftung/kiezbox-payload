import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_bedarfsrechner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"eyebrow" varchar DEFAULT 'Bedarfsrechner',
  	"title" varchar DEFAULT 'Wie viele Kiezboxen braucht Ihr Gebiet?',
  	"area_label" varchar DEFAULT 'Fläche Ihres Zielgebiets (km²)',
  	"area_description" varchar DEFAULT 'Wie groß ist das Gebiet, der Marktplatz oder die Stadt, die Sie abdecken möchten?',
  	"mode_label" varchar DEFAULT 'Was möchten Sie abdecken?',
  	"mode_description" varchar DEFAULT 'Wählen Sie, welche Verbindung Sie abdecken möchten: den Mesh-Backbone zwischen den Kiezboxen oder das öffentliche WLAN für Bürger:innen.',
  	"mesh_label" varchar DEFAULT 'Mesh-Knoten',
  	"mesh_description" varchar DEFAULT 'Richtfunk · max. 1 km',
  	"public_wifi_label" varchar DEFAULT 'Public-Wifi',
  	"public_wifi_description" varchar DEFAULT 'Bürger:innen-WLAN · max. 400 m',
  	"result_unit" varchar DEFAULT 'Kiezboxen',
  	"disclaimer" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bedarfsrechner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"eyebrow" varchar DEFAULT 'Bedarfsrechner',
  	"title" varchar DEFAULT 'Wie viele Kiezboxen braucht Ihr Gebiet?',
  	"area_label" varchar DEFAULT 'Fläche Ihres Zielgebiets (km²)',
  	"area_description" varchar DEFAULT 'Wie groß ist das Gebiet, der Marktplatz oder die Stadt, die Sie abdecken möchten?',
  	"mode_label" varchar DEFAULT 'Was möchten Sie abdecken?',
  	"mode_description" varchar DEFAULT 'Wählen Sie, welche Verbindung Sie abdecken möchten: den Mesh-Backbone zwischen den Kiezboxen oder das öffentliche WLAN für Bürger:innen.',
  	"mesh_label" varchar DEFAULT 'Mesh-Knoten',
  	"mesh_description" varchar DEFAULT 'Richtfunk · max. 1 km',
  	"public_wifi_label" varchar DEFAULT 'Public-Wifi',
  	"public_wifi_description" varchar DEFAULT 'Bürger:innen-WLAN · max. 400 m',
  	"result_unit" varchar DEFAULT 'Kiezboxen',
  	"disclaimer" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_bedarfsrechner" ADD CONSTRAINT "pages_blocks_bedarfsrechner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bedarfsrechner" ADD CONSTRAINT "_pages_v_blocks_bedarfsrechner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_bedarfsrechner_order_idx" ON "pages_blocks_bedarfsrechner" USING btree ("_order");
  CREATE INDEX "pages_blocks_bedarfsrechner_parent_id_idx" ON "pages_blocks_bedarfsrechner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bedarfsrechner_path_idx" ON "pages_blocks_bedarfsrechner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_bedarfsrechner_order_idx" ON "_pages_v_blocks_bedarfsrechner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bedarfsrechner_parent_id_idx" ON "_pages_v_blocks_bedarfsrechner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bedarfsrechner_path_idx" ON "_pages_v_blocks_bedarfsrechner" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_bedarfsrechner" CASCADE;
  DROP TABLE "_pages_v_blocks_bedarfsrechner" CASCADE;`)
}
