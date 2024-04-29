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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Creation sequence
The following is the sequence to create the base project:
#### 1. NextJS create app
```bash
npx create-next-app@latest ./ --typescript --tailwind --eslint
```
#### 2. Install component library ShadCn (stone)
```bash
npx shadcn-ui@latest init
```
#### 3. Install clerk (clerk.com) authentication and user management saas support dependencies
```bash
npm install @clerk/nextjs
```
#### 4. Install next-themes dependencies
```bash
npm i next-themes
```
#### 5. Install ShadCn some components
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dropdown-menu
```
## DB creation/setup
The following is the procedure to create the DB from zero:
#### 1. install prisma - DB object model, progranmatic interaction with DB 
```bash
npm i -D prisma
```
#### 2. init prisma to generate prisma files
```bash
npx prisma init
```
ref:: https://youtu.be/Big_aFLmekI?t=6362

Prisma now needs configuration.

```
warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
```
#### 4. install prisma client
```
npm install @primsa/client
```
#### 5. Update the db util file and schema.prisma file
#### 6. Finally generate the schema files and push the updates to the DB:
```
npx prisma generate
npx prisma db push
```
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
