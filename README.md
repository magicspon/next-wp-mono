[![Release](https://github.com/magicspon/sponanity/actions/workflows/release.yml/badge.svg)](https://github.com/magicspon/sponanity/actions/workflows/release.yml)
[![Units Tests](https://github.com/magicspon/sponanity/actions/workflows/test.yml/badge.svg)](https://github.com/magicspon/sponanity/actions/workflows/test.yml)
[![Lint & Typecheck](https://github.com/magicspon/sponanity/actions/workflows/lint.yml/badge.svg)](https://github.com/magicspon/sponanity/actions/workflows/lint.yml)

# W[Pon]press

## Quick start

Go to [Bedrock with DDEV](https://roots.io/bedrock/docs/bedrock-with-ddev/) and create a new project.

Copy `env.example` into apps/web and apps/cms and rename to `.env.local`

```bash
cp env.example apps/cms/.env
cp env.example apps/web/.env.local
```

## Installation

Use `node` version 20 or more.

```bash
mpm install
npm run dev
```

`https://localhost:3000` Next

`https://localhost:6006` Storybook

### Features

- Wordpress (bedrock infrac)
- Typescript
- Tailwind
- Radix UI
- React Query
- Nextjs
- Type-safe ENV
- Storybook
- Turbo Gen
- Eslint
- Prettier
- Commitlint
- Lintstaged
- Playwright
- Vitest

### Structure

```
.husky
 └─ pre commit lint/format hooks
apps
  └─ cms
      ├─ wordpress/bedrock
  └─ web
      ├─ Next.js 14
packages
 └─ eslint-config
 └─ hooks - react hooks
 └─ tailwind-config
 └─ tsconfig-config
 └─ ui - Ui primitives
 └─ utils - Shared utils
turbo
  └─ generators - code scaffold
```

### Code scaffold

`npm run new:component` scaffold a new react component with tests and stories

`npm run new:hook` scaffold a new react hook with tests

`npm run new:fn` scaffold a new function with tests

`npm run new:context` scaffold a new react context

`npm run new:page` scaffold a new nextjs app router page (with an optional e2e test)

### Path Alias

`~` points to src/\*

```javascript
import { Header } from '~/components/Header'
```

### Contributing

All commit messages must adhere the commitlint conventions

```base
feat: support chinese title

fix: fix a subject bug

docs: update README.md

refactor: update comments
```
