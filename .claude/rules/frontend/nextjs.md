---
paths:
  - "src/app/**/*.tsx"
  - "src/components/**/*.tsx"
---

# Next.js Conventions

- Use App Router conventions — no pages/ directory
- Server Components by default, `"use client"` only when needed (state, effects, browser APIs)
- Data fetching in Server Components, not in `useEffect`
- Route handlers in app/api/**/route.ts, not pages/api/
- Metadata via generateMetadata, not next/head
