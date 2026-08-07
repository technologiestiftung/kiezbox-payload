![](<https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue>)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Kiezbox Landingpage ft. Payload CMS

A landing page for Kiezbox built with Payload CMS and Next.js, backed by Postgres. It provides a fully editable, block-based website with a Payload admin for managing pages, posts, media, and navigation.

## Prerequisites

- Node.js 22 (LTS)
- npm
- Docker (for the local Postgres database)

## Installation

```bash
docker compose up -d        # start Postgres (port 5433) and Adminer (port 8080)
cp .env.example .env        # then set DATABASE_URL, PAYLOAD_SECRET, etc.
npm install
```

Use a Postgres connection string in `.env`, e.g.:

```bash
DATABASE_URL=postgresql://postgres:example@127.0.0.1:5433/your-database-name
```

## Usage or Deployment

```bash
npm run dev         # start the dev server with hot reload
npm run build       # production build
npm run start       # run the production build
```

- Frontend: http://localhost:3000
- Payload admin: http://localhost:3000/admin

## Development

`npm run dev` runs Next.js with hot reloading for both the frontend and the Payload admin.

Helpful scripts:

```bash
npm run generate:types       # regenerate src/payload-types.ts after schema changes
npm run generate:importmap   # regenerate the admin import map after adding components
npm run lint                 # lint (use lint:fix to auto-fix)
```

## Tests

```bash
npm test             # run integration + e2e tests
npm run test:int     # integration tests (Vitest)
npm run test:e2e     # end-to-end tests (Playwright)
```

## Contributing

Before you create a pull request, write an issue so we can discuss your changes.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/LuiseBrandenburger"><img src="https://avatars.githubusercontent.com/u/61413319?v=4?s=64" width="64px;" alt="Luise Brandenburger"/><br /><sub><b>Luise Brandenburger</b></sub></a><br /><a href="https://github.com/technologiestiftung/template-default/commits?author=LuiseBrandenburger" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/julizet"><img src="https://avatars.githubusercontent.com/u/52455010?v=4?s=64" width="64px;" alt="Julia Zet"/><br /><sub><b>Julia Zet</b></sub></a><br /><a href="https://github.com/technologiestiftung/template-default/commits?author=julizet" title="Code">💻</a> <a href="#doc-julizet" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->

<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Content Licensing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/).

## Credits

<table>
  <tr>
    <td>
      Made by  <a href="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-de.svg" />
      </a>
    </td>
    <td>
      Supported by <a href="https://www.berlin.de/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-berlin.svg" />
      </a>
    </td>
  </tr>
</table>

## Related Projects
