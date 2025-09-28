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
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        }),
        defineField({
            name: 'description',
            type: 'text',
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
        })
    ],
})
