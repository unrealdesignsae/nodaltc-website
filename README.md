# Nodal Site Survey

Editable source for the Nodal Site Survey website, imported from the 1 October 2026 archive.

    npm ci
    npm run dev

Production build: `npm run build`. This is a static export; serve the generated `out/` folder with a static HTTP server, rather than `npm start`.

Repository: https://github.com/unrealdesignsae/nodal-site-survey (private).

Vercel project: `nodal-site-survey`, under `unrealdesignsae-4610s-projects` (astra).
Production URL: https://nodal-site-survey.vercel.app

Production environment: `NEXT_PUBLIC_SITE_URL=https://nodal-site-survey.vercel.app` and `NEXT_PUBLIC_ALLOW_INDEXING=false`. See `.env.example` for optional settings. Enquiry email receipt and upload support remain unverified; no real enquiry was sent during deployment checks.

To deploy from an authenticated local checkout, first link the intended project with `vercel link --project nodal-site-survey --scope unrealdesignsae-4610s-projects`, then run `vercel deploy --prod --scope unrealdesignsae-4610s-projects`.
