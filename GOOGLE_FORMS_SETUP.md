# Google Forms Setup Guide

This guide walks through creating the **two sign-up forms** for the Allyson Lehrer
campaign website and connecting them so submissions reach
**allysontschwartz@gmail.com**.

> **Who this is for:** whoever owns the Google account the forms will live in (a
> campaign staffer or volunteer). The forms do **not** need to live in the
> candidate's personal account — notifications can be routed to
> `allysontschwartz@gmail.com` regardless of which account hosts the forms.

You will create two forms:

1. **Become a Supporter** — supporter info collection
2. **Request a Yard Sign** — yard-sign request

When finished, you'll copy an **embed code** for each and hand both back to whoever
maintains the website (or paste them in yourself — see *Step 5*).

---

## How Google Forms delivers responses (read this first)

A Google Form does **not** "email a form to an address" like an old-style contact
form. Instead:

- Every submission is stored in the form's **Responses** tab (and, optionally, a
  linked **Google Sheet**).
- You separately turn on **email notifications** so a chosen inbox is alerted on each
  new response.

So "send submissions to `allysontschwartz@gmail.com`" is accomplished in **Step 3**
below by turning on notifications and/or sharing the response sheet with that address.

---

## Step 1 — Create the two forms

1. Go to <https://forms.google.com> and sign in with the account that will own the forms.
2. Click **Blank form** (the `+` tile). Repeat later for the second form.

### Form A: "Become a Supporter"
- **Title:** `Become a Supporter`
- **Description:** `Sign up for campaign updates and ways to help elect Allyson Lehrer.`
- **Suggested fields** (click **+** to add each; set *Required* where noted):

  | Field label            | Type              | Required |
  |------------------------|-------------------|----------|
  | Full name              | Short answer      | ✅       |
  | Email                  | Short answer\*    | ✅       |
  | ZIP code               | Short answer      | ✅       |
  | Phone (optional)       | Short answer      |          |
  | I'd like to…           | Checkboxes        |          |
  | &nbsp;&nbsp;→ options: `Get updates`, `Volunteer`, `Host an event`, `Display a yard sign` | | |

  \*For Email, click the **⋮** on the question → **Response validation** → *Text →
  Email* so only valid addresses are accepted.

### Form B: "Request a Yard Sign"
- **Title:** `Request a Yard Sign`
- **Description:** `Request a yard sign and we'll arrange delivery.`
- **Suggested fields:**

  | Field label            | Type              | Required |
  |------------------------|-------------------|----------|
  | Full name              | Short answer      | ✅       |
  | Email                  | Short answer\*    | ✅       |
  | Phone                  | Short answer      |          |
  | Delivery address       | Paragraph         | ✅       |
  | Number of signs        | Short answer      |          |
  | Notes (optional)       | Paragraph         |          |

---

## Step 2 — (Recommended) Collect email addresses & responses in a Sheet

For each form:

1. Open the **Responses** tab.
2. Click **Link to Sheets** → **Create a new spreadsheet** to store all submissions
   in a Google Sheet (easy to browse, export, and share).

---

## Step 3 — Route notifications to allysontschwartz@gmail.com

This is the step that "sends" submissions to the target inbox. Do this for **both**
forms. Choose whichever option fits.

### Option A — Built-in notifications (simplest)
1. In the form, open the **Responses** tab.
2. Click the **⋮** (three-dot menu) in the top-right of that tab.
3. Select **Get email notifications for new responses**.
   - ⚠️ This notifies the **signed-in account's** email. If the forms live in an
     account *other than* `allysontschwartz@gmail.com`, use Option B or C so that
     inbox is the one alerted.

### Option B — Share the response Sheet (so Allyson can see everything)
1. Open the linked Google Sheet (from Step 2).
2. Click **Share**, add **allysontschwartz@gmail.com**, give **Editor** or **Viewer**
   access.
3. (Optional) In the Sheet: **Tools → Notification settings** → *Notify me… any changes
   are made / a user submits a form* → set to email. Combined with sharing, this can
   push alerts to the shared address.

### Option C — Add-on to email a specific address (most flexible)
If you need every submission emailed directly to `allysontschwartz@gmail.com`
regardless of who owns the form:
1. In the form, click the **⋮** → **Get add-ons**.
2. Install a notifications add-on such as **"Email Notifications for Google Forms"**
   (by Digital Inspiration) or **"Form Notifications."**
3. Configure it to send each new response to **allysontschwartz@gmail.com**.
   (Free tiers exist; check current limits.)

> **Recommended combo:** Option B (share the Sheet with Allyson) **plus** Option A or C
> for instant email alerts.

---

## Step 4 — Get the link for each form

> **⚠️ Use the link, not the embed code.** The website links out to the form
> instead of embedding it, because embedded Google Forms rely on third-party
> cookies that many browsers now block — for those visitors the embed fails to
> load or won't submit. What the site needs is the plain share link:
>
> 1. Click **Send** (top-right) → the **🔗 (link)** tab.
> 2. Leave **Shorten URL** unchecked and click **Copy**.
> 3. You'll get a URL ending in `/viewform`. That's what goes in `index.html`.
>
> The embed instructions below are kept for reference only.

For **each** form:

1. Click **Send** (top-right).
2. Choose the **`< >`** (Embed HTML) tab.
3. Adjust height if you like (e.g. `800`), then click **Copy**.
4. You'll get an `<iframe>` like this:

   ```html
   <iframe src="https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true"
           width="100%" height="800" frameborder="0" marginheight="0" marginwidth="0">
     Loading…
   </iframe>
   ```

5. Label which is which (Supporter vs. Yard Sign) and hand both back to the website
   maintainer — **or** paste them yourself in Step 5.

> Also make sure each form's sharing setting allows public responses: **Send → link →**
> ensure "Restrict to users in your organization" is **off** so anyone visiting the
> site can submit.

---

## Step 5 — Put the link into the website

The site currently uses **one combined form** for both supporter sign-up and
yard-sign requests, exposed as a button in the *Let's Connect* section.

In **`index.html`**, find the block with `id="signup"` and replace the `href` on the
**"Join the Movement"** button with your `/viewform` URL from Step 4:

```html
<a class="btn btn-primary btn-lg"
   href="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"
   target="_blank" rel="noopener">
  Join the Movement <span aria-hidden="true">↗</span>
</a>
```

Use the bare `/viewform` URL — strip any trailing `?usp=…` or `?embedded=true`.
That's the only place the form URL appears.

---

## Quick checklist

- [ ] Form A "Become a Supporter" created with fields
- [ ] Form B "Request a Yard Sign" created with fields
- [ ] Email question uses email validation on both forms
- [ ] Responses linked to a Google Sheet (both forms)
- [ ] Notifications routed to **allysontschwartz@gmail.com** (Option A/B/C)
- [ ] Public response setting confirmed (not org-restricted)
- [ ] Share **link** copied (Send → 🔗), not the embed code
- [ ] Link pasted into the `#signup` button in `index.html`
- [ ] Test-submit each form and confirm the alert reaches allysontschwartz@gmail.com
