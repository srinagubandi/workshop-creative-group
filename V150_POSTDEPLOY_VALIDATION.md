# v1.5.0 Railway Post-deployment Testimonial Validation

| Check | Result | Evidence |
|---|---|---|
| Railway deployment | Passed | GitHub deployment status reported Railway **success** for merge commit `d5b2148830540570170dceb7b04b4811b26b050a`. |
| Live testimonial content | Passed | The live Home route rendered the revised Client Perspective introduction and populated testimonial records. |
| Accessible full-quote controls | Passed | The live page exposed author-specific controls including “Read the full testimonial from Ian Readman,” “Read the full testimonial from Anita Gambill,” and “Read the full testimonial from Alexandra Folden.” |
| No automatic movement | Passed | The live introductory copy explicitly confirms that the testimonial section does not rotate or advance automatically, and the redesign does not use a carousel. |
| Live visual navigation | Passed | The production Home route exposed the revised Client Perspective introduction and the author-specific testimonial buttons within the keyboard focus order. |
| Live populated-card visual layout | Passed | Production rendered a three-column grid with compact author-first headers, quotation separators, user-controlled buttons, and no stretched empty author area. Card geometry was intrinsic rather than equal-height: 551, 551, 423, 519, and 455 pixels. |
| Live layout semantics | Passed | The testimonial container computed as `display: grid` with `align-items: flex-start`; all five cards placed author context before quote content. No carousel or animation selector was found. |
| Live full-quote expansion | Passed | Ian Readman’s quote expanded to the complete approved testimonial. The control changed to “Show less,” updated to `aria-expanded="true"`, and exposed the author-specific accessible name “Show less of testimonial from Ian Readman.” |
| Live testimonial controls | Passed | Long-quote controls measured 44 pixels high, carried unique `aria-controls` relationships to their `blockquote` elements, and had unique author-specific accessible names. |
| Live Home axe-core WCAG A/AA scan | Passed | Scan returned 0 violations, 9 color-contrast manual-review items, and 28 passed rules. |
| Live keyboard-only testimonial expansion | Passed | Tab moved to the Anita Gambill Read full perspective button with a visible focus ring; Enter expanded the complete approved quotation and changed its accessible control to Show less. |
