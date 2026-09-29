---
paths:
  - "app/**/*.tsx"
  - "components/**/*.tsx"
---

# Tailwind Conventions

## Class handling
- Use `clsx`/`cn()` for conditional classes — never string concatenation
- No arbitrary values (`w-[123px]`, `text-[#ff0000]`) unless no token fits — add a comment explaining why
- Extract repeated class combinations into a `cn()` helper or component, not copy-pasted strings

## Class order
Follow this order (matches Prettier plugin if installed):
1. Layout (`flex`, `grid`, `block`)
2. Positioning (`relative`, `absolute`, `inset-*`)
3. Box model (`w-*`, `h-*`, `p-*`, `m-*`)
4. Typography (`text-*`, `font-*`, `leading-*`)
5. Color/background (`bg-*`, `text-*` color, `border-*`)
6. Effects (`shadow-*`, `opacity-*`, `rounded-*`)
7. State (`hover:*`, `focus:*`, `disabled:*`)
8. Responsive (`sm:*`, `md:*`, `lg:*`)

## Design tokens
- Use `theme.colors`/`theme.spacing` from `tailwind.config.ts` — no hardcoded hex values in components
- New color needed? Add it to the config first, don't inline it
- Spacing: stick to the default scale (4px steps) unless there's a real layout need

## Responsive design
- Mobile-first: base styles = mobile, add `sm:`/`md:`/`lg:` for larger screens
- Don't add a breakpoint prefix unless the layout actually changes at that size

## Dark mode (if applicable)
- Use `dark:` variant, not separate component logic
- Test both modes when touching shared components (buttons, cards, inputs)

## Component patterns
- Variant-heavy components (buttons, badges) → use `cva` (class-variance-authority), not nested ternaries
- Don't override Tailwind with custom CSS unless Tailwind genuinely can't do it