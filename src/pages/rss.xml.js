import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_NAME, SITE_DESCRIPTION } from '../utils/constants';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title:       SITE_NAME,
    description: SITE_DESCRIPTION,
    site:        context.site,
    items: blog.map(post => ({
      title:       post.data.title,
      pubDate:     post.data.datePublished,
      description: post.data.description,
      link:        `/blog/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
