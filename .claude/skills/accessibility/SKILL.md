---
name: accessibility
description: Accessibility rules for TSB frontends — WCAG 2.1 AA / BITV 2.0 requirements, semantic HTML, keyboard support, focus management, forms, ARIA, and testing. Use when building or reviewing any UI component, form, modal, menu, map, or chart, and whenever the user mentions accessibility, a11y, BITV, WCAG, screen readers, or keyboard navigation.
---

# Accessibility

For a public-sector digital service this is not a nice-to-have. German public bodies are
bound by **BITV 2.0**, which applies **EN 301 549** and with it **WCAG 2.1 level AA**.
Treat AA as the floor, not the target.

> Confirm the exact obligations for a given project (BITV 2.0, LGBG Berlin, BFSG, the
> required accessibility statement and its deadlines) with the responsible person at TSB.
> Do not state legal conclusions in project documentation without that check.

## The short version

If you do only five things, do these:

1. Use the correct HTML element.
2. Make every interaction work with the keyboard alone.
3. Keep a visible focus indicator.
4. Label every input.
5. Never signal meaning with colour alone.

## Semantic HTML first

The right element gives you role, keyboard behaviour, and screen-reader support for free.
ARIA gives you none of that — it only relabels.

- An action is a `<button>`. A navigation is an `<a href>`. Never a `<div onClick>`.
- `<button type="button">` inside a form, unless it really is the submit button.
- One `<h1>` per page; do not skip heading levels to get a font size — that is Tailwind's job.
- Landmarks: `<header> <nav> <main> <footer>`, exactly one `<main>`.
- Lists are `<ul>`/`<ol>`. Tables are `<table>` with `<th scope="col|row">` and a `<caption>`.
- A "skip to content" link as the first focusable element on the page.

**Rule:** reach for ARIA only when no native element does the job. A wrong ARIA attribute
is worse than none.

## Keyboard

- Everything reachable by mouse is reachable by `Tab`, and the order follows the visual order.
- No positive `tabindex`. `tabindex="0"` to add, `tabindex="-1"` to focus programmatically.
- Never remove the focus ring. Style it instead — Tailwind `focus-visible:ring-2` with
  enough contrast against its background.
- `Escape` closes dialogs, menus, and popovers.
- Dialogs trap focus while open, return focus to the trigger on close, and mark the rest
  of the page inert.
- No keyboard trap anywhere: if focus can enter, it can leave.

## Focus management in a SPA-like app

Client-side navigation does not move focus the way a full page load does. On route change,
move focus to the new page's `<h1>` (give it `tabindex="-1"`) or to a `<main>` and announce
the new page title. Otherwise a screen-reader user stays parked on the old link.

## Forms

- Every input has a real `<label for>`. A placeholder is not a label — it disappears on typing.
- Group related controls in `<fieldset>` with a `<legend>` (radio groups, address blocks).
- Mark required fields in the text as well as with `required`; do not rely on an asterisk alone.
- Errors: set `aria-invalid`, link the message with `aria-describedby`, put the message next
  to the field, and summarise all errors at the top with links to each field.
- Move focus to the error summary on a failed submit.
- Use the right `type` and `autocomplete` — it helps everyone, and it is a WCAG AA criterion.
- Never block paste.

## Visual

- Contrast: **4.5:1** for body text, **3:1** for large text (≥ 24px, or ≥ 19px bold) and for
  UI component boundaries and focus indicators.
- Colour is never the only carrier of meaning. A red border needs an icon or a message too.
- The page works at **200% zoom** and at **320px** width without horizontal scrolling.
- Respect `prefers-reduced-motion` — wrap non-essential animation in the media query.
- Do not disable pinch zoom (`user-scalable=no` is a fail).
- Target size at least 24×24px, with spacing.

## Images, icons, media

- Informative image: `alt` describing the information, not the picture.
- Decorative image: `alt=""` so it is skipped.
- Icon-only button: an `aria-label`, or visually hidden text inside.
- Do not put text in an image.
- Video needs captions; audio needs a transcript.

## Language and copy

- `<html lang="de">`, and `lang` on any passage in another language.
- Link text makes sense alone — "Mehr erfahren" repeated eight times is a failure.
  "Mehr über das Förderprogramm erfahren" works.
- Page `<title>` is unique and describes the page.
- Public-sector German: prefer plain language; consider *Leichte Sprache* where the
  audience calls for it.

## Charts and maps

These are where public-sector frontends usually fail. A canvas or SVG visualisation is
invisible to a screen reader by default.

- Provide the underlying data as an accessible `<table>`, or a link to it.
- Give the SVG `role="img"` and an `aria-label`, or a `<title>` as its first child.
- A map needs a non-map route to the same information — a list or table of the features.
- Do not rely on hover to reveal information: it excludes keyboard and touch users.

## Testing

Automated tooling catches perhaps a third of real issues. It is necessary, not sufficient.

- `eslint-plugin-jsx-a11y` in the lint step.
- `axe-core` (via `@axe-core/playwright` or `jest-axe`) on key pages in CI.
- **Manual pass on every UI pull request:** unplug the mouse and complete the flow with
  `Tab`, `Enter`, `Space`, arrows, and `Escape`.
- Check at 200% zoom and at 320px.
- Test with a real screen reader on significant features — VoiceOver on macOS, NVDA on
  Windows.

## When reviewing code

Flag these on sight: `<div>` or `<span>` with a click handler, `outline: none` without a
replacement, an input without a label, an icon button without an accessible name, a
positive `tabindex`, `alt` text that starts with "Bild von", a modal that does not trap
focus, a colour-only state, and `aria-*` on an element that already has the behaviour natively.
