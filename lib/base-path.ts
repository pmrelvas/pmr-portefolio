/**
 * Next.js only prefixes its own assets (`_next/*`, `next/link` hrefs and
 * `next/font` files) with `basePath` automatically. Files in `public/` that are
 * referenced by hand — `<img src>`, `next/image` (the default loader is disabled
 * for the static export) and metadata icons — must be prefixed explicitly.
 *
 * The deploy workflow sets `NEXT_PUBLIC_BASE_PATH` to the GitHub Pages
 * sub-path (`/pmr-portefolio` for a project site, empty for a user/organisation
 * site or a custom domain). It is empty when running locally.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a `public/`-relative path (e.g. `/assets/photo.webp`) with the base path. */
export function assetPath(path: string): string {
  return `${basePath}${path}`;
}
