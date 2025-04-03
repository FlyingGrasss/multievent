import { defineField, defineType } from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Artist Name',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true // Still enable smart cropping
      },
      validation: (Rule) => Rule.required()
    })
  ]
})