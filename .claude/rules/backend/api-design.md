---
paths:
  - "app/api/**/*.ts"
  - "src/api/**/*.ts"
---

# API Development Rules

- Validate every request input with a schema (e.g. Zod) before using it
- Error responses use `{error format — define here, e.g. { "error": { "code", "message" } }}`
- Include OpenAPI documentation comments
