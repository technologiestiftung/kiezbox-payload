import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
}

type LexicalNode = { type: string; version: number; [key: string]: unknown }

const paragraph = (text: string, format = 0) =>
  ({
    type: 'paragraph',
    children: [
      {
        type: 'text',
        detail: 0,
        format,
        mode: 'normal',
        style: '',
        text,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }) as const

const heading = (text: string, tag: 'h1' | 'h2' | 'h3' | 'h4') =>
  ({
    type: 'heading',
    children: [
      {
        type: 'text',
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    tag,
    version: 1,
  }) as const

const richText = (children: LexicalNode[]) =>
  ({
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as const

const cardContent = (title: string, body: string) =>
  richText([heading(title, 'h3'), paragraph(body)])

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    title: 'Home',
    hero: {
      type: 'mediumImpact',
      media: heroImage.id,
      richText: richText([
        heading('Kiezbox – Deine Autarke Notrufbox', 'h1'),
        paragraph(
          'Energieautarke Krisenkommunikation für deinen Kiez. Notruf auch bei Stromausfall.',
        ),
      ]),
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Wie es funktioniert',
            url: '/#wie-es-funktioniert',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Jetzt informieren',
            url: '/contact',
          },
        },
      ],
    },
    layout: [
      {
        blockName: 'Technische Ausstattung',
        blockType: 'cardBlock',
        eyebrow: 'Technische Ausstattung',
        title: 'Entwickelt für den Extremfall',
        cards: [
          {
            icon: 'sun',
            content: cardContent(
              'Solarbetrieben',
              '100% energieautark durch integrierte Pufferbatterien und wetterfeste Solarzellen auf der Oberseite. Unabhängig vom Stromnetz bis zu 96h Notfallbetrieb.',
            ),
          },
          {
            icon: 'network',
            content: cardContent(
              'Wifi-Mesh-Netzwerk',
              'Zuverlässige, dezentrale Kommunikation ohne Mobilfunknetz. Jede Kiezbox agiert als Relais zur Reichweitenverlängerung.',
            ),
          },
          {
            icon: 'shield',
            content: cardContent(
              'Wetterfest & Robust',
              'IP67-zertifiziert für den permanenten Außeneinsatz im öffentlichen Raum. Integrierte Sensorik überwacht den Zustand jeder Box in Echtzeit.',
            ),
          },
          {
            icon: 'network',
            content: cardContent(
              'Einfache Nutzung',
              'Einfacher Zugang per Public Access Point Kiezbox Notfall WLAN. Das WLAN kann dauerhaft aktiv sein; im Extremfall wird der Traffic durch Blacklisting gedrosselt, um Notrufe zu priorisieren.',
            ),
          },
          {
            icon: 'microchip',
            content: cardContent(
              'Mehrsprachige App',
              'Die Kiezbox-App ist mehrsprachig und mit jedem internetfähigen Device nutzbar. Neben dem Notruf zeigt sie auch weitere Informationen wie Sammelstellen, Erste-Hilfe-Tipps und aktuelle Lagemeldungen.',
            ),
          },
          {
            icon: 'circuitBoard',
            content: cardContent(
              'Offene Technologie',
              'Basiert auf Meshtastic für die LoRa-Langstreckenkommunikation und OpenWRT als Router-Firmware, alles Open Source. Wir setzen auf Transparenz, Community-Support und einfache Wartung.',
            ),
          },
        ],
      },
      {
        blockName: 'Testimonial',
        blockType: 'content',
        columns: [
          {
            size: 'full',
            enableLink: false,
            richText: richText([
              paragraph(
                '„Kiezbox zeigt, wie digitale Zivilgesellschaft konkret Leben retten kann – ein Vorbild für resiliente Stadtinfrastruktur."',
                2,
              ),
              paragraph('— Berliner Feuerwehr'),
            ]),
          },
        ],
      },
      {
        blockName: 'Kommune CTA',
        blockType: 'cta',
        richText: richText([
          heading('Informiere dich über eine Umsetzung in deiner Kommune', 'h3'),
        ]),
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Kontakt',
              url: '/contact',
            },
          },
        ],
      },
    ],
    meta: {
      title: 'Kiezbox – Deine Autarke Notrufbox',
      description:
        'Energieautarke Krisenkommunikation für deinen Kiez. Notruf auch bei Stromausfall.',
      image: heroImage.id,
    },
  }
}
