import RichText from '@/components/RichText'
import type { CardBlock as CardBlockProps } from '@/payload-types'
import { Check, Heart, Shield, Star } from 'lucide-react'
import { FC } from 'react'

const iconMap = { star: Star, heart: Heart, shield: Shield, check: Check } as const

type Props = CardBlockProps

export const CardBlock: FC<Props> = ({ title, subtitle, cards }) => {
  return (
    <div className="CardBlock-root bg-card">
      <div className="container my-16">
        <div className="p-6">
          
          {subtitle && <p>{subtitle}</p>}

          <h2>{title}</h2>

          <div className="grid grid-cols-4 lg:grid-cols-12 gap-6">
            {cards?.map((card, i) => {
              const Icon = card.icon ? iconMap[card.icon as keyof typeof iconMap] : Star

              return (
                <div
                  key={card.id ?? i}
                  className="col-span-4 md:col-span-2 lg:col-span-4 border rounded-lg p-6"
                >
                  <Icon className="mb-3" />
                  <h3>{card.title}</h3>
                  <RichText data={card.content} enableGutter={false} enableProse={false} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
