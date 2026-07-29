import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <section className="container py-2">
      <div className="grid lg:grid-cols-12 items-stretch gap-12 min-h-141">
        {/* Content */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Image */}
        <div className="lg:col-span-4 h-full">
          <Media
            resource={media}
            priority
            className="h-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
