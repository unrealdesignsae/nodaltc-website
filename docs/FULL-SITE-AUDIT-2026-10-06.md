# Full website audit — 2026-10-06

## Scope and evidence

Home and survey tested at 320, 360, 390, 430, 667 landscape, 768, 820, 1024, 1440 and 1920px viewport widths. No horizontal overflow or clipped project copy; text inputs remain 16px. Mobile navigation, Escape dismissal, section anchors, home/survey routing, all six survey FAQs and required-field validation checked. Physical iOS/Android devices were not available.

Instagram footer link opens Sem Elitas (@semelitas), with matching professional profile content; Instagram initially shows a sign-in prompt. LinkedIn opens the supplied profile URL through its signed-out authentication wall, so profile identity behind that wall is not verified. Social URLs were already correct and unchanged.

Public pages, robots, sitemap, video and representative original images return HTTP 200. Both forms passed local mocked success, rejection, rate-limit, malformed-response and offline tests. No additional live enquiries sent; the two previously authorized messages were already accepted by Web3Forms, while Gmail inbox arrival remains user-verifiable.

## Changes

- Defer the two engineering background images (13.26 MB combined) until that section enters view; preserve original files.
- Remove duplicate video decoder and background frame prefetch. Retain original footage, first-frame display and on-demand lighting control.
- Pause hidden/offscreen canvas work; avoid reallocating the globe canvas each frame; cap survey hero rendering at 30 fps without changing dot brightness.
- Add keyboard and screen-reader support to the lighting dial; improve secondary text contrast; correct survey highlight list semantics.
- Prevent short landscape hero clipping and floating WhatsApp overlap with hero/contact/footer.
- Honor the user's decision: no loading screen, hero loading indicator or added cookies.

## Validation

Production build/TypeScript, changed-file ESLint, git diff checks and scripts/verify-enquiry.mjs pass. Local browser shows a single paused video with its first frame ready, no engineering-image request on initial hero, keyboard-adjustable dial, and no captured console errors. WhatsApp hidden on the 320px hero and contact, visible in services.

PageSpeed Insights baseline: homepage mobile 62 (FCP 2.5s, LCP 39.3s, TBT 50ms, CLS 0); survey mobile 96 (LCP 2.6s), desktop 68 (TBT 520ms). Lab scores vary and are not field-user measurements. Post-release results are recorded separately after deployment.

Original media and local original-site backup remain untouched. Existing dependency audit findings are a separate unresolved maintenance item; this audit does not claim a security review or perfect performance on every device.

## Production measurements

Performance release a531e99 was published as dpl_J27L48GS5hursAri9B6feus2Lbd4 and explicitly aliased to nodaltc.com. Live checks confirm one video decoder, deferred engineering images, loaded 1536px scan originals, moving scan line, working process globe and no captured page errors.

- Homepage: mobile 71, desktop 97; mobile LCP 5.4s (baseline 39.3s), TBT 10ms, CLS 0. Accessibility 100. Report: https://pagespeed.web.dev/analysis/https-nodaltc-com/l46yn33s9n
- Survey first run: mobile 83, desktop 83; desktop TBT 280ms (baseline 520ms). Report: https://pagespeed.web.dev/analysis/https-nodaltc-com-site-survey/4rlxhrby67
- Survey repeat: mobile 96, desktop 100; mobile LCP 2.4s, TBT 140ms, CLS 0. Report: https://pagespeed.web.dev/analysis/https-nodaltc-com-site-survey/38ny905rgc

These two survey runs illustrate substantial lab variability; neither guarantees real-device performance. The reports exposed a skipped heading level introduced by the highlight-list correction; final follow-up uses h2 for these section headings with identical styling. That semantic-only correction is build/lint checked separately. Original large media and animation costs remain the main slow-connection limitations; no image derivatives were made.
