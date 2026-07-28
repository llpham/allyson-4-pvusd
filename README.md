# Allyson Lehrer for PV School Board

A static campaign website for **Allyson Lehrer, M.Ed. | MBA**, candidate for the
Palos Verdes School Board. Tagline: *"A place for every child."*

Built as plain static HTML/CSS for free hosting on **GitHub Pages**. No build step,
no framework, no server.

---

## Structure

```
alyson-school-board/
├── index.html          # single-page site (all sections, anchor-linked)
├── styles.css          # all styling + brand color tokens
├── design-preview.html # standalone color-scheme / component preview (reference only)
├── img/
│   ├── main_logo.png       # "A Place for Every Child" logo
│   ├── lawn_sign_small.png # yard sign artwork
│   └── headshot.jpeg       # candidate photo
└── README.md
```

### Sections (in `index.html`)
1. **Hero** — name, tagline, primary calls to action
2. **About Me** — bio and credentials
3. **Priorities** — platform / key issues
4. **Endorsements & Support** — quotes and supporters
5. **Get Involved** — supporter info collection (Google Form)
6. **Yard Sign Signup** — yard-sign request (Google Form)

---

## Color scheme

Sampled from the logo and yard sign, then cooled toward magenta-berry (hue ~329°)
so the primary reads **Democratic, not Republican red**. All colors live as CSS
custom properties at the top of `styles.css`.

| Token          | Hex       | Use                          |
|----------------|-----------|------------------------------|
| `--berry`      | `#B81A6A` | Primary — headers, CTAs      |
| `--berry-deep` | `#8E1A5A` | Hover / depth                |
| `--plum`       | `#6E1D53` | Footer, deepest shade        |
| `--navy`       | `#003048` | Body text, dark elements     |
| `--teal-deep`  | `#007890` | Secondary accent             |
| `--teal`       | `#2A9D9D` | Accent highlights            |
| `--gold`       | `#F0A800` | Emphasis (the sun)           |
| `--cream`      | `#FBF7F4` | Page background              |

The site is **theme-aware** (light/dark) with a manual toggle in the nav.

### Headline font
The display/headline typeface is intentionally kept in a **single CSS variable**
(`--font-display` in `styles.css`) because the campaign may change it. It currently
uses a slab-serif system stack. To switch to a specific webfont later:

1. Drop a `.woff2` file into a new `fonts/` folder.
2. Add an `@font-face` rule at the top of `styles.css`.
3. Change the first entry of `--font-display` to the new font name.

That's the only change needed — every headline updates automatically.

---

## Forms → email (free, via Google Forms)

Both signup forms use **Google Forms**, which is free with unlimited submissions.
Responses collect in a Google Sheet, and notifications are routed to
**allysontschwartz@gmail.com** on each submission.

The forms live in a campaign-owned Google account (not necessarily the candidate's),
so setup is documented in a dedicated, hand-off-ready guide:

### 👉 See **[GOOGLE_FORMS_SETUP.md](GOOGLE_FORMS_SETUP.md)**

It covers creating both forms, choosing fields, routing notifications to
`allysontschwartz@gmail.com`, copying the embed codes, and pasting them into
`index.html` (replacing the `.form-placeholder` blocks at `#supporter-signup` and
`#yard-sign-form`).

> Also replace `CAMPAIGN_EMAIL@example.com` (in the "Do More" card and footer) with
> the real campaign email address.

---

## ⚖️ Campaign compliance (California FPPC) — IMPORTANT

This is a political campaign website, so California disclosure rules apply. **Confirm
the specifics with your treasurer or the FPPC — the notes below are a practical guide,
not legal advice.**

- **Committee registration.** Once the campaign raises or spends **$2,000+** in a
  calendar year, it must register as a recipient committee by filing **Form 410** with
  the CA Secretary of State and will receive an **FPPC committee ID number**.
- **"Paid for by" disclosure.** The FPPC does not strictly *mandate* a disclaimer on a
  candidate's own (non-social-media) website, but it **recommends** displaying
  **"Paid for by [committee name]"** and the **committee ID number**. This site includes
  a prominent disclosure line in the footer — fill in the real values:
  - In `index.html`, footer, replace `[TODO: Official Committee Name]` and
    `[TODO: #######]` with the name and FPPC ID from your Form 410.
- **Where a disclaimer IS mandatory** (for the broader campaign, not this site): mass
  mailings, robocalls, radio/TV ads, and **social media ads** — including a candidate's
  personal Facebook page used for campaigning/fundraising ("Ad paid for by …").
- **Privacy.** The forms collect personal data (name, email, address). A short privacy
  section is included (`#privacy`) — review and adjust the wording.
- **If you add online donations later:** contribution limits apply, contributors giving
  **$100+** must have employer/occupation recorded, and anonymous contributions over
  **$100** are prohibited. Add the appropriate fundraising disclosures at that time.

References: FPPC 2025 Political Advertising Disclosures fact sheets and campaign manuals
(`fppc.ca.gov`).

---

## Deploy to GitHub Pages (free)

Deployment runs from [.github/workflows/deploy.yml](.github/workflows/deploy.yml):
every push to `main` builds the site with Jekyll and publishes it to Pages.

**One-time setup on GitHub:** Settings → Pages → Build and deployment →
**Source: "GitHub Actions"**. (Not "Deploy from a branch" — the workflow needs
the Actions source.)

**Push the site:**

```bash
git add .
git commit -m "Initial campaign site"
git push -u origin main
```

The site publishes at `https://<user>.github.io/<repo>/`. Watch the run under the
repo's **Actions** tab; the deploy URL is shown on the job when it finishes.
To republish without a code change, use **Actions → Deploy to GitHub Pages → Run
workflow**.

### What gets published

[`_config.yml`](_config.yml) controls this. Anything under `exclude:` stays in
the repo but is never copied into the built site, so it has no public URL —
currently `design-preview.html`, both `GOOGLE_FORMS_SETUP` files, and this
README. **Add any new internal file to that list**, or it will be published.

Files and folders starting with `.` or `_` (`.github/`, `.claude/`) are excluded
by Jekyll's defaults and don't need listing.

Jekyll only runs as a file filter here — the site has no front matter, layouts,
or Liquid tags, so `index.html` and `styles.css` are copied through unchanged.

Notes:

- `index.html` is at the repo root and all asset paths are relative, so the site
  works fine under the `/<repo>/` subpath.
- (Optional) For a custom domain, add it under Settings → Pages and commit a
  `CNAME` file containing the domain at the repo root.

---

## ✅ Content TODO checklist

The site scaffold, styling, and layout are done. The **content** for each section is
placeholder text marked with `[TODO]` in `index.html` (and highlighted `TODO` chips
visible on the page). Fill these in after initial setup:

- [x] **About Me** — filled from the campaign doc (full bio, verbatim)
- [x] **Priorities** — filled from the campaign doc (Fiscal Stewardship, Future-Ready
  Learning, A Place for Every Child, verbatim)
- [x] **Community Conversations ("Let's Connect")** — filled from the doc (new section added)
- [~] **Endorsements & Support** — intro line filled verbatim; **quotes/names still needed**
  (the doc did not yet list specific endorsers — cards remain `[TODO]`)
- [ ] **Get Involved** — embed the supporter Google Form (see GOOGLE_FORMS_SETUP.md)
- [ ] **Yard Sign Signup** — embed the yard-sign Google Form
- [x] **Contact email** — set to `allyson4pvpusd@gmail.com` **(confirm — source doc
  truncated at "gmai")**
- [ ] **Social links** — add real Facebook / Instagram handles (footer)
- [x] **Footer disclosure (FPPC)** — committee name set to "Allyson Lehrer 4 PVPUSD"
- [ ] **FPPC ID** — replace `[TODO: #######]` in the footer once Form 410 is filed
- [ ] **Privacy** — review/adjust the `#privacy` notice; add a data-request contact
- [ ] **Compliance review** — have the treasurer/FPPC confirm disclosures before launch
- [ ] **Hero** — confirm tagline/CTA wording
- [x] **Meta** — page title / social preview updated (removed "M.Ed. | MBA"; her degrees
  per the doc are MBA + M.A. in Educational Studies)

### Optional polish
- [ ] Finalize the headline webfont (see *Headline font* above)
- [ ] Add a proper `favicon.ico` / social share image
- [ ] Replace `img/headshot.jpeg` if a higher-res photo is available

---

*Design reference: open `design-preview.html` in a browser to see the palette and
components in isolation.*
