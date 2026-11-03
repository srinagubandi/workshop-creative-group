# Blog release browser checks

`blog-audit.mjs` uses Playwright Chromium and axe-core. Install these in a separate temporary directory, copy the script and `article-fixture.json` there, and run the script from that directory. They are not application runtime dependencies.

```bash
npm init -y
npm install playwright axe-core
npx playwright install chromium
node blog-audit.mjs http://127.0.0.1:4173 local ./evidence-local
node blog-audit.mjs https://web-production-d7aa.up.railway.app live ./evidence-live
```

The local mode substitutes public API fixtures for UI testing. Live mode never substitutes API data and never submits forms or sends credentials. The fixture's date is the v1.11.0 release date, not a seed instruction. Tests check the approved article, byline, five benefit items, responsive widths, keyboard navigation, missing-record behavior, and sampled WCAG A/AA rules. Revisit the date assertion when testing a different release/article. Raw JSON records incomplete/manual-review items separately from violations. Passing this script is not a full accessibility conformance or legal guarantee.
