# Verification

## 1 October 2026 — restored content and aligned stage scan

- Latest user direction supersedes the simplified layout: restored all four detailed services, four process steps, Drone Site Scan with permit guidance, five deliverables, reasons/audiences and the full visible enquiry form. Retained the single hero action and omitted the crowded feature strip.
- New stage concept edited with built-in OpenAI image generation; full native 1536 × 1024 PNG retained. Original media untouched. Prompt and rendering details are in STAGE-VISUAL.md.
- Two identical image planes provide exact registration. CSS renders one as cyan particles; the scan line clips that layer over the realistic image. Not actual survey data. Native range supports pointer/keyboard input, Home/End, pause/resume and reduced-motion preferences; animation updates pause offscreen/when the document is hidden.
- Restored unreal.ae hero title rise timings, square scaling and copy entrance, original brand colours, wave geometry and mouse response. Kept brighter dots using increased point size, alpha and brightness. Section headings, cards, process markers and disclosures animate with reduced-motion support.
- Production build and TypeScript passed. Changed-file ESLint passed, including final navigation and scan focus changes.
- Browser checks: 1280, 390 and 320 px; no horizontal overflow. Matching source and exact dimensions confirmed for both scan planes. Home sets clip to 100% (photo only); End sets clip to 0% (particles only). PageUp reaches midpoint. Pause/resume and moving value verified.
- Mobile menu closes after navigation. FAQ opens correctly. GPS set-out reveals optional day count. Four services, four process steps and five deliverables verified in the DOM. No captured browser errors.
- Email delivery and attachment support remain unverified. No real enquiry submitted.
## 1 October 2026 — simplified page

- User identified the hero's copy, two buttons, scroll control and feature strip as clutter. Hero now has one short sentence and one action; removed the scroll control, feature strip and decorative title squares.
- Reduced the page to five sections. Combined service/process/deliverable copy into five mutually exclusive service disclosures. Removed page-wide node animation, repeated card grids and the oversized footer. Full enquiry form opens on request.
- Added masked heading reveals, scroll-linked hero movement, animated service/FAQ disclosures and a restrained cyan wave palette. Reduced-motion preferences disable these effects.
- Changed-file ESLint, production build and TypeScript passed. Browser checks at 1280, 390 and 320 pixels found no horizontal overflow; checked images loaded and no browser errors were captured.
- Verified exactly one hero link, one open service at a time, expandable enquiry form and conditional set-out-days field. No enquiry sent.

## 1 October 2026 — hero and interface refresh

- Removed the three hero metadata blocks and shortened the hero/service copy.
- Restored the staggered masked title reveal, square scaling and supporting-content entrance from the owner's unreal.ae reference. Increased particle size, colour and opacity in the existing wave field.
- Added scroll-triggered section/card reveals, reading progress, responsive service cards, animated links/FAQ/menu states and clearer form controls. Motion respects the reduced-motion preference; the wave renderer pauses offscreen.
- Production build and TypeScript passed. ESLint on all changed TypeScript files passed without warnings; full-project lint retains nine unrelated warnings and no errors.
- Desktop 1280px and mobile 390px layouts inspected. Main desktop hero buttons fit the viewport. Mobile has no horizontal overflow or broken images.
- Verified mobile menu closes after navigation, service links reach the enquiry, FAQ expands, field focus is visible and selecting GPS set-out reveals the days field. No browser errors captured.
- No form submission or external media generation was performed. Original image and video files remain unchanged.

## 1 October 2026 — deployment validation

The following fresh checks supersede the earlier lint result below:

- Fixed an invalid nested navigation effect that could cause a browser runtime error.
- Fixed the globe animation callback's self-reference and removed a suppressed custom-property type error.
- `npm run lint`: passes with zero errors and nine existing warnings.
- `npm run build`: passes, including TypeScript and all static routes.
- Static-export build warns that Next.js custom headers are not applied to the exported files.
- No real enquiry was sent; email delivery and attachment support remain unverified.

## Earlier packaged record

- Production Next.js build and TypeScript checks pass.
- ESLint passes without warnings.
- Desktop 1536 × 1024 and mobile 390 × 844 screenshots inspected.
- No horizontal overflow, unloaded images or browser runtime errors at either viewport.
- Mobile menu closes after navigation.
- Mocked enquiry failure preserves the entered information; mocked success displays the receipt state.
- Direct signed storage accepts a synthetic 25 MiB PDF (HTTP 204). No test enquiry email was sent.
- npm audit: zero vulnerabilities after dependency updates.

Before public launch, confirm the WhatsApp number, Sound Level Management URL, canonical new deployment URL and authorized live email receipt. Remote repository creation and deployment are still pending account access. The existing Nodal repository, domain and deployment were not changed.
