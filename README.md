# Prajol Kharel — Portfolio & Blog

Astro site on Vercel with a visual, no-code admin panel powered by
**Keystatic** — a modern, open-source, git-based CMS built specifically for
frameworks like Astro. Content lives as markdown/YAML files in this repo;
editing it through `/keystatic` just commits (or opens a PR) on your behalf.

## Why Keystatic (and not Decap CMS anymore)

This project previously used Decap CMS. It's been replaced because:

- **Modern editor UI** instead of Decap's dated interface.
- **No popup-based OAuth.** Decap opens a popup window to authenticate,
  which browser ad-blockers/privacy extensions commonly block, crashing with
  a `null.focus()` error. Keystatic authenticates via a normal full-page
  redirect, so that entire class of bug doesn't exist here.
- **Direct mapping onto this repo's content collections** — singletons for
  site-wide settings and each homepage section, collections for projects
  and blog posts, all reading/writing the exact same files Astro already uses.

One honest limitation carried over either way: Keystatic's admin doesn't
render a live, fully-styled iframe preview of the real page while you type
(that specific feature — true inline WYSIWYG editing on the live site — is
TinaCMS's specialty, not Keystatic's). To check how a change actually looks,
save it and view your Vercel preview deployment. If pixel-perfect live
preview turns out to matter more to you than everything else, it's worth
revisiting TinaCMS instead — just ask.

## What's inside

```
keystatic.config.ts          ← defines every editable field in the CMS
src/
  content/
    settings/general.yml     ← name, email, avatar, social links, résumé, footer
    sections/*.md            ← Hero, About, Projects, Skills, Blog, Contact
                                (order + visible on each = reorder/hide from admin)
    projects/*.md            ← one file per project
    blog/*.md                ← one file per blog post
  components/                ← one Astro component per section type
                                + SocialIcon.astro (icon lookup for social links)
  layouts/BaseLayout.astro
  pages/
    index.astro                ← reads all sections, sorts by order, renders
    admin.astro                 ← redirects old /admin bookmarks to /keystatic
    blog/index.astro, blog/[slug].astro
```

## 1. Push this to GitHub

If you haven't already, push this project to `TheKnight11/My-Portfolio-`
(or update the `repo` value in `keystatic.config.ts` to match wherever it
actually lives).

## 2. Create a GitHub App for Keystatic

Keystatic's GitHub storage mode authenticates through a **GitHub App**
(not a plain OAuth App). Keystatic can generate this for you automatically:

1. Run `npm install` then `npm run dev` locally.
2. Visit `http://localhost:4321/keystatic`. Keystatic will detect that
   GitHub mode isn't configured yet and walk you through creating the
   GitHub App — it opens GitHub's "create a new app" screen pre-filled with
   the right settings (Contents: read/write, Metadata: read-only, Pull
   requests: read-only; callback URL `.../api/keystatic/github/oauth/callback`).
3. After creating the app, generate a **client secret** on the app's GitHub
   settings page and copy it immediately (GitHub only shows it once).
4. Keystatic writes four values into a local `.env` file for you:
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=...
   KEYSTATIC_GITHUB_CLIENT_SECRET=...
   KEYSTATIC_SECRET=...              (a random session-signing secret)
   PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...
   ```
5. **Install the GitHub App** on your repository (GitHub will prompt you
   during the flow above) so it actually has permission to commit to it.

If you'd rather set this up manually, `.env.example` lists the same four
variables — `npm run generate-secret` will generate a value for
`KEYSTATIC_SECRET` if you're filling this in by hand.

## 3. Deploy to Vercel

1. Import the repo into Vercel (Astro is auto-detected; the `@astrojs/vercel`
   adapter is already configured in `astro.config.mjs`).
2. In **Project Settings → Environment Variables**, add the same four
   `KEYSTATIC_*` values from your local `.env`.
3. Deploy.
4. Back in your GitHub App settings, double check the **callback URL** is
   set to your real deployed domain:
   `https://YOUR-SITE.vercel.app/api/keystatic/github/oauth/callback`

## 4. Log in and edit

Visit `https://YOUR-SITE.vercel.app/keystatic` (the old `/admin` URL now
just redirects here), sign in with GitHub, and you'll see:

- **Site Settings** — your name, email, tagline/bio, avatar photo, favicon,
  footer text, résumé upload, and a repeatable **Social Links** list (each
  link has a platform name, an icon picker, and a URL — Hero, Contact, and
  the footer all pull from this one place, so there's a single source of
  truth instead of duplicated fields).
- **Section: Hero / About / Projects / Skills / Blog / Contact** — each is
  its own entry with an `Order` number and a `Visible` toggle. Change the
  order to reorder the homepage; switch `Visible` off to hide a section
  without deleting its content.
- **Projects** — add, edit, or delete entries freely: cover image, tags,
  links, an optional downloadable PDF, and a full markdown write-up.
- **Blog Posts** — draft, edit, publish (uncheck "Draft"), or delete posts,
  each with a cover image and an optional downloadable file.

Every image/file field is a drag-and-drop uploader that saves into
`public/uploads` and links itself automatically.

## Local development

```bash
npm install
npm run dev
```

The admin at `/keystatic` talks to the same GitHub repo whether you're
running locally or on Vercel, so edits always land as real commits you can
see in your repo's history.

## Notes & honest limitations

- **Adding a brand-new section type** (something beyond Hero, About,
  Projects, Skills, Blog, Contact) still needs a short code change: a new
  Astro component, a new singleton block in `keystatic.config.ts`, and one
  new entry in `componentMap` in `src/pages/index.astro`. Reordering,
  hiding, and editing the six existing section types needs zero code changes.
- The contact form has no backend by default — submitting it just shows a
  confirmation locally. Set `Form Endpoint` on the Contact section to a
  form-handling URL (e.g. a free Formspree endpoint) to actually receive
  messages.
- New social link icons: the icon picker currently covers GitHub, LinkedIn,
  Twitter/X, Strava, Email, WCA, and a generic fallback. Adding a genuinely
  new icon (not just a new platform using an existing icon) means adding one
  SVG path to `src/components/SocialIcon.astro`.
