import { ConfettiIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const campaignType = defineType({
    name: 'campaign',
    title: 'Kampanya',
    type: 'document',
    icon: ConfettiIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Başlık',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        }),
        defineField({
            name: 'description',
            title: 'Açıklama',
            type: 'text',
        }),
       defineField({
      name: 'image',
      title: 'Kurs Resmi',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    ],
})