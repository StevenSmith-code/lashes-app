# Lashes Booking app ,  React, Typescript, Stripe, Prisma, Tailwind, MySQL, Google maps api

![lashesapp](https://github.com/StevenSmith-code/lashes-app/assets/86922292/ee9bb778-7571-4d88-9736-b980955ff0f1)

Key Features:

- Built in admin dashboard
- Purchase a service using Stripe
- Built in calendar and time picker
- Admin can schedule a range of days off
- Google maps API
- Authentication using Clerk
- ORM using Prisma
- MySQL database using CockroachDB

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/StevenSmith-code/e-learning.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_MAPS_API_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_PUBLIC_ADMIN_ID=
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

DATABASE_URL=
```

### Setup Prisma

Add MySQL Database (I used CockroachDB)

```shell
npx prisma generate
npx prisma db push

```


### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
