# Hollyman Care Homes website

Next.js App Router rebuild for Hollyman Care Homes, using source material from the live site: brand colours, logo, real imagery, home names, Norfolk locations, service structure and contact details.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Edit content

- Home and contact details: `data/homes.ts`
- Care service pages: `data/services.ts`
- Site-wide phone, navigation and trust blocks: `data/site.ts`
- Replace images by adding files to `public/images` and updating the paths in the data files.

## Lead generation

Primary CTAs use `data-cta` attributes for analytics wiring. The enquiry form currently submits to `/thank-you` with GET parameters as a frontend placeholder. Connect it to a CRM, email service or server action before launch.

## Launch checks

- Reconfirm current fees, funding wording, vacancies and any regulated claims before publishing.
- Add current CQC/PAMMS links only if the business wants to show them and the content is verified.
- Replace or expand photography with approved, current images where available.
