This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deployment Notes (cPanel / Apache)

- This project is exported as static HTML (`output: export`).
- Keep `public/.htaccess` at the web root after deploy. It contains:
- Canonical host redirect (`https://www.pomzaexport.com`)
- Root redirect (`/` -> `/tr/`)
- Canonical redirects for numeric product detail URLs (`/product/{id}` to slug URLs)

## Responsive Image Notes

- Source assets live in `public/assets`.
- Responsive variants are generated into `public/assets-responsive` for:
  - `web` (`1600px` max width) and `mobile` (`800px` max width)
  - `webp` and `fallback` formats
- Run `npm run images:build` after adding or updating images in `public/assets`.
- `npm run build` already runs `npm run images:build` automatically before Next build.

## Backlog Note

- Contact form currently uses a client-side SMTP flow (`window.Email`) and should be moved to a server-side or managed form endpoint in a later iteration for stronger security and reliability.
