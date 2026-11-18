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
