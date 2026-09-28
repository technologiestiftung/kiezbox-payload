---
description: Security requirements for this project
---

# Security

## Secrets & credentials
- `.env` files are blocked via hook — Claude has no read/write/create/delete access to them
- Env vars are managed exclusively by developers, never by Claude
- If a task seems to require reading or editing `.env`, stop and ask the developer instead of working around it
- Never hardcode API keys, tokens, or passwords as a substitute for env access
- Never log secrets, tokens, or full request/response bodies containing credentials

## Input validation
- Validate and sanitize all user input server-side, even if validated client-side
- Use a schema validator (e.g. Zod) for API route inputs
- Never trust query params, form data, or headers without validation

## API routes
- Check authentication/authorization on every protected route handler
- Rate-limit public-facing endpoints
- Return generic error messages to clients — no stack traces or internal details in production responses

## Database / GeoServer
- Use parameterized queries — never string-concatenate SQL
- Principle of least privilege for DB/GeoServer service accounts
- No direct DB credentials in frontend code, ever

## Dependencies
- Run `npm audit` / `pip audit` on anything new and flag known CVEs before installing
- Don't silently upgrade major versions of security-relevant packages (auth, crypto) — mention it

## Data protection (GDPR-relevant)
- Don't log personally identifiable information (names, emails, IPs) in plaintext
- Flag any new data collection point (forms, tracking) that might need a privacy review
- No personal data in error messages sent to error-tracking tools

## Frontend
- Sanitize any HTML rendered via `dangerouslySetInnerHTML` — flag it if used
- No sensitive data in localStorage/sessionStorage
- CSP headers: don't loosen `unsafe-inline`/`unsafe-eval` without flagging it

## When in doubt
- If a change touches auth, payments, or personal data — flag it explicitly, don't assume it's fine