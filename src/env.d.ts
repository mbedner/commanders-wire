/// <reference path="../.astro/types.d.ts" />
/// <reference types="@cloudflare/workers-types" />

type Runtime = import('@astrojs/cloudflare').Runtime<{
  ARTICLES_KV:    KVNamespace;
  REFRESH_SECRET: string;
  REWRITE_MODE:   string;
}>;

declare namespace App {
  interface Locals extends Runtime {}
}
