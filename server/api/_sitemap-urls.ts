import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
    let paths = [];

  const docs = await serverQueryContent(event).find();
  for (const doc of docs) {
    paths.push({ loc: doc._path, lastmod: doc.date, changefreq: 'monthly' })
  }

  return paths;
});