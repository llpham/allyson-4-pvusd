# Allyson Lehrer for PV School Board

A static campaign website for **Allyson Lehrer**, candidate for the Palos Verdes
Peninsula Unified School District (PVPUSD) Governing Board.
Campaign line: *#APlaceForEveryChild*.

Plain static HTML/CSS/JS hosted free on **GitHub Pages**. No framework, no server,
and no build step beyond Jekyll acting as a file filter (see *Deploy*).

---

## Structure

```
alyson-school-board/
├── index.html          # home page — hero, about, priorities, connect, donate
├── about.html          # "Meet Allyson" — long-form bio
├── priorities.html     # "My Priorities" — long-form platform
├── endorsements.html   # "Endorsements & Gratitude" + Donorbox donor wall
├── styles.css          # all styling + brand color tokens
├── main.js             # nav toggle + footer year (shared by all four pages)
├── _config.yml         # Jekyll: controls which files get published
├── .gitignore
├── .github/workflows/
│   └── deploy.yml      # GitHub Actions → Pages
├── img/
│   ├── main_logo.png       # "A Place for Every Child" logo — nav, hero, footer
│   ├── headshot-clean.jpeg # candidate photo — IN USE (corner wedges repaired)
│   ├── headshot.jpeg       # original as supplied; black wedges from an ~12° rotation
│   ├── headshot-cropped.jpeg # alternate repair (cropped, not used)
│   ├── hero_image.png      # not referenced by any page
│   └── lawn_sign_small.png # yard sign artwork (only used by design-preview.html)
│
│   — internal, never published (see "What gets published") —
├── GOOGLE_FORMS_SETUP.md   # hand-off guide for building the sign-up form
├── GOOGLE_FORMS_SETUP.txt  # byte-identical copy of the .md, for non-technical hand-off
├── FORM_PREFILL_OPTIONS.txt# client-facing explainer on pre-filled form links
├── design-preview.html     # palette / component reference page
└── README.md
```

### Pages

| Page | Contains |
|------|----------|
| `index.html` | Hero (logo + name), About (short), Priorities (4 cards), Let's Connect, Donate |
| `about.html` | Long-form bio |
| `priorities.html` | Long-form platform — four priorities with full detail |
| `endorsements.html` | Gratitude copy + Donorbox donor wall |

Home-page sections, in order — `#about`, `#priorities`, `#community`, `#donate`.
`#signup` is the anchor on the "Join the Movement" button inside Let's Connect.

### Short vs. long copy

The bio and the priorities each exist in two lengths — short on the home page,
long on a dedicated page. **All of it is verbatim from the campaign's Google Doc:**

| Content    | Short (home page)           | Long (own page)   | Doc tab             |
|------------|-----------------------------|-------------------|---------------------|
| Bio        | `index.html`, `#about`      | `about.html`      | Meet Allyson Lehrer |
| Priorities | `index.html`, `#priorities` | `priorities.html` | Priorities          |

Both use the doc's **first-person** versions (found below the third-person ones in
the same tab). The doc is the source of truth — **edit the text there first**, then
mirror the change into the HTML. Don't reword it in the HTML alone.

> **Known typo, kept on purpose.** `priorities.html` contains
> "…for generations.It also means…" (missing space after the period), exactly as
> it appears in the doc. Fix it in the doc, then here.

### ⚠️ Keep the header and footer aligned across pages

There is **no templating** — the nav and footer are copied verbatim into all four
HTML files. **A change to one must be made in all four**, or the site silently
diverges depending on which page a visitor lands on. This applies to:

- the nav links (and which ones are commented out)
- everything between `<header class="nav">` and `</header>`
- everything inside `<footer>`, including the FPPC disclosure line

The **footer is byte-identical across all four pages** — it contains no
page-relative links, so it can be copied straight across. The **nav is not**:
`index.html` links to its own sections (`#community`), while sub-pages must use
`index.html#community`, and each page marks its own entry `aria-current="page"`.

Shared behaviour (nav toggle, footer year) lives in one place — `main.js` — so it
does **not** need syncing.

---

## Look and feel

### Color

Sampled from the logo and yard sign, then cooled toward magenta-berry (hue ~329°)
so the primary reads **Democratic, not Republican red**. All colors are CSS custom
properties at the top of `styles.css`.

| Token          | Hex       | Use                                        |
|----------------|-----------|--------------------------------------------|
| `--berry`      | `#B81A6A` | Primary — hero, footer, buttons, links     |
| `--berry-deep` | `#8E1A5A` | Button hover                               |
| `--navy`       | `#003048` | Text on gold (the Donate Now nav button)   |
| `--teal-deep`  | `#007890` | Eyebrows, credential tags                  |
| `--gold`       | `#F0A800` | Section rules, focus rings, Donate button  |
| `--cream`      | `#FBF7F4` | Page background                            |
| `--ink`        | `#1C2A33` | Body text                                  |
| `--muted`      | `#5E6B72` | Secondary text (leads, priority-card copy) |
| `--hairline`   | `#E7DDD8` | Borders                                    |
| `#F4ECE7`      | —         | `--surface-2`, the alternating section tint |

Defined but currently unused: `--plum` (`#6E1D53`, the old footer color) and
`--teal` (`#2A9D9D`).

**Home-page sections alternate** between cream and the `--surface-2` tint via
`.section:nth-of-type(even)`, which gives the longer page definition. Sub-pages
have a single section each, so they are always cream.

### Dark mode is disabled

The site is **light-only**. Both dark-theme blocks are commented out near the top
of `styles.css`, and `:root` declares `color-scheme: light` so browsers don't
auto-darken form controls or scrollbars. `[data-theme="dark"]` is deliberately
mapped to the *light* tokens, so a stale preference in a returning visitor's
`localStorage` can't produce a half-dark page.

To re-enable: un-comment both blocks in `styles.css` **and** the theme-toggle
`<li>` in the nav of all four pages. `main.js` already skips the toggle wiring when
the button is absent, so no JS change is needed.

### Type

- `--font-display` — slab-serif stack, used for `h1`/`h2`/`h3`, the nav brand, and
  the footer committee name.
- `--font-body` — system sans, everything else.

The display face is kept in **one variable** because the campaign may change it.
To switch to a real webfont: drop a `.woff2` into a `fonts/` folder, add an
`@font-face` rule at the top of `styles.css`, and change the first entry of
`--font-display`. Every headline updates automatically.

> Note: no webfont is currently loaded, so the display face falls through the
> stack per device — often Georgia on Mac/iOS. Headings will not look identical on
> every machine until a webfont is added.

### Interaction

Every clickable element has hover, active, and keyboard-focus feedback. Two worth
knowing about:

- `.btn` — hover lift, `:active` reset, and a 3px gold `:focus-visible` ring.
- `.plain-link` — used on the "Schedule an Individual or Group Conversation with
  me:" heading in Let's Connect. **At rest it is pixel-identical to a normal
  heading, by design.** The underline and berry color appear only on hover, active
  (which is what a touch user gets on tap), or focus.

### `#APlaceForEveryChild`

Always bold, always that exact casing, with any trailing period **outside** the
`<strong>`. Seven instances across the site currently follow this.

---

## Forms and donations

### Sign-up — one combined Google Form

At the client's request, supporter sign-up and yard-sign requests are collected by
a **single** Google Form, reached from the **Join the Movement** button in Let's
Connect (`#signup` in `index.html`) and from the footer's "Click here" link.

**The site links to the form rather than embedding it.** Google Forms embeds run in
an iframe that depends on third-party cookies; browsers increasingly block those by
default, and when they do the embed either fails to render or refuses to submit —
with no useful error for the visitor. Opening the form on `docs.google.com` makes
it first-party, so it works for everyone.

To point the site at a different form, replace the `docs.google.com` URL in the
`#signup` button. Use the bare `/viewform` URL with no query string (drop any
`?usp=…` or `?embedded=true`).

Setup — creating the form, choosing fields, routing response notifications — is
documented for hand-off in **[GOOGLE_FORMS_SETUP.md](GOOGLE_FORMS_SETUP.md)**.
**Skip its Step 4 embed code**; use the plain **Send → 🔗 link** URL instead.

> `GOOGLE_FORMS_SETUP.txt` is a byte-identical copy of the `.md` kept for
> non-technical hand-off. **They drift easily — update both, or retire one.**

**[FORM_PREFILL_OPTIONS.txt](FORM_PREFILL_OPTIONS.txt)** is a client-facing
explainer on pre-filling form fields from a link (e.g. a button that opens the form
with "yard sign" already ticked). Awaiting a decision from the campaign.

### Donations — Donorbox

Two entry points, both for campaign `allyson-lehrer-4-pvpusd`:

- **Donate Now** button in the nav of all four pages → opens `donorbox.org` directly.
- **Donate** section on the home page (`#donate`) → embedded Donorbox form widget.
- The **donor wall** on `endorsements.html` is a third embed.

These use two different vendor scripts — `widgets.js` (module) for the donation
form, `widget.js` for the donor wall. Both are Donorbox's own snippets; leave them
as supplied. The donor wall's color is set by `donor_wall_color` in its embed URL
(currently the brand berry `#B81A6A`); the donation form's styling is controlled in
the Donorbox dashboard, not here.

Both embeds load third-party scripts at runtime, so **they can only be verified in
a browser.** Test them, including in a private window with strict tracking
protection.

---

## ⚖️ Campaign compliance (California FPPC) — IMPORTANT

This is a political campaign website, so California disclosure rules apply.
**Confirm specifics with your treasurer or the FPPC — these are practical notes,
not legal advice.**

- **⚠️ Online donations are live.** The nav and home page both accept
  contributions via Donorbox. So the following applies *now*: contribution limits
  apply, contributors giving **$100+** must have employer/occupation recorded, and
  anonymous contributions over **$100** are prohibited. **Confirm with the
  treasurer** that the Donorbox form collects employer/occupation and carries the
  required committee disclosure.
- **Committee registration.** Once the campaign raises or spends **$2,000+** in a
  calendar year, it must file **Form 410** with the CA Secretary of State and will
  receive an **FPPC committee ID number**.
- **"Paid for by" disclosure.** The FPPC doesn't strictly *mandate* a disclaimer on
  a candidate's own website, but it **recommends** showing the committee name and
  ID. The footer carries it on all four pages. The committee name is set; the ID
  currently reads **"Coming Soon"** and must be replaced once Form 410 is filed.
- **Where a disclaimer IS mandatory** (for the wider campaign, not this site): mass
  mailings, robocalls, radio/TV ads, and **social media ads**.
- **Privacy.** The forms collect personal data. The site has no privacy section —
  see the TODO below.

References: FPPC 2025 Political Advertising Disclosures fact sheets and campaign
manuals (`fppc.ca.gov`).

### 📌 TODO: privacy notice → put it in the Google Form

The site previously had a **Privacy** section explaining how form submissions are
used. It was removed. **That detail belongs in the Google Form instead** — it's the
point where someone actually hands over their name, email, and address, so it's
where the notice is most likely to be read. Options, by effort:

1. Put it in the **form description**, visible before anyone starts typing.
2. Add it as a **section description** just above the contact fields.
3. Add a **required checkbox** if the campaign wants a recorded acknowledgement.

Suggested wording, adapted from the removed section — **have the treasurer or
counsel confirm before publishing**:

> Information you share through this form (such as your name, email, and address)
> is collected via Google Forms and used only by the campaign to contact you,
> coordinate volunteers and yard-sign delivery, and send campaign updates. We do
> not sell your information.

Still open wherever the notice lives: a contact address for data requests, and any
legally required reporting of contributor information.

---

## Working locally

Any static file server works — the site has no build step. For example:

```bash
python -m http.server 8080
```

Then open <http://localhost:8080/>. Opening the files directly with `file://` also
works, though relative links behave better over HTTP.

---

## Deploy to GitHub Pages

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds with Jekyll
and publishes to Pages on every push to `main`.

**One-time setup on GitHub:** Settings → Pages → Build and deployment →
**Source: "GitHub Actions"**. (Not "Deploy from a branch" — the workflow needs the
Actions source.)

```bash
git add .
git commit -m "Update campaign site"
git push
```

The site publishes at `https://<user>.github.io/<repo>/`. Watch the run under the
repo's **Actions** tab. To republish without a code change, use
**Actions → Deploy to GitHub Pages → Run workflow**.

### What gets published

[`_config.yml`](_config.yml) controls this. Anything under `exclude:` stays in the
repo but is never copied into the built site, so it has **no public URL**:

- `design-preview.html`
- `GOOGLE_FORMS_SETUP.md` and `GOOGLE_FORMS_SETUP.txt`
- `FORM_PREFILL_OPTIONS.txt`
- `README.md`

**Add any new internal file to that list**, or it will be published. Files and
folders starting with `.` or `_` (`.github/`, `.claude/`) are excluded by Jekyll's
defaults and don't need listing.

Jekyll runs only as a file filter — the site has no front matter, layouts, or
Liquid tags, so the HTML and CSS are copied through unchanged. All asset paths are
relative, so the site works fine under the `/<repo>/` subpath.

For a custom domain, add it under Settings → Pages and commit a `CNAME` file at the
repo root.

---

## ✅ Outstanding work

**Content**

- [ ] **Endorsements** — `endorsements.html` has the gratitude copy and donor wall,
  but **no actual endorser names or quotes yet**. Add them as they're confirmed.
- [ ] **FPPC ID** — replace "Coming Soon" in the footer of **all four pages** once
  Form 410 is filed.
- [ ] **Privacy notice** — add to the Google Form (see above), including a
  data-request contact.
- [ ] **Compliance review** — treasurer/FPPC sign-off on all disclosures before launch.
- [ ] **Hero wording** — the kicker currently reads "Elect For PV School Board".
  With the stars removed, the capital "For" mid-phrase reads oddly; confirm or reword.

**Verify in a browser**

- [ ] Donorbox **donation form** (home page) and **donor wall** (endorsements) both render.
- [ ] Instagram link resolves — `instagram.com/allysonlehrer4pvpusd`.
- [ ] The sign-up Google Form opens for a logged-out visitor (test in a private window).

**Naming and assets**

- [ ] Page `<title>`s still say "PV School Board" while the nav says "Palos Verdes
  School Board" — align if desired.
- [ ] The footer copyright reads "Allyson Lehrer 4 PVPUSD"; page titles use a
  different form of the name.
- [ ] `img/hero_image.png` and `img/headshot-cropped.jpeg` are unreferenced — use
  or delete.
- [ ] Replace `headshot-clean.jpeg` if a higher-res photo turns up — ideally an
  untilted original, removing the need for the corner repair entirely.

**Optional polish**

- [ ] Load a real headline webfont (see *Type*).
- [ ] Add a proper `favicon.ico` and a dedicated social share image (currently the
  logo is used for both).
- [ ] Dead CSS: `quote-card`, `endorse-grid`, `attribution`, `supporter-logos`,
  `btn-gold`, `btn-teal`, `btn-outline-light`, `tagline`, `hero-actions`,
  `priority-sub` are defined but unused.

---

*Design reference: open `design-preview.html` in a browser to see the palette and
components in isolation. It is excluded from the published site.*
