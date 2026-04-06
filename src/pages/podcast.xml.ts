import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { cleanSlug } from '~/utils/permalinks';

export async function GET(context: APIContext) {
  const allPosts = await getCollection('post');

  const podcastPosts = allPosts
    .filter((post) => {
      const cat = post.data.category?.toLowerCase?.() ?? '';
      const audio = (post.data as Record<string, unknown>).audio as string | undefined;
      return cat === 'podcast' && !post.data.draft && !!audio;
    })
    .sort((a, b) => {
      const da = new Date(a.data.publishDate ?? 0).getTime();
      const db = new Date(b.data.publishDate ?? 0).getTime();
      return db - da;
    });

  const siteUrl = context.site?.toString().replace(/\/$/, '') ?? 'https://hongjunqiu.win';

  return rss({
    title: '科技早知道 — 每日科技播客',
    description: '每天 5 分钟，掌握科技圈大小事',
    site: context.site!,
    items: podcastPosts.map((post) => {
      const slug = cleanSlug(post.id);
      const audio = (post.data as Record<string, unknown>).audio as string | undefined;
      const audioSize = (post.data as Record<string, unknown>).audioSize as number | undefined;
      const audioDuration = (post.data as Record<string, unknown>).audioDuration as number | undefined;
      const audioUrl = audio ? `${siteUrl}${audio}` : '';
      const durationMM = audioDuration ? `${Math.floor(audioDuration / 60)}:${String(audioDuration % 60).padStart(2, '0')}` : '8:00';
      return {
        title: post.data.title ?? '',
        pubDate: new Date(post.data.publishDate ?? Date.now()),
        link: `/${slug}`,
        description: post.data.excerpt || post.data.title || '每日科技播客',
        customData: audioUrl
          ? `<enclosure url="${audioUrl}" length="${audioSize || 5242880}" type="audio/mpeg"/>
        <itunes:duration>${durationMM}</itunes:duration>
        <itunes:episodeType>full</itunes:episodeType>`
          : '',
      };
    }),
    customData: `<language>zh-cn</language>
      <itunes:type>episodic</itunes:type>
      <itunes:author>科技早知道</itunes:author>
      <itunes:owner>
        <itunes:name>科技早知道</itunes:name>
        <itunes:email>podcast@hongjunqiu.win</itunes:email>
      </itunes:owner>
      <itunes:image href="${siteUrl}/images/podcast-cover.png"/>
      <itunes:category text="Technology"/>
      <itunes:explicit>false</itunes:explicit>`,
    xmlns: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
    },
  });
}
