# Nodal combined site — 2 October 2026

## Scope and source
- Original homepage restored from unrealdesignsae/nodaltc-website, commit 07db3853dfa2da5e5cf710f181d0d6558e833ba9.
- Survey retained at /site-survey/ and linked from shared desktop/mobile navigation and the seventh homepage service card.
- Client feedback: Nodal_Site_Survey_Website_Feedback_V1.pdf, three pages.
- Project facts: NODAL_TC_PROJECTS_updated.xlsx, nodaltc_projects sheet. Exactly six major engagements are featured; no extended smaller-event list.

## Client feedback implemented
- Drone coverage: pre-production, build, early-morning show days, breakdown/handover. Matching process and deliverable text; georeferenced overlay plus short report; outside audience hours, licensed partner pilots, permits and planning lead time.
- Four drone phase checkboxes in the enquiry form. Hidden drone phases and set-out days are excluded when the corresponding service is not selected.
- Hero explanation, RTK/CAD/daily scan facts, three clearly labeled example deliverables, expanded footer and main-site logo link.
- Consistent section labeling, white/cyan headings, original interactive network background, bright survey particle wave and automatic aligned photo/particle scan beside the overview text.
- Hero entrance starts from CSS on first paint. Removed the later JavaScript reset that caused the visible/disappear/reappear flash. Squares use 1cap and match the title capital height.

## Validation and limits
- Production build passed; lint has no errors (nine inherited warnings).
- Local enquiry script verifies four phases, services, dates, attachment reference, download link, hidden-field exclusion, invalid dates/contact and 5 MB boundaries. It does not make network requests.
- Desktop/mobile browser checks cover route navigation, menu, layout overflow, title squares, project count/assets and automatic scan animation.
- User explicitly chose local-only form testing. No test email or drawing was sent. Inbox recipient/delivery and attachment entitlement remain unverified.
- Web3Forms advanced upload goes directly to provider storage, then includes its attachment key in the submission. This avoids a Vercel function-body limit. Upload requires the provider's Pro entitlement; it is not confirmed for the inherited public form key. Conservative UI limit is 5 MB; a drawing-link field and email fallback are available. Do not claim 25 MB verified.
- User authorized a placeholder WhatsApp number. Display +971 50 000 0000 as placeholder; no arbitrary real recipient is linked. Set NEXT_PUBLIC_WHATSAPP_NUMBER to the verified business number to activate the link.
- Review URL: https://nodal-tc.vercel.app. Indexing remains disabled until contact verification and custom-domain launch. nodaltc.com DNS is not changed.

## Reproduce local checks
`node scripts/verify-enquiry.mjs`
`npm run lint`
`npm run build`

Provider references: https://docs.web3forms.com/getting-started/pro-features/advanced-file-uploader and https://docs.web3forms.com/getting-started/pro-features/file-attachments
