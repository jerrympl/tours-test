Tours Booking App
---

## Overview
This application is a product catalog page with very simple basket mechanism.
Products in this case are tours. Each product contains `title`, `image`, `description` and the `price` along with information about `currency`.

This code has been created only for demo purposes.
Due to lack of time, I didn't test all components and logic, but decided to select specific test cases to cover.
According to above, you can find my way of testing simple components, services, hooks and sort of helper functions.

Instead of going with `redux` I decided to incorporate `recoil` state manager because I find him very useful and handy.

In order to test recoil atom, I needed to prepare solution for mocking atoms. You can find this example in `testUtils.tsx`

### Note:
Application is not suposed to consume any data from the remote API. Data has been determined so I needed to hardcode them. I decided to prepare a service based mock in order to make a quick switch to remote if we'd need to use remote data instead.

## Requirements

Node version: `>=12.0.0` `<13.0.0`

npm version: `>=6.0.0` `<7.0.0`

* nvm is a recommended tool to manage node versions. https://github.com/nvm-sh/nvm
* in order to change npm versions you can run npm install -g npm@6


## Setup

Run

```
npm install
```

and

```
npm run start
```

you can also specify the port number by putting trailing env variable:

```
PORT=3003 npm run start
```

To run tests you can do:

```
npm run test
```
