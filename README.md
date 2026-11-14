# ASWINKUMAR K — Futuristic Portfolio

A responsive React + Vite portfolio with Framer Motion animations, liquid-glass navigation, interactive portrait parallax, project showcase, cinematic scroll-driven 3D education panels, skills, internship, certifications and an EmailJS contact form.

## 1. Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (normally http://localhost:5173).

## 2. Build for Netlify

```bash
npm run build
```

Deploy the `dist` folder to Netlify, or connect the repository to Netlify. `netlify.toml` already sets the build command and publish directory.

## 3. Add your resume

Place your PDF at:

`public/resume.pdf`

The Resume buttons link to this file. Until you add it, the link will not have a file to download.

## 4. Configure EmailJS

1. Create an EmailJS service and a contact-form template.
2. In the template, use variables such as `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, and `{{message}}`.
3. Copy `.env.example` to `.env`.
4. Fill in the three Vite variables:

```env
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

5. Restart the dev server after editing `.env`.
6. Add the same variables in Netlify → Site configuration → Environment variables, then trigger a new deploy.

Only the EmailJS public key belongs in frontend configuration. Never put private service credentials or secret keys in Vite variables.

If EmailJS variables are missing, the form displays a clear setup message instead of pretending that a message was sent.

## 5. Personalise the content

- `src/App.jsx`: edit education school/college names and years, project details, internship details and certification links.
- `public/images/portfolio-banner.png`: the uploaded profile photograph is included here.
- `public/resume.pdf`: add your current resume.
- Replace `YOUR_NETLIFY_DOMAIN` in `public/sitemap.xml` and `public/robots.txt` after deployment.
- Add real certificate images/URLs and confirmed experience details before publishing.

## Portrait / eye tracking note

The supplied portrait is a single flattened photograph. The site uses the actual photo with gentle pointer-based 3D movement and lighting. It deliberately does **not** move the whole image's eye region or draw fake pupils over the face. Genuine independent pupil tracking requires separately prepared, accurately masked transparent pupil/eye layers (or a layered source portrait). This protects facial proportions and avoids a visibly artificial effect.

## Accessibility and performance

- Pointer effects are disabled for touch/coarse-pointer devices.
- Reduced-motion preferences are respected.
- Below-the-fold sections use native lazy reveal behavior through Framer Motion.
- The contact form validates inputs, shows sending/success/error states and blocks duplicate submissions.


## Updated banner and education

The supplied wide portrait remains the full-width hero banner. The Education section now presents four verified milestones in a scroll-controlled 3D Y-axis presentation: SSLC, HSE, UG (BBA), and PG (MBA). The full glass panels move through horizontal position, Y rotation, depth, scale, and opacity. No passing years have been added. A static readable grid is provided when the visitor enables reduced motion.

Education records are maintained in the `education` array in `src/App.jsx`. The values currently shown are:

- SSLC: Sri Rajarajeswari Matric Hr. Sec. School, Kangayam, 73.6%, Completed.
- HSE: Sri Rajarajeswari Matric Hr. Sec. School, Kangayam, 81.3%, Completed.
- UG – BBA: Sri Ramakrishna College of Arts and Science, Coimbatore, 77%, Completed.
- PG – MBA: Bannari Amman Institute of Technology, Sathyamangalam, Marketing & Business Analytics, 75%, Currently Pursuing.
