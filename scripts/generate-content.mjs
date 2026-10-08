import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputDir = path.join(root, 'content');
const nicheSets = [
  {
    category: 'AI & Productivity',
    keywords: ['AI workflows', 'productivity systems', 'automation tools'],
    angle: 'practical systems that save time, reduce friction, and improve output'
  },
  {
    category: 'Side Hustles',
    keywords: ['make money online', 'side income', 'digital income'],
    angle: 'low-cost business ideas that can grow without a big upfront budget'
  },
  {
    category: 'Personal Finance',
    keywords: ['budgeting', 'cash flow', 'smart saving'],
    angle: 'simple financial habits that improve stability and confidence'
  },
  {
    category: 'Remote Work',
    keywords: ['remote jobs', 'digital nomad', 'work from home'],
    angle: 'realistic ways to build a better remote-work lifestyle'
  },
  {
    category: 'Health & Energy',
    keywords: ['focus', 'energy habits', 'sleep optimization'],
    angle: 'easy adjustments that improve energy and consistency'
  }
];

const articles = [];

for (const [nicheIndex, niche] of nicheSets.entries()) {
  for (let i = 0; i < 2; i += 1) {
    const articleNumber = i + 1;
    const title = `${niche.category} Guide ${articleNumber}: ${niche.angle}`;
    const slug = `${niche.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${articleNumber}`;
    const excerpt = `Useful, practical ideas in ${niche.category.toLowerCase()} that help readers build better habits, improve focus, and create real momentum.`;
    const body = [
      `Most people search for ${niche.keywords[0]} because they want clear answers without hype or noise.`,
      `A useful first step is to define what success looks like in plain terms. This is especially important in ${niche.category.toLowerCase()} because readers usually want a simple system they can trust.`,
      `The best approach is not to chase every trend. It is to build a repeatable routine that is realistic, measurable, and easy to maintain.`,
      `Small wins matter. They create momentum, and momentum leads to better habits, stronger execution, and more sustainable long-term progress.`,
      `This guide explains a practical framework that readers can use right away while naturally creating useful SEO coverage around ${niche.keywords.join(', ')}.`
    ];

    articles.push({
      id: articles.length + 1,
      title,
      slug,
      category: niche.category,
      excerpt,
      keywords: niche.keywords,
      publishDate: new Date(Date.now() - (nicheIndex + 1 + i) * 86400000).toISOString().split('T')[0],
      body,
      affiliate: [
        'Beginner-friendly tool recommendation',
        'Simple budget option',
        'Starter checklist or template'
      ]
    });
  }
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(path.join(outputDir, 'articles.json'), JSON.stringify({ generatedAt: new Date().toISOString(), articles }, null, 2));

console.log(`Generated ${articles.length} article records.`);
