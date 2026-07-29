# Allyson Lehrer for PV School Board

A static campaign website for **Allyson Lehrer, M.Ed. | MBA**, candidate for the
Palos Verdes School Board. Tagline: *"A place for every child."*

Built as plain static HTML/CSS for free hosting on **GitHub Pages**. No build step,
no framework, no server.

---

## Structure

```
alyson-school-board/
├── index.html          # home page (all sections, anchor-linked)
├── about.html          # "Meet Allyson" — long-form bio
├── priorities.html     # "My Priorities" — long-form platform
├── endorsements.html   # "Endorsements & Gratitude" + Donorbox donor wall
├── priorities.html     # "My Priorities" — long-form platform
├── styles.css          # all styling + brand color tokens
├── main.js             # nav toggle, theme toggle, footer year (shared by all pages)
├── design-preview.html # standalone color-scheme / component preview (reference only)
├── img/
│   ├── main_logo.png       # "A Place for Every Child" logo
│   ├── lawn_sign_small.png # yard sign artwork
│   ├── headshot-clean.jpeg # candidate photo — IN USE (black corner wedges removed)
│   └── headshot.jpeg       # original as supplied; has black wedges from an ~12° rotation
└── README.md
```

### Sections (in `index.html`)
1. **Hero** — name + "elect" line only (tagline, CTA buttons, and logo panel removed
   to reduce noise; their CSS is retained if any come back)
2. **About Me** — short-form bio + "Learn More About Allyson" → `about.html`
3. **My Priorities** — four short-form cards + "Learn More About My Priorities" → `priorities.html`
4. **Let's Connect** — community conversations + sign-up form button

### Short vs. long copy

Both the bio and the priorities exist in two lengths — a short version on the
home page and a long version on its own page. **All of it is verbatim from the
campaign's Google Doc:**

| Content    | Short (home page)      | Long (own page)   | Doc tab            |
|------------|------------------------|-------------------|--------------------|
| Bio        | `index.html`, `#about` | `about.html`      | Meet Allyson Lehrer |
| Priorities | `index.html`, `#priorities` | `priorities.html` | Priorities     |

The doc is the source of truth — **edit the text there first**, then mirror the
change into the HTML. Don't reword it in the HTML alone.

> **Known typo, kept on purpose.** `priorities.html` contains
> "…for generations.It also means…" (missing space after the period), exactly as
> it appears in the doc. Fix it in the doc, then here.

### Footer

Content comes from the campaign doc's **"Footer of Website"** section: committee
name, email, Instagram handle, the thank-you paragraph, and a "Click here" link to
the sign-up form. The **FPPC "Paid for by" disclosure** and the small copyright
line are site-side additions and are kept.

The old **Explore** and **Contact** nav columns were removed. The footer now has
no page-relative links at all, which means the block is **byte-identical on all
four pages** and can be copied between them verbatim.

### ⚠️ Keep the header and footer aligned across pages

There is **no build step and no templating** — the nav and footer are copied
verbatim into `index.html`, `about.html`, `priorities.html`, and
`endorsements.html`. **A change to one must be made in all four**, or the site's
navigation silently diverges
depending on which page a visitor is on. This applies to:

- the nav links (and which ones are commented out)
- the FPPC disclosure line
- anything else between `<header class="nav">` and `</header>`, or inside `<footer>`

Note the link style differs by page: `index.html` links to its own sections with
`#priorities`-style anchors, while the sub-pages must use `index.html#priorities`.
Shared behaviour (nav toggle, theme toggle, footer year) already lives in one
place — `main.js` — so it does *not* need syncing.

### 📌 TODO: privacy notice → move it into the Google Form

The site previously had a **Privacy** section (`#privacy`) explaining how form
submissions are used. It has been removed from the site entirely, along with the
footer links that pointed at it.

**It would be good to add this detail to the Google Form instead**, which is
arguably where it belongs — it's the point where someone actually hands over
their name, email, and address, so that's where the notice is most likely to be
read. Options, roughly in order of effort:

1. Put it in the **form description** (the text under the form title), so it's
   visible before anyone starts typing.
2. Add it as a short **section header / description block** immediately above the
   fields that collect contact details.
3. Add a **required checkbox** ("I understand how my information will be used")
   if the campaign wants a recorded acknowledgement.

Suggested wording, adapted from the section that was removed — **have the
campaign's treasurer or counsel confirm it before publishing**:

> Information you share through this form (such as your name, email, and address)
> is collected via Google Forms and used only by the campaign to contact you,
> coordinate volunteers and yard-sign delivery, and send campaign updates. We do
> not sell your information.

Still open regardless of where the notice lives: a contact address for data
requests, and any legally required reporting of contributor information.

### Hidden: Endorsements

The **Endorsements & Support** section has no real content yet, so it is
commented out rather than deleted. To bring it back, un-comment **all** of:

- the `#endorsements` section in `index.html`
- the nav `<li>` in `index.html`, `about.html`, and `priorities.html`
- the footer "Explore" link in all three pages

The section's inner `<!-- TODO -->` comments were converted to `~~ … ~~` markers,
because HTML comments cannot nest — restore them when you un-comment.

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

**Currently live: one combined form.** At the client's request, supporter sign-up
and yard-sign requests are collected by a *single* Google Form, embedded in the
Connect section at `#signup` in `index.html`. The two-form setup described in the
guide below is the original plan — kept because the client is still evaluating.

The Connect section's two email buttons ("Schedule via Gmail" / "Use email app")
have been replaced by a single **Join the Movement** button linking to the form.
The campaign email address is still reachable from the footer.

Sign-up uses **Google Forms**, which is free with unlimited submissions.
Responses collect in a Google Sheet, and notifications are routed to
**allysontschwartz@gmail.com** on each submission.

The forms live in a campaign-owned Google account (not necessarily the candidate's),
so setup is documented in a dedicated, hand-off-ready guide:

### 👉 See **[GOOGLE_FORMS_SETUP.md](GOOGLE_FORMS_SETUP.md)**

It covers creating the forms, choosing fields, routing notifications to
`allysontschwartz@gmail.com`, and copying the embed codes.

**The site links to the form rather than embedding it.** Google Forms embeds run
in an iframe that depends on third-party cookies; browsers increasingly block
those by default, and when they do the embed either fails to render or refuses
to submit — with no useful error for the visitor. Opening the form on
`docs.google.com` makes it first-party, so it works for everyone. **Skip Step 4's
embed code** in the guide below; use the plain **Send → 🔗 link** URL instead.

To point the site at a different form, replace the one `docs.google.com` URL in
the `#signup` button in `index.html`. Use the bare `/viewform` URL with no query
string (drop any `?usp=…` or `?embedded=true`).

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
    `Coming Soon` with the FPPC ID from your Form 410.
- **Where a disclaimer IS mandatory** (for the broader campaign, not this site): mass
  mailings, robocalls, radio/TV ads, and **social media ads** — including a candidate's
  personal Facebook page used for campaigning/fundraising ("Ad paid for by …").
- **Privacy.** The forms collect personal data (name, email, address). The site's
  privacy section has been **removed** — see the TODO below.
- **⚠️ Online donations are now live.** The nav on all four pages has a **Donate Now**
  button pointing at `donorbox.org/allyson-lehrer-4-pvpusd`. That makes the following
  apply *today*, not "later": contribution limits apply, contributors giving **$100+**
  must have employer/occupation recorded, and anonymous contributions over **$100** are
  prohibited. **Confirm with the treasurer** that the Donorbox form collects
  employer/occupation and carries the required committee disclosure.

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

- [x] **About Me** — short form on `index.html`, long form on `about.html`, both verbatim
- [x] **Priorities** — short form on `index.html`, long form on `priorities.html`, both
  verbatim (Preparing Students for the Future, Safe & Supportive Schools, Fiscal
  Stewardship, Enrollment)
- [x] **Community Conversations ("Let's Connect")** — filled from the doc (new section added)
- [~] **Endorsements & Support** — **hidden** until real endorsers exist (see above);
  markup preserved, commented out
- [x] **Sign-up** — single combined Google Form, linked from the "Join the Movement" button
- [x] **Contact email** — set to `allyson4pvpusd@gmail.com` **(confirm — source doc
  truncated at "gmai")**
- [x] **Social links** — Instagram `@allysonlehrer4pvpusd` linked in the footer
  (**verify the account URL resolves**); Facebook removed — the campaign doc lists
  only the one handle
- [x] **Footer disclosure (FPPC)** — committee name set to "Allyson Lehrer 4 PVPUSD"
- [ ] **FPPC ID** — replace `Coming Soon` in the footer once Form 410 is filed
- [ ] **Privacy** — section removed from the site; add the notice to the Google Form
  instead (see the TODO above) and include a data-request contact
- [ ] **Compliance review** — have the treasurer/FPPC confirm disclosures before launch
- [ ] **Hero** — confirm tagline/CTA wording
- [x] **Meta** — page title / social preview updated (removed "M.Ed. | MBA"; her degrees
  per the doc are MBA + M.A. in Educational Studies)

### Optional polish
- [ ] Finalize the headline webfont (see *Headline font* above)
- [ ] Add a proper `favicon.ico` / social share image
- [ ] Replace `img/headshot-clean.jpeg` if a higher-res photo is available — ideally an
  untilted original, which would remove the need for the corner repair altogether

---

*Design reference: open `design-preview.html` in a browser to see the palette and
components in isolation.*
