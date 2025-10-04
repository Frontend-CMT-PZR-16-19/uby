import { defineField, defineType } from 'sanity'

export const courseType = defineType({
  name: 'course',
  title: 'Kurs',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kurs Başlığı',
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
      title: 'Kısa Açıklama',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'İçerik',
      type: 'blockContent',
    }),
    defineField({
      name: 'courseObjectives',
      title: 'Kurs Amaçları ve Hedefleri',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Kursun amaç ve hedeflerini liste olarak ekleyin',
    }),
    defineField({
      name: 'modules',
      title: 'Eğitim Modülleri',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Modül Başlığı',
            type: 'string',
          },
          {
            name: 'description',
            title: 'Modül Açıklaması',
            type: 'text',
          },
        ],
      }],
      description: 'Eğitim programı modüllerini ekleyin',
    }),
    defineField({
      name: 'targetAudience',
      title: 'Hedef Kitle',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Kurs kimler için uygundur? (liste olarak)',
    }),
    defineField({
      name: 'materials',
      title: 'Eğitim Materyalleri',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Eğitimde kullanılacak materyaller',
    }),
    defineField({
      name: 'support',
      title: 'Ek Destekler',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Eğitim sonrası verilen destekler',
    }),
    defineField({
      name: 'certificationCriteria',
      title: 'Sertifika Kriterleri',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Sertifika alma koşulları',
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
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: {type: 'courseCategory'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Fiyat',
      type: 'number',
    }),
    defineField({
      name: 'duration',
      title: 'Süre (Saat)',
      type: 'number',
    }),
    defineField({
      name: 'level',
      title: 'Seviye',
      type: 'string',
      options: {
        list: [
          {title: 'Başlangıç', value: 'beginner'},
          {title: 'Orta', value: 'intermediate'},
          {title: 'İleri', value: 'advanced'},
        ],
      },
    }),
    defineField({
      name: 'instructor',
      title: 'Eğitmen',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif mi?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      media: 'image',
    },
    prepare(selection) {
      const {category} = selection
      return {...selection, subtitle: category && `Kategori: ${category}`}
    },
  },
})
