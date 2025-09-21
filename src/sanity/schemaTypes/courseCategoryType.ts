import { defineField, defineType } from 'sanity'

export const courseCategoryType = defineType({
  name: 'courseCategory',
  title: 'Kurs Kategorisi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kategori Adı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'İkon',
      type: 'string',
      description: 'Lucide icon adı (örn: Code, Monitor, vb.)',
    }),
    defineField({
      name: 'color',
      title: 'Renk',
      type: 'string',
      options: {
        list: [
          {title: 'Mavi', value: 'blue'},
          {title: 'Yeşil', value: 'green'},
          {title: 'Mor', value: 'purple'},
          {title: 'Turuncu', value: 'orange'},
          {title: 'Kırmızı', value: 'red'},
          {title: 'Sarı', value: 'yellow'},
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
      description: 'Kategori sıralaması (küçük sayılar önce görünür)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
