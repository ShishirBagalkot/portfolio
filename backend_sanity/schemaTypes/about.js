import { defineField, defineType } from 'sanity'

export const about = defineType({
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
        defineField({
            name:'title',
            title:'Title',
            type:'string'
        }),
        defineField({
            name:'description',
            title:'Description',
            type:'string'
        }),
        defineField({
            name: 'imageurl',
            title: 'ImgURL',
            type: 'image',
            options: {
                hotspot: true // hot-spot specifies what the user wants preserved when the image needs to be cropped additionally in a front-end
            }
        })
    ],
})