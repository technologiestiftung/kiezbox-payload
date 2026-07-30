import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import type { EventBlock as EventBlockProps } from '@/payload-types'
import { FC } from 'react'

type Props = EventBlockProps

export const EventBlock: FC<Props> = ({ eyebrow, title, subtitle, events }) => {
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date))

  return (
    <div className="EventBlock-root bg-card">
      <div className="container py-16">
        <div className="p-6">
          <div className="max-w-3xl space-y-4 mb-8">
            {eyebrow && <p className="text-sm font-bold uppercase">{eyebrow}</p>}

            <h2 className="text-3xl font-bold">{title}</h2>

            {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="space-y-10">
            {events?.map((event, i) => (
              <article key={event.id ?? i} className="border-t-4 border-primary pt-8">
                <div className="flex flex-wrap items-center gap-4">
                  {event.date && (
                    <span className="border-4 border-violet-400 px-4 py-2 font-bold">
                      {formatDate(event.date)}
                    </span>
                  )}
                  {event.tag && (
                    <span className="bg-primary text-white px-5 py-2 font-semibold">
                      {event.tag}
                    </span>
                  )}

                  <h3 className="text-2xl font-bold">{event.title}</h3>
                </div>

                <div className="mt-8 max-w-4xl">
                  <RichText data={event.content} enableGutter={false} enableProse={false} />
                </div>

                <div className="mt-8 space-y-2">
                  {event.location && <p className="text-muted-foreground">📍 {event.location}</p>}

                  {event.link && <CMSLink {...event.link} />}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
