/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        // mobile (< 640px)
        base: {
          css: [
            {
              h1: { fontSize: '2rem' },
              h2: { fontSize: '1.25rem', fontWeight: 600 },
            },
          ],
        },
        // small (≥ 640px)
        sm: {
          css: [
            {
              h1: { fontSize: '2.5rem' },
              h2: { fontSize: '1.25rem' },
            },
          ],
        },
        // medium (≥ 768px)
        md: {
          css: [
            {
              h1: { fontSize: '3rem' },
              h2: { fontSize: '1.25rem' },
            },
          ],
        },
        lg: {
          css: [
            {
              h1: { fontSize: '3rem' },
              h2: { fontSize: '1.5rem' },
            },
          ],
        },
      },
    },
  },
}

export default config