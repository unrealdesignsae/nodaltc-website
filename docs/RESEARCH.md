# Reference research and decisions

Reviewed 30 September 2026. External reference sites inform layout and technical understanding only; client copy remains authoritative. No competitor photography or claims are reused.

| Reference | Relevant evidence | Design implication |
| --- | --- | --- |
| https://marxact.com/2022/08/31/lion-event-support-chooses-digital-surveying-at-festivals-and-events/ | Event teams measure existing terrain, align drawings to coordinates, then stake out positions before construction. | Keep Survey → Plan → Set-out prominent, use GPS equipment and event-specific supplied copy. |
| https://marxact.com/2026/08/21/digital-surveying-of-festivals-accurately/ | Survey points, lines and polygons relate directly to stage, fence and site-plan features. | Explain outputs in the client's familiar CAD/file formats, not abstract technical claims. |
| https://www.mastergrid.io/ | Places existing CAD drawings and drone surveys in one spatial workflow for event operations. | Present coordinated inputs/outputs, avoid implying Nodal sells a software dashboard. |
| https://compass-arabia.com/services/drone-survey/ | Combines aerial mapping with ground control and finished survey deliverables. | Visually separate drone mapping from GPS set-out; preserve the client's accuracy qualifications. |

## Form implementation research

- https://docs.web3forms.com/getting-started/pro-features/file-attachments — normal HTML attachments are limited to 5 MB.
- https://docs.web3forms.com/getting-started/pro-features/advanced-file-uploader — advanced uploads support larger files and require the appropriate provider plan.
- https://web3forms.com/client/script.js — current official advanced-uploader code obtains signed upload fields using `file`, optional `type`, and form `id`; POSTs multipart form-data directly to storage; then submits returned `key` as `attachment`. The custom React uploader follows that observed protocol, with validation and visible failure states.
- https://vercel.com/docs/functions/limitations — function request bodies have a 4.5 MB limit. Direct-to-storage uploading avoids routing a 25 MB drawing through a Vercel function.

## Media provenance

Hero: generated on 30 September 2026 following the user's explicit request for a futuristic drone-scanning scene. It depicts a survey drone, GPS equipment and a conceptual cyan digital twin of an event site. Labelled “Illustrative site scan” in the page. Optimized asset: `public/survey/drone-site-scan.webp`. The user's generated-media direction supersedes the PDF stock/own-image preference for this hero. No competitor images or logos are included. Original Nodal logo reused from the authorized source repository.

The previous stock-photo hero and early concept mockups were rejected and are not the active design.

## Unverified details

No authoritative WhatsApp number was found; original source has a placeholder-style phone number. No Sound Level Management page was found in the original source/navigation or public search. Do not invent either. A live email receipt has not been tested because no client test email is authorized.
