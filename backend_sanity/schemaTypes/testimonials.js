import { defineField, defineType } from 'sanity'

export const testimonials = defineType({
    name: 'testimonials',
    title: 'Testimonials',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
        }),
        defineField({
            name: 'imageurl',
            title: 'ImgURL',
            type: 'image',
            options: {
                hotspot: true // hot-spot specifies what the user wants preserved when the image needs to be cropped additionally in a front-end
            }
        }),
        defineField({
            name: 'feedback',
            title: 'Feedback',
            type: 'string',
        }),
    ],
})