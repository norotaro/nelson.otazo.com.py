# nelson.otazo.com.py

Personal site of Nelson Otazo. Static site built with [Astro](https://astro.build) and plain CSS, deployed to Netlify.

## Develop

Requires the Node version in `.nvmrc`.

```sh
npm install
npm run dev      # local server
npm run verify   # type check, build and output checks
```

## Layout

- `src/content/` content collections: experience, projects, blog posts (Spanish).
- `src/styles/` design tokens and global CSS.
- `src/i18n/` locale strings and the explicit map of translated page pairs.
- `src/pages/` one file per route; blog posts keep the old URLs (`/blog/post/<slug>`, `/blog/page/N`).
- `src/assets/blog/` post covers that Astro resizes. The same files stay in `public/img/blog/` because old links point there; update both when a cover changes.
- `scripts/check-dist.mjs` checks the built site: old URLs, copy rules, page structure and image sizing. It runs as part of `npm run verify`.

## CV

`/cv` is built from the experience and projects collections plus `src/data/cv.ts` (summary, skills, education, languages). Each job shows its site bullets, then its optional `cvExtra` bullets, which appear on the CV only.

The downloadable PDF is `public/nelson-otazo-cv.pdf`, printed from `/cv` with Chrome. After changing any CV content, regenerate it and commit it with the change:

```sh
npm run cv:pdf
```

## Writing a post

Add `src/content/blog/<slug>.md` with `title`, `description`, `date`, and optionally `img`, `category` and `tags`. The slug becomes the URL, so never rename a published one. A cover named in `img` goes in both `src/assets/blog/` and `public/img/blog/`.
