# Mellow Finance Front End
Front end template

## Setup & Installation

```bash

pnpm i
pnpm run dev
```
Run `pnpm i` to install all the required dependencies to run the dApp.

## Architecture

-   `/pages` includes the main application components (specifically `index.tsx` and `_app.tsx`)
    -   `_app.tsx` includes configuration
    -   `index.tsx` is the main page of the application
-   `/components` includes components that are rendered in `index.tsx`
-   `/public` includes static files
