# Homepage restoration and survey navigation — 2026-10-02

## Source and scope
- Original layout/components from nodaltc-website 07db3853dfa2da5e5cf710f181d0d6558e833ba9.
- Restored full-background image project cards, extended project table, original menu treatment and animated footer.
- Six existing reference-led cinematic stage visuals; remaining 15 Excel records restored below. All 21 workbook records represented once.
- Restored five missing original public/images assets, including both Precision Engineering drawing layers. Corrected the unanchored Git ignore that excluded them.
- Original six-service grid restored byte-for-byte following the user’s explicit instruction; no seventh service card.
- Survey styles isolated from homepage. New survey introduction immediately after Precision Engineering; shared animated SVG symbols replace example plan diagrams.
- Survey-specific section menu plus Home button. Mobile/tablet menu uses 44px targets, closes on navigation/outside click/Escape, and restores focus on Escape.

## Interaction and performance fixes
- Engineering parallax now uses viewport coordinates, so scrolling no longer corrupts the tilt.
- Reserved original 500vh process footprint before dynamic import, preventing deep-link jumps.
- Process cleanup kills only its own scroll timelines. Reduced-motion users receive visible static text.
- Original conversation wire animation retained, with a complete static treatment for reduced motion.
- Project imagery lazy-loaded; hero retains untouched source video with at most 12 decoded GPU frames, cancel-safe cleanup and sparse prefetch.

## Validation
- Production build and TypeScript pass. ESLint: zero errors, eight inherited warnings in other original components.
- Local enquiry verification passes without network calls or external email.
- Browser checks at 1440x900, 820x1180, 390x844 and 360x740: menus, navigation, hero, engineering layers, survey introduction, project cards, deliverable icons and enquiry layout.
- No horizontal page overflow in checked desktop/mobile viewports.
- Six featured cards and 15 table rows verified; internal anchors resolve on both pages.
- Fresh static build: direct #projects navigation lands at section top; no console errors captured.
- Conversation SVG path progress verified increasing from ~0.20 to ~0.62 as scrolling advances; sticky frame stays at top; CTA reaches contact.
- Survey Home button returns to homepage. Own menu anchors remain on survey page.

## Remaining external dependencies
- WhatsApp is still clearly labeled a placeholder, per user instruction.
- Inbox receipt and attachment entitlement remain unverified; user requested local-only testing.
- Generated stage visuals remain labeled as visualizations, not documentary photography.
- Original social links remain source placeholders, pending actual profile URLs.
