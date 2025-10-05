import { defineType, defineField } from 'sanity'

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Yazısı / Haber',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Özet',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200)
    }),
    defineField({
      name: 'content',
      title: 'İçerik',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternatif Metin'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'author',
      title: 'Yazar',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Blog', value: 'blog' },
          { title: 'Haber', value: 'news' },
          { title: 'Teknoloji', value: 'technology' },
          { title: 'Eğitim', value: 'education' },
          { title: 'Kurumsal', value: 'corporate' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Ana Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatif Metin'
        }
      ]
    }),
    defineField({
      name: 'readTime',
      title: 'Okuma Süresi (dakika)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(60)
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıkarılsın mı?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'seo',
      title: 'SEO Ayarları',
      type: 'object',
      fields: [
        {
          name: 'metaDescription',
          title: 'Meta Açıklama',
          type: 'text',
          rows: 2
        },
        {
          name: 'keywords',
          title: 'Anahtar Kelimeler',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image'
    },
    prepare(selection) {
      const { title, author } = selection
      return {
        title: title,
        subtitle: author ? `Yazar: ${author}` : 'Yazar belirtilmemiş'
      }
    }
  }
})
