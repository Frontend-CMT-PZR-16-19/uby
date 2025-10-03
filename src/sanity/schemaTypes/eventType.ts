import { ConfettiIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const eventType = defineType({
    name: 'event',
    title: 'Etkinlik',
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
        defineField({
            name: "startDateTime",
            title: "Başlangıç Tarihi ve Saati",
            type: "datetime",
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                calendarTodayLabel: 'Today'
            }
        }),
        defineField({
            name: "endDateTime",
            title: "Bitiş Tarihi ve Saati",
            type: "datetime",
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                calendarTodayLabel: 'Today'
            }
        }),
        defineField({
            name: 'location',
            title: 'Konum',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'string',
        }),
    ],
})