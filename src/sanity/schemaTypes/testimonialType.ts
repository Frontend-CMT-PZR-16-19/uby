import { defineType, defineField } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Kullanıcı Yorumu',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'role',
      title: 'Meslek/Pozisyon',
      type: 'string',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'company',
      title: 'Şirket',
      type: 'string',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'course',
      title: 'Alınan Kurs',
      type: 'string',
      validation: (Rule) => Rule.max(150)
    }),
    defineField({
      name: 'text',
      title: 'Yorum Metni',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(500)
    }),
    defineField({
      name: 'year',
      title: 'Yıl',
      type: 'string',
      validation: (Rule) => Rule.regex(/^(20[0-9]{2}|19[0-9]{2})$/, {
        name: 'year',
        invert: false
      })
    }),
    defineField({
      name: 'rating',
      title: 'Değerlendirme (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5)
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıkarılsın mı?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'image',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatif Metin',
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'course',
      media: 'image'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle
      }
    }
  }
})
