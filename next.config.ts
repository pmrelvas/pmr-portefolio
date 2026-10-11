import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only, so `next build` writes a static
  // export to `out/` (deployed by .github/workflows/deploy.yml).
  //
  // Note: Cache Components / Partial Prefetching (PPR) cannot be combined with
  // `output: "export"`, so `cacheComponents`/`partialPrefetching` are omitted.
  output: "export",
  // The Pages workflow sets this to the site sub-path (`/pmr-portefolio` for a
  // project site; empty for a user/organisation site or a custom domain).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  // The default image loader needs a server, so images are served as-is.
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
