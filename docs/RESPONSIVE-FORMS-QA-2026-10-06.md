# Responsive layout and forms — 6 October 2026

## Requested changes
Both pages responsive; survey sends through the homepage's existing info@nodaltc.com Web3Forms setup; matching homepage/survey footer and contact panel styling, survey copy retained; cyan survey submit button; supplied phone +971 54 710 2223.

## Changes
- Shared browser-side JSON submission transport and existing homepage public form key. Both submit to https://api.web3forms.com/submit, with email and replyto on email enquiries. Survey phone enquiries send phone separately.
- Strict HTTP and success checks, timeout, offline/rate-limit/provider error handling, duplicate-submit guard, persistent accessible confirmation and retry preserving details. Fixed start-date clearing observed on failed mobile survey submission.
- Accessible homepage labels, autocomplete, 16px inputs, minimum44px touch controls and keyboard focus states.
- Content-sized project cards on phones/short screens retain images and entrance motion. Tablet survey contact becomes one column; form grids respond to their container. Narrow date fields stack.
- Both pages use the same ContactIntro and Footer components. Survey wording retained. Cyan #00d4ff submit with black text and arrow. Footer wordmark now also fits mobile.
- Supplied phone used by both tel links and survey WhatsApp link. Floating WhatsApp hides while the contact section is visible.

## Evidence
- Local build, TypeScript and changed-file ESLint pass.
- scripts/verify-enquiry.mjs: services/phases/dates/contact/attachment boundaries and both JSON transport payloads. Simulated success, provider rejection, HTTP error, invalid JSON, rate limit and offline. No external network.
- Browser tests against a localhost-only mock inbox: homepage success and failure preserve name; survey failure preserves all details including start date, retry succeeds, Send another resets; required fields block empty submission; conditional services/phases work. Mock server rewrites provider endpoints only in locally served JS and never relays. Test helper remains outside repository.
- Viewports for both pages: 320x568,360x740,390x844,430x932,667x375 landscape,768x1024,820x1180,1024x768,1440x900,1920x1080. No horizontal page overflow; no offscreen form controls; no clipped project-card content; 16px form inputs. Survey menu closes on anchor selection. Desktop shared contact panel and mobile footer visually checked.

## Delivery limits
User confirms original form delivered to info@nodaltc.com; both now use that same existing key. No new setup for plain enquiries. Actual inbox receipt has not been retested, honoring local-only testing instructions. Web3Forms file upload requires Pro, and account entitlement is unverified; drawing download links remain supported without uploads.
References: https://docs.web3forms.com/getting-started/api-reference and https://docs.web3forms.com/getting-started/pro-features/file-attachments .
