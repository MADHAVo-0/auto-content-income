import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siteDir = path.join(root, 'site');
const articleDir = path.join(siteDir, 'article');
const contentPath = path.join(root, 'content', 'articles.json');

const { articles } = JSON.parse(readFileSync(contentPath, 'utf8'));

mkdirSync(siteDir, { recursive: true });
mkdirSync(articleDir, { recursive: true });

const styles = `
  :root {
    --bg: #07111f;
    --panel: #0f1d2d;
    --panel-2: #132b44;
    --text: #edf8ff;
    --muted: #abc0d4;
    --accent: #5eead4;
    --accent-2: #fbbf24;
    --border: rgba(255,255,255,0.08);
    --shadow: rgba(6, 17, 31, 0.4);
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: linear-gradient(180deg, #07111f 0%, #0d1c2a 100%);
    color: var(--text);
    line-height: 1.65;
  }
  a { color: var(--accent); text-decoration: none; }
  img { max-width: 100%; }
  .container { width: min(1120px, 90vw); margin: 0 auto; }
  header {
    background: rgba(7, 17, 31, 0.78);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 72px;
  }
  .brand {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }
  .nav-links {
    display: flex;
    gap: 1.2rem;
    color: var(--muted);
  }
  .hero { padding: 5rem 0 3rem; }
  .hero-grid {
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    gap: 2rem;
    align-items: center;
  }
  .eyebrow {
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
    font-size: 0.78rem;
  }
  h1 {
    font-size: clamp(2.3rem, 4vw, 4.5rem);
    line-height: 1.08;
    margin: 0.7rem 0 1rem;
  }
  h2 {
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    margin-bottom: 1.2rem;
  }
  p.lead, .card p, .article p, .article li {
    color: var(--muted);
  }
  .lead {
    font-size: 1.08rem;
    max-width: 62ch;
  }
  .cta-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }
  .button {
    display: inline-block;
    border-radius: 999px;
    padding: 0.9rem 1.35rem;
    font-weight: 700;
    transition: 0.2s ease;
  }
  .button.primary {
    background: var(--accent);
    color: #04232d;
  }
  .button.secondary {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
  }
  .stats {
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 1.3rem;
    box-shadow: 0 18px 50px var(--shadow);
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    gap: 1rem;
  }
  .stat {
    background: rgba(255,255,255,0.02);
    border-radius: 16px;
    padding: 1rem;
    border: 1px solid var(--border);
  }
  .stat strong {
    display: block;
    font-size: 1.9rem;
    margin-bottom: 0.25rem;
  }
  .section { padding: 1rem 0 2.5rem; }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.2rem;
  }
  .card {
    background: rgba(19, 41, 66, 0.92);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 1.2rem;
    box-shadow: 0 18px 50px var(--shadow);
  }
  .tag {
    display: inline-block;
    padding: 0.38rem 0.7rem;
    border-radius: 999px;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 700;
    background: rgba(94, 234, 212, 0.12);
    color: var(--accent);
  }
  .card h3 {
    margin: 0.8rem 0 0.5rem;
    font-size: 1.3rem;
  }
  .article-shell {
    padding: 3rem 0 5rem;
  }
  .article {
    background: rgba(19, 41, 66, 0.92);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 2rem;
    box-shadow: 0 18px 50px var(--shadow);
  }
  .article h1 {
    margin-top: 0.5rem;
    margin-bottom: 0.8rem;
    font-size: clamp(2rem, 4vw, 3rem);
  }
  .keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin: 1rem 0 1.3rem;
  }
  .keyword {
    display: inline-flex;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.25rem 0.7rem;
    color: var(--muted);
    font-size: 0.8rem;
  }
  footer {
    border-top: 1px solid var(--border);
    padding: 2rem 0 3.5rem;
    color: var(--muted);
  }
  @media (max-width: 760px) {
    .hero-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
  }
`;

const homeHtml = \`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Growth Daily | Practical ideas for income, work, and daily momentum</title>
    <meta name="description" content="Practical articles on AI productivity, side hustles, personal finance, remote work, and healthy routines built to attract search traffic and support monetization." />
    <link rel="stylesheet" href="assets/styles.css" />
  </head>
  <body>
    <header>
      <div class="container nav">
        <div class="brand">Growth Daily</div>
        <nav class="nav-links">
          <a href="#topics">Topics</a>
          <a href="#why-it-works">Why it works</a>
          <a href="#revenue">Revenue</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="eyebrow">Fresh ideas daily</div>
            <h1>Actionable content for modern growth.</h1>
            <p class="lead">Growth Daily publishes practical articles covering AI productivity, side hustles, personal finance, remote work, and healthy routines. The goal is simple: useful content, search visibility, and long-term monetization.</p>
            <div class="cta-row">
              <a class="button primary" href="#topics">Read the latest</a>
              <a class="button secondary" href="#revenue">How it earns</a>
            </div>
          </div>
          <div class="stats">
            <div class="stats-grid">
              <div class="stat"><strong>5</strong><span>core niches</span></div>
              <div class="stat"><strong>10</strong><span>article pages</span></div>
              <div class="stat"><strong>SEO</strong><span>friendly</span></div>
              <div class="stat"><strong>Daily</strong><span>updates</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="topics">
        <div class="container">
          <h2>Latest content</h2>
          <div class="cards">
            \${articles.slice(0, 6).map((article) => \`
              <article class="card">
                <span class="tag">\${article.category}</span>
                <h3><a href="article/\${article.slug}.html">\${article.title}</a></h3>
                <p>\${article.excerpt}</p>
              </article>
            \`).join('')}
          </div>
        </div>
      </section>

      <section class="section" id="why-it-works">
        <div class="container">
          <h2>Why this kind of site can grow</h2>
          <div class="cards">
            <div class="card">
              <span class="tag">Search</span>
              <h3>Keyword clusters</h3>
              <p>Each article targets highly searchable topics and builds internal links around a clear niche.</p>
            </div>
            <div class="card">
              <span class="tag">Trust</span>
              <h3>Useful guidance</h3>
              <p>Readers respond to practical help, systems, and straightforward advice more than hype.</p>
            </div>
            <div class="card">
              <span class="tag">Scale</span>
              <h3>Automation</h3>
              <p>Fresh content can be generated on a schedule and deployed automatically to a static site.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="revenue">
        <div class="container">
          <h2>Monetization model</h2>
          <div class="cards">
            <div class="card">
              <span class="tag">Ads</span>
              <h3>Display revenue</h3>
              <p>AdSense and other display units can be placed in article pages and archive sections.</p>
            </div>
            <div class="card">
              <span class="tag">Affiliate</span>
              <h3>Recommendations</h3>
              <p>Tools, books, and software can be naturally integrated into educational content.</p>
            </div>
            <div class="card">
              <span class="tag">Email</span>
              <h3>Lead capture</h3>
              <p>Offer a free checklist, guide, or newsletter signup to grow a repeatable audience.</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="container">© 2026 Growth Daily. Built for useful content, steady growth, and durable monetization.</div>
    </footer>
  </body>
</html>\`;

writeFileSync(path.join(siteDir, 'index.html'), homeHtml);
writeFileSync(path.join(siteDir, 'assets', 'styles.css'), styles);

for (const article of articles) {
  const articlePage = \`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>\${article.title}</title>
    <meta name="description" content="\${article.excerpt}" />
    <link rel="stylesheet" href="../assets/styles.css" />
  </head>
  <body>
    <header>
      <div class="container nav">
        <div class="brand"><a href="../index.html">Growth Daily</a></div>
        <nav class="nav-links">
          <a href="../index.html">Home</a>
          <a href="../index.html#topics">Topics</a>
        </nav>
      </div>
    </header>

    <main class="article-shell">
      <div class="container article">
        <div class="eyebrow">\${article.category}</div>
        <h1>\${article.title}</h1>
        <p class="lead">\${article.excerpt}</p>
        <div class="keywords">
          \${article.keywords.map((keyword) => \`<span class="keyword">\${keyword}</span>\`).join('')}
        </div>
        <div>
          \${article.body.map((paragraph) => \`<p>\${paragraph}</p>\`).join('')}
        </div>
        <div>
          <h3>Helpful recommendations</h3>
          <ul>
            \${article.affiliate.map((entry) => \`<li>\${entry}</li>\`).join('')}
          </ul>
        </div>
      </div>
    </main>
  </body>
</html>\`;

  writeFileSync(path.join(articleDir, \`\${article.slug}.html\`), articlePage);
}

console.log(\`Built \${articles.length} article pages in \${siteDir}.\`);
