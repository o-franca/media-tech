const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const { Feed } = require('feed');

const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'blog', 'posts');
const BLOG_DIR = path.join(ROOT, 'blog');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');
const SITE_URL = 'https://mediaconsultant.ie';

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: false,
});

function readTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES_DIR, name), 'utf-8');
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IE', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateISO(dateStr) {
  return new Date(dateStr).toISOString().split('T')[0];
}

function extractFAQ(rawContent) {
  // Look for ## FAQ or ## Frequently Asked Questions section
  const faqMatch = rawContent.match(/^##\s+(?:FAQ|Frequently Asked Questions)\s*\n([\s\S]+?)(?=\n##\s[^#]|\n---|\Z)/m);
  if (!faqMatch) return [];

  const faqSection = faqMatch[1];
  const faqs = [];
  // Extract ### Question + following paragraph(s) as answer
  const parts = faqSection.split(/^###\s+/m).filter(Boolean);
  for (const part of parts) {
    const lines = part.trim().split('\n');
    const question = lines[0].replace(/\??\s*$/, '?').trim();
    const answer = lines.slice(1).join(' ').replace(/\n/g, ' ').trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}

function buildFAQSchema(faqs) {
  if (faqs.length === 0) return '';
  const items = faqs.map(faq => `{
                "@type": "Question",
                "name": "${faq.question.replace(/"/g, '\\"')}",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${faq.answer.replace(/"/g, '\\"')}"
                }
            }`).join(',\n            ');
  return `
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            ${items}
        ]
    }
    </script>`;
}

function getAllPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    const html = marked(content);
    const words = wordCount(content);
    const faqs = extractFAQ(content);
    return {
      ...data,
      content: html,
      rawContent: content,
      wordCount: words,
      readingTime: data.reading_time || Math.ceil(words / 250),
      faqs,
      file,
    };
  });
  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

function buildPost(post, template) {
  const url = `${SITE_URL}/blog/${post.slug}/`;
  const tagsHtml = (post.tags || [])
    .map(t => `<span class="blog-tag">${t}</span>`)
    .join('');
  const tagsJson = (post.tags || []).join(', ');
  const dateFormatted = formatDate(post.date);
  const dateISO = formatDateISO(post.date);

  let html = template
    .replace(/\{\{title\}\}/g, post.title)
    .replace(/\{\{description\}\}/g, post.description)
    .replace(/\{\{slug\}\}/g, post.slug)
    .replace(/\{\{url\}\}/g, url)
    .replace(/\{\{date\}\}/g, dateFormatted)
    .replace(/\{\{dateISO\}\}/g, dateISO)
    .replace(/\{\{author\}\}/g, post.author || 'Joao Franca')
    .replace(/\{\{category\}\}/g, post.category || '')
    .replace(/\{\{tags\}\}/g, tagsHtml)
    .replace(/\{\{tagsJson\}\}/g, tagsJson)
    .replace(/\{\{readingTime\}\}/g, String(post.readingTime))
    .replace(/\{\{wordCount\}\}/g, String(post.wordCount))
    .replace(/\{\{content\}\}/g, post.content)
    .replace(/\{\{faqSchema\}\}/g, buildFAQSchema(post.faqs || []));

  const outDir = path.join(BLOG_DIR, post.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(`  Built: blog/${post.slug}/index.html`);
}

function buildIndex(posts, template) {
  const cardsHtml = posts.map(post => `
        <a href="${post.slug}/" class="blog-card">
            <div class="blog-card-body">
                <span class="blog-card-category">${post.category || ''}</span>
                <h2 class="blog-card-title">${post.title}</h2>
                <p class="blog-card-desc">${post.description}</p>
                <div class="blog-card-meta">
                    <span>${formatDate(post.date)}</span>
                    <span>${post.readingTime} min read</span>
                </div>
            </div>
        </a>`).join('\n');

  const blogPostsSchema = posts.map(post => `{
            "@type": "BlogPosting",
            "headline": "${post.title.replace(/"/g, '\\"')}",
            "url": "${SITE_URL}/blog/${post.slug}/",
            "datePublished": "${formatDateISO(post.date)}"
        }`).join(',\n        ');

  let html = template
    .replace('{{posts}}', cardsHtml)
    .replace('{{blogPostsSchema}}', blogPostsSchema);

  fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), html);
  console.log('  Built: blog/index.html');
}

function updateSitemap(posts) {
  let xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');

  // Remove any previous blog entries
  xml = xml.replace(/\s*<url>\s*<loc>https:\/\/mediaconsultant\.ie\/blog\/[^]*?<\/url>/g, '');

  // Remove closing tag
  xml = xml.replace('</urlset>', '').trimEnd();

  // Add blog index
  xml += `\n  <url>
    <loc>${SITE_URL}/blog/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Add each post
  for (const post of posts) {
    xml += `\n  <url>
    <loc>${SITE_URL}/blog/${post.slug}/</loc>
    <lastmod>${formatDateISO(post.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  xml += '\n</urlset>\n';
  fs.writeFileSync(SITEMAP_PATH, xml);
  console.log('  Updated: sitemap.xml');
}

function buildRSS(posts) {
  const feed = new Feed({
    title: 'OF.MediaTech Blog',
    description: 'Insights on AI, communications, marketing strategy, and product building from Joao Franca',
    id: `${SITE_URL}/blog/`,
    link: `${SITE_URL}/blog/`,
    language: 'en-IE',
    copyright: `All rights reserved ${new Date().getFullYear()}, OF.MediaTech`,
    author: {
      name: 'Joao Franca',
      link: SITE_URL,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/blog/${post.slug}/`,
      link: `${SITE_URL}/blog/${post.slug}/`,
      description: post.description,
      date: new Date(post.date),
      author: [{ name: post.author || 'Joao Franca' }],
      category: (post.tags || []).map(t => ({ name: t })),
    });
  }

  fs.writeFileSync(path.join(BLOG_DIR, 'feed.xml'), feed.rss2());
  console.log('  Built: blog/feed.xml');
}

// Main
console.log('Building blog...\n');

const posts = getAllPosts();
console.log(`Found ${posts.length} posts\n`);

if (posts.length === 0) {
  console.log('No posts found. Skipping blog build.');
  process.exit(0);
}

const postTemplate = readTemplate('blog-post.html');
const indexTemplate = readTemplate('blog-index.html');

console.log('Generating post pages:');
for (const post of posts) {
  buildPost(post, postTemplate);
}

console.log('\nGenerating index:');
buildIndex(posts, indexTemplate);

console.log('\nUpdating sitemap:');
updateSitemap(posts);

console.log('\nGenerating RSS:');
buildRSS(posts);

// Minify CSS and JS
console.log('\nMinifying CSS & JS:');
const CleanCSS = require('clean-css');
const { minify: terserMinify } = require('terser');

const cssPath = path.join(ROOT, 'css', 'style.css');
const cssMinPath = path.join(ROOT, 'css', 'style.min.css');
const cssSource = fs.readFileSync(cssPath, 'utf-8');
const cssResult = new CleanCSS({ level: 2 }).minify(cssSource);
fs.writeFileSync(cssMinPath, cssResult.styles);
console.log(`  Minified: css/style.min.css (${Math.round(cssResult.stats.efficiency * 100)}% smaller)`);

const jsPath = path.join(ROOT, 'js', 'main.js');
const jsMinPath = path.join(ROOT, 'js', 'main.min.js');
const jsSource = fs.readFileSync(jsPath, 'utf-8');
terserMinify(jsSource).then(jsResult => {
  fs.writeFileSync(jsMinPath, jsResult.code);
  console.log('  Minified: js/main.min.js');
  console.log(`\nDone! Built ${posts.length} posts + index + sitemap + RSS + minified assets.`);
}).catch(err => {
  console.error('  Error minifying JS:', err.message);
  process.exit(1);
});
