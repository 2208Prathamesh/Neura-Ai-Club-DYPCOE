// Resolves files from /public so the site works under any base path.
export const asset = (p) => `${import.meta.env.BASE_URL}${p}`

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
