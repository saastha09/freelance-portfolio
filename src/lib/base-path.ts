// Set at build time when the site is served from a sub-path (e.g. GitHub Pages project sites).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBasePath = (path: string) => `${basePath}${path}`;
