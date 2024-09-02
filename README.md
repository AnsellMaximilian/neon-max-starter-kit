# Neon Max Starter Kit

**Neon Max** is a powerful and modern **Next.js** starter kit designed to jumpstart your web application development. It is powered by [Neon](https://neon.tech/), a cutting-edge serverless PostgreSQL database that offers seamless scalability and performance. With Neon Max, you get a fully integrated, out-of-the-box solution for building robust, scalable web applications with minimal setup.

## Documentation Website

This README file provides enough information to get started. For an even more detailed setup guide along with documentation on Neon Max's special helper classes, head over to the [documentation website](https://ansellmaximilian.github.io/neon-max-docs/docs/intro)

## Getting Started

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.17 or above
- [Git](https://git-scm.com/downloads)

### Cloning the Starter Kit

To start building with Neon Max by cloning the starter kit either by using the `neon-max-cli` tool or by cloning by directly cloning the starter kit's Github repo and installing all its dependencies:

#### Use the CLI

```bash
npx neon-max-cli init project-name
```

This command will do all the cloning and installing for you. If you prefer to directly clone using git:

#### Clone the Repo

```bash
git clone https://github.com/AnsellMaximilian/neon-nextjs-max-starter-kit.git custom-name
npm install
```

### Environment Variables

There are a couple of environment variables that are required before starting your development. Namely, a NextAuth secret and your Neon database URL.

There's an example `.env.example` file that you can copy to get started

```bash
cp .env.example .env
```

This new `.env` file will be where you'll store environment variables.

Next, generate a NextAuth secret with:

```bash
npx auth secret --raw
```

Copy the generated value and put in into `AUTH_SECRET` in your `.env` file.

You'll also need a database URL, we'll get to that in the following section.

### Preparing Neon

Next, you'll need to connect your Next.js repo with a Neon database.

If you don't have a Neon account yet, you can sign up [here](https://console.neon.tech/signup). Otherwise, login and head over to Neon's [console](https://console.neon.tech/).

Follow this [comprehensive project creation tutorial by Neon](https://neon.tech/docs/get-started-with-neon/signing-up) until you have a development database and its database URL string. Or, if you'd like, you can visit our own [setup guide](https://ansellmaximilian.github.io/neon-max-docs/docs/setting-up-neon).

Once you have your databases' development branch's URL string, copy it and paste it into your `.env` file as the `DATABASE_URL`.

### Configure Prisma

Once you have your database url set in the `.env` file, you can start configuring prisma. Start by generating the initial migration:

```bash
npx prisma migrate dev --name init
```

This command generates migration files written in SQL corresponding to our schema definitions and applies them to create the tables in your Neon database. We used the `--name` flag to name the migration. Now your neon development database will match the models defined in `./prisma/prisma.schema`.

## Start your site

Run the your Next.js website:

```bash
npm run dev
```

Next, head over to http://localhost:3000 and you're ready to start developing.
