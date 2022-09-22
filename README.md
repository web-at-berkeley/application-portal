# WDB Next.js Template

Welcome to WDB's Next.js template! This project has a Next.js frontend set up but doesn't include a backend. It should usually only be used for static sites or projects where the backend functionality is embedded directly with the frontend (e.g. when using Firebase). For projects that need a normal backend, see the [monorepo template](https://github.com/web-at-berkeley/monorepo-template). It's pretty opinionated so feel free to make any changes to fit your project.

# Getting Started

For PMs: Click the green "Use this template" button at the top of this page to make a new repository for your project (it usually should be created under the WDB organization).

Here's how to get started with development:

1. Make sure you have [Node.js](https://nodejs.org/en/) and [VS Code](https://code.visualstudio.com/download) installed.
2. Clone the repository by running `git clone <your repository link>` in your terminal. Don't clone the template directly; instead clone the repository your PM made from the template.
3. Open the project folder in VS Code.
4. [Recommended] Navigate to the Extensions tab in VS Code and type "@recommended" in the search bar. Install all of the extensions listed under "Workspace Recommendations" section and restart VS Code if prompted. See the [Recommended Extensions](<#Recommended Extensions>) section for a list of the extensions and their descriptions.
5. Check if you have [Yarn](https://yarnpkg.com/) installed by running `yarn -v` in your terminal. If you don't have it installed, run `npm install -g yarn`.
6. In the project directory, run `yarn` to install dependencies.
7. Run `yarn dev` to start the development server.

# Development Tasks

There are some initial development tasks which should be completed to set up the project. Many are marked with a "TODO" comment in the code, but here's the full list:

1. Change the package name in `package.json`.
2. Set up Chakra UI colors - change the 'TODO' key in the `colors` field found in [`src/utils/theme.ts`](src/utils/theme.ts) to a name that fits the project, like `politiq` or `weekly`. Replace the colors referenced by components (e.g. `color="TODO.blue"`) with the new name. Add any other colors that are used by the project. See [here](https://chakra-ui.com/docs/styled-system/theme#colors) for more info.
3. Set up fonts - change the fonts listed in the `fonts` field found in [`src/utils/theme.ts`](src/utils/theme.ts) to whatever fonts you're using. As long as you still use Google Fonts, new fonts can be added by just changing the font name in the `link` tag found in [`src/pages/_document.tsx`](src/pages/_document.tsx) from Inter to another font.
4. Change the color of the Next.js progress bar in [`src/pages/_app.tsx`](src/pages/_app.tsx) by changing the `color` prop of the `NextNProgress` component to fit with the project.
5. [Recommended] Create Chakra UI component variants - if using a design system or if there's any component styles that are frequently reused (e.g. similar looking buttons, etc.), then create Chakra UI component variants for them in [`src/utils/theme.ts`](src/utils/theme.ts). See [here](https://chakra-ui.com/docs/styled-system/customize-theme#customizing-component-styles) for more info.
6. Delete [`src/pages/test.tsx`](src/pages/test.tsx), and replace the contents of [`src/pages/index.tsx`](src/pages/index.tsx) and [`src/pages/404.tsx`](src/pages/404.tsx) since they're just placeholders.
7. Make sure to include proper titles for each page in the site - see the `Head` component in [`src/pages/index.tsx`](src/pages/index.tsx) for an example.
8. Replace the favicon at [`public/favicon.ico`](public/favicon.ico) with the project's favicon.
9. Delete or replace [`public/images/logo.png`](public/images/logo.png) since it's an unused placeholder.
10. [Optional] Customize the error modal in [`src/pages/_app.tsx`](src/pages/_app.tsx) if needed.

# Template Details

There's a lot of different components in this template, so here's an overview of what's included and why:

## Next.js

[Next.js](https://nextjs.org/) is used as the frontend framework since it's currently the de facto standard for writing React and has a ton of great features for making development easier. Here's the structure for Next.js-related files (most frontend development will be done here):

- [`src/pages`](src/pages) - contains all of the pages for the site
- [`src/components`](src/components) - contains all of the components for the site; should be organized by page and/or use case (e.g. [`src/components/utils`](src/components/utils))
- [`src/utils`](src/utils) - contains utility functions and types which aren't React-specific
- [`public`](public) - contains static files which are served by the server (e.g. images, favicons, etc.)
  - images should be in [`public/images`](public/images) and ideally organized into folders

## Yarn

[Yarn](https://yarnpkg.com/cli/install) is used as the package manager since it's generally faster than NPM due to its caching mechanisms. It also works better with [monorepos](https://en.wikipedia.org/wiki/Monorepo), and even though this isn't a monorepo it's useful to be consistent with the [monorepo template](https://github.com/web-at-berkeley/monorepo-template). NPM commands that install packages should fail to avoid conflicting with Yarn (configured in [`.npmrc`](.npmrc)). Here's the list of commands to use instead:

- `yarn` (replaces `npm install`) - install all dependencies
- `yarn add <package>` (replaces `npm install <package>` - install a package
- `yarn remove <package>` (replaces `npm uninstall <package>`) - remove a package
- `yarn <script>` (replaces `npm run <script>`) - run a script defined in `package.json` (the NPM script still works in this case)

## TypeScript

[TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) is used over JavaScript as it makes catching type-related bugs much easier. Although it can occasionally get in the way via cryptic errors, TypeScript ends up saving a ton of time in the long run and should almost always be used for any web development project. You shouldn't need to write manual type annotations too often due to type inference, but they should always be included when components have props (see the `SkeletonAvatarProps` interface in [`src/components/SkeletonAvatar.tsx`](src/components/utils/SkeletonAvatar.tsx) for an example). The project's TypeScript settings are defined in [`tsconfig.json`](tsconfig.json).

## Chakra UI

[Chakra UI](https://chakra-ui.com) is WDB's UI library of choice. It's a great library that makes styling and implementing design systems really easy. Chakra is pretty customizable and even directly writing CSS is possible via an [escape hatch](https://chakra-ui.com/docs/styled-system/the-sx-prop), so ideally all styling should be done through Chakra (i.e. no need to create CSS files). The project theme is defined in [`src/utils/theme.ts`](src/utils/theme.ts) and should be edited to fit the project. Chakra also includes a ton of icons through the `@chakra-ui/icons` package, so it's a good idea to use icons from there where possible since their designs are consistent with Chakra's components.

## Next.js Progress Bar

This is a drop-in progress bar component from the [`nextjs-progressbar`](https://github.com/apal21/nextjs-progressbar) package that's used to show the user that the page is loading when they click on links. It's completely optional and more of a stylistic/UX choice, so feel free to remove it. The progress bar is used in [`src/pages/_app.tsx`](src/pages/_app.tsx) via the `NextNProgress` component.

## Error Boundary

The error boundary component from the [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) package is used to catch errors in the React component tree and display a modal with the error message. Including this avoids the entire page from going blank when there's an error in the website. The error boundary is used in [`src/pages/_app.tsx`](src/pages/_app.tsx) via the `ErrorBoundary` component. The contents of the modal can be edited to fit the project if needed.

## Utility Components

The template also includes various utility React components in [`src/components/utils`](src/components/utils) which should be useful for most projects. Feel free to remove any that aren't needed. Here's the list:

- Link components - these should almost always be used over the `Link` components from Next.js or Chakra UI:
  - [`NextLink`](src/components/utils/NextLink.tsx) combines Chakra Link and Next Link into a single component which allows styling links with Chakra while also using the Next router
  - [`PlainLink`](src/components/utils/PlainLink.tsx) does the same except it has no styling/underline on hover, which is useful for navbars and other links that don't need to look like links
  - [`ButtonLink`](src/components/utils/ButtonLink.tsx) combines Chakra Button and Next Link into a single component and is useful for any place where buttons are used as links
- [`Responsive`](src/components/utils/Responsive.tsx), [`DesktopOnly`](src/components/utils/DesktopOnly.tsx), and [`MobileOnly`](src/components/utils/MobileOnly.tsx) are all useful for responsive design
- [`SkeletonAvatar`](src/components/utils/SkeletonAvatar.tsx) is a useful component for displaying a placeholder skeleton while e.g. profile pictures are loading

## Prettier

[Prettier](https://prettier.io/) is used to format the code. It's configured in [`.prettierrc`](.prettierrc) (everything is set to default).

## ESLint

[https://eslint.org/](ESLint) is used to lint the code, meaning it automatically checks for logic and stylistic errors. It's configured in [`.eslintrc.js`](.eslintrc.js). The settings are highly opinionated so feel free to change them, but I've included most rules in there for a reason - in the long run, linting avoids bugs and makes sure code is consistent even when it's written by a bunch of people. Linting errors can sometimes be pretty annoying to fix though, so I've tried to make it as painless as possible by setting up ESLint to automatically fix issues whenever you save a file in VS Code and right before you commit. Some errors can also be fixed in VS Code by hovering over the error and selecting "Quick Fix". Finally, you can also manually run `yarn lint` to check for and fix ESLint issues. With that said, here's some highlights from the list of enabled rules:

- All recommended rules from [ESLint itself](https://eslint.org/docs/latest/rules/), the [ESLint Import Plugin](https://github.com/import-js/eslint-plugin-import), [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin), [Prettier](https://github.com/prettier/eslint-config-prettier), and [Next.js](https://nextjs.org/docs/basic-features/eslint#core-web-vitals)
- No unreachable code
- Miscellaneous `@typescript-eslint` rules to ensure that code is type-safe
- Naming conventions: `camelCase` for variables and `PascalCase` for types and components
- No commented out code since it should usually only be used during debugging - there are still some cases where it's useful though, so see below for how to disable the rule for specific lines
- Prefer interfaces to `type` for TypeScript type declarations wherever possible, mostly just for consistency
- Warnings for `TODO` comments so they're easy to identify in the future
- Warnings for `console.log` statements since they usually shouldn't be used other than for debugging

Most of the other rules can just be searched by name and documentation should be available. Only ESLint errors (not warnings) will cause [GitHub Actions](#github-actions) to fail. As long as you have the [ESLint VS Code extension](#recommended-extensions) installed, errors should be underlined in red and warnings should be underlined in yellow; the corresponding ESLint rule will show up if you hover over the underlined code.

Rules can be disabled via [`eslint-disable-next-line`](https://eslint.org/docs/latest/user-guide/configuring/rules#disabling-rules) comments, with the added caveat that the specific rule being disabled needs to be included (e.g. `// eslint-disable-next-line etc/no-commented-out-code`). This should just be used as an escape hatch though, and it will be highlighted as a warning so that it's easy to identify later.

## Husky

[Husky](https://typicode.github.io/husky/#/) is used to run scripts before and after Git commands. Here it's just used to fix files with ESLint with `yarn lint` before every commit (see [`.husky/pre-commit`](.husky/pre-commit)). The commit will still succeed even if there's errors, but those errors still should show up in GitHub Actions.

## GitHub Actions

[GitHub Actions](https://docs.github.com/en/actions) is used for CI (continuous integration). Any time code is pushed or a pull request to the `main` branch is opened, GitHub Actions will check the project for unused dependencies and errors from ESLint or Prettier. It will also check if the TypeScript types are valid and try to create a production build. If any of these checks fail, the commit/pull request will be marked as failing. The GitHub Actions workflow is defined in [`.github/workflows/main.yml`](.github/workflows/main.yml). It's recommended to only merge PRs which pass the checks.

## Pull Request Template

A pull request template in [`.github/pull_request_template.md`](.github/pull_request_template.md) is included. This autofills the description when making a PR on GitHub - feel free to modify it to fit the project.

## VS Code Settings

Configuration files for for VS Code are inside [`.vscode`](.vscode). The [`settings.json`](.vscode/settings.json) file sets the default formatter to Prettier and enables automatically linting via ESLint whenever you save files. The [`extensions.json`](.vscode/extensions.json) file lists the recommended extensions for the project.

## Miscellaneous Config Files

- [`.editorconfig`](.editorconfig) is used by the EditorConfig extension and contains settings which ensure consistent formatting for files, including indentation and newlines.
- [`.gitattributes`](.gitattributes) also contains settings for consistent formatting, but is used by Git instead.
- [`.env`](.env) should contain any environment variables used by the project. Since this is included in GitHub, **do not** put any sensitive information in here (e.g. API keys, etc.) and instead include them in an `.env.local` file.

# Scripts

Here's a list of scripts defined in `package.json` which can be run with `yarn <script>`:

- `yarn dev` - starts the development server
- `yarn build` - builds the project for production
- `yarn start` - starts the production server
- `yarn lint` - runs ESLint and Prettier while also fixing any issues wherever possible
- `yarn lint-ci` - runs ESLint and Prettier without fixing issues (used by GitHub Actions)
- `yarn depcheck` - checks for unused dependencies (used by GitHub Actions)
- `yarn clean` - deletes any files which are `.gitignore`'d but still exist in the project (including `node_modules`) - useful if you want to reset the project to a clean state or if you're having issues with dependencies. Keep in mind this will delete environment files like `.env.local` as well though, so back them up if needed.

# Recommended Extensions

This is a list of recommended VS Code extensions that will make development easier. They're all included in `.vscode/extensions.json`.

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - enables running ESLint on save and shows errors and warnings in the editor
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - enables running Prettier on save and shows errors and warnings in the editor
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - enables using `.editorconfig` files to ensure consistent formatting
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - enables syntax highlighting for `.env` files
- [JavaScript Language Support](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel) - enables syntax highlighting for JavaScript/TypeScript files
- [Auto Rename Tag](formulahendry.auto-rename-tag) - automatically renames matching opening and closing tags when you rename one of them (definitely the most optional one on this list)
