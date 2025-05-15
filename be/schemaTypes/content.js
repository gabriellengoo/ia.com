export default {
  name: 'mediaContent',
  type: 'document',
  title: 'Media Content',
  fields: [
    {
      title: 'Media Content',
      name: 'title',
      type: 'string',
    },
    {
      name: 'mediaItems',
      type: 'array',
      title: 'Mixed Media (Images + Vimeo) (Left)',
      of: [
        { type: 'image' },
        {
          type: 'object',
          name: 'vimeo',
          title: 'Vimeo Video',
          fields: [
            { name: 'vimeoUrl', type: 'url', title: 'Vimeo Embed URL' },
            { name: 'hoverImage', type: 'image', title: 'Hover Image' },
          ],
        },
      ],
    },
    {
      name: 'mediaItemsright',
      type: 'array',
      title: 'Mixed Media (Images + Vimeo) (Right)',
      of: [
        { type: 'image' },
        {
          type: 'object',
          name: 'vimeo',
          title: 'Vimeo Video',
          fields: [
            { name: 'vimeoUrl', type: 'url', title: 'Vimeo Embed URL' },
            { name: 'hoverImage', type: 'image', title: 'Hover Image' },
          ],
        },
      ],
    },
    {
      name: 'flashImages',
      type: 'array',
      title: 'Flash Images (Random Flashes)',
      of: [{ type: 'image' }],
      description: 'Images that will randomly flash on screen in random positions.',
    },
  ],
};
