# DEVELOPER

To build Qwik for local development, first [npm](https://docs.npmjs.com/) (or [yarn](https://yarnpkg.com/)) install the dev dependencies:

```shell
npm install
```

Next the `start` command will:

- Build the source files
- Begin the watch process so any changes will rebuild
- Run the type checking watch process with [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- Run the unit test (Jest) watch process

```shell
npm start
```

## Running Dev Server Integration Tests

The `integration/` directory is for this local repo's end-to-end and integration testing (and not necessarily app demos). Its dev server is setup to always point to the local build and stay current with the watch process.

First start the integration dev server, which will also ensure a build was completed:

```shell
npm run integration.server
```

Then navigate to <http://localhost:8080/>

The `npm run integration.server` commands runs the server in `development` mode, where files are not minified, source maps are inlined, and there's additional logging. To run code minified with external source maps and without extra logs, run `npm run integration.server.prod`, which is what the end-to-end tests use.

## Running All Tests

To run all Unit tests ([Jest](https://jestjs.io/)) and E2E/Integration tests ([Cypress](https://www.cypress.io/)), run:

```shell
npm test
```

The `test` command will also ensure a build was completed.

### Unit Tests Only

Unit tests use [Jest](https://jestjs.io/).

```shell
npm run test.unit
```

To keep Jest open with the watch mode, run:

```shell
npm run test.watch
```

> Note that the `test.watch` command isn't necessary if you're running the `npm start` command, since `start` will also concurrently run the Jest watch process.

To debug and step through unit tests, within VSCode you can use the "Integration Dev Server" Debug launch task.

### E2E Tests Only

E2E and Integration tests use [Cypress](https://www.cypress.io/).

To run the Cypress tests headless, from start to finish, run:

```shell
npm run test.e2e
```

To open Cypress in interactive mode and control through a browser, run:

```shell
npm run test.e2e.open
```

## Production Build

The `npm start` command will run development builds, type check, watch unit tests, and watch the files for changes.

A full production build will:

- Builds each submodule
- Generates bundled `.d.ts` files for each submodule with [API Extractor](https://api-extractor.com/)
- Checks the public API hasn't changed
- Builds a minified `core.min.mjs` file
- Generates the publishing `package.json`

```shell
npm run build
```

The build output will be written to `dist-dev/@builder.io-qwik`, which will be the directory that is published
to [@builder.io/qwik](https://www.npmjs.com/package/@builder.io/qwik).

## Qwik JSX Generate Script

Qwik's JSX implementation is based off of React's `@types/react`. However, React's JSX is declared as a `global` and adds its own events such as `onClick`. To avoid the global and allow Qwik to scope its own implementation of JSX, there's a generate script that gets the latest `@types/react/index.d.ts`, and parses the JSX type information.

```shell
yarn jsx.types
```

1. Downloads the React types from <https://unpkg.com/@types/react/index.d.ts>
   and follows the redirect to get the latest version. It uses a download
   instead of an npm install because we want to ensure our local build is not
   polluted by React's global JSX, which may not show errors locally, but would
   have errors for other users that do not have `@types/react` installed.
2. Parses the `index.d.ts` file for its current `IntrinsicElements` interface.
3. Generates `src/core/render/jsx/types/jsx-generated.ts`, which should be committed.
4. Qwik's JSX implementation extends the generated `jsx-generated.ts` file.

## Publishing

1. Run `npm run release`
2. Use the [interactive UI](https://www.npmjs.com/package/np) to select the version/tag.
3. The selected version number will become the commit message.
4. After publishing it'll open a prefilled GitHub Releases draft.
5. 🚀

## Bazel

Bazel is currently used for further testing and builds between internal repos. However, it is not required for local development and contribution to Qwik.

### Setting up the Bazel environment

Best way to run `bazel` is with [`bazelisk`](https://github.com/bazelbuild/bazelisk) which will automatically download and execute the right version of `bazel`.

#### Preferred way

```shell
brew install bazelisk
```

or

```shell
npm install -g @bazel/bazelisk
```

`Bazel` will invoke `Yarn` and manage all dependencies.

### `bazel` vs `ibazel`

The difference between `bazel` and `ibazel` is that `ibazel` will re-invoke `bazel` if any relevant files change. This is useful for constantly updating the server and or tests as they are being developed. All commands are listed as `bazel`, but can be replaced for `ibazel` as needed.

## Pre-submit hooks

The project has pre-submit hooks, which ensure that your code is correctly formatted. You can run them manually like so:

```shell
npm run lint
npm run buildifier-check
npm run prettier-check
```

Some of the issues can be fixed automatically by using:

```shell
npm run buildifier-fix
npm run prettier-fix
```
