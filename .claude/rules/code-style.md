---
description: Code style conventions for this project
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Code Style (TypeScript)

## TypeScript

- Strict mode always on, no `any` — use `unknown` + type guards instead
- Prefer `type` over `interface` unless extending
- No default exports except for Next.js pages/layouts

## Files

- File naming: kebab-case for files, PascalCase for component names
- One component per file

## Imports

- Absolute imports via `@/` alias, no relative `../../../`
- Group order: external packages → internal (`@/`) → relative → types

## Naming

- Booleans: `is`/`has`/`should` prefix (`isLoading`, `hasError`)
- Event handlers: `handleX` (component-local), `onX` (props)

## Formatting

- Prettier formats every edited file via the PostToolUse hook — don't argue with the formatter
- Max line length: 100 (soft limit, not enforced)
