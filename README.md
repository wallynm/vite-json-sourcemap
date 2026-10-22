# vite-json-sourcemap

Vite 8 dev server serves an imported `.json` module with a full inline source map, and builds another one for SSR. Vite 7 serves it without a map.

Started from `npm create vite@latest` (vanilla). `src/data.json` (about 2 MB) is generated and imported by `src/main.js`.

## Steps

```sh
npm install
npm run check
```

`npm run check` starts a dev server with each version, requests `/src/data.json?import` and runs the SSR transform of the same file.

To see it in the browser: `npm run dev`, open DevTools > Network and look at `data.json?import`.
