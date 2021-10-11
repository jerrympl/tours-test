Tours Booking App
---
Sample booking app for testing purposes.
Due to lack of time, I didn't test all components and logic, but decided to select specific test cases to cover.
According to above, you can find my way of testing simple components, services, hooks and sort of helper functions.

In order to test recoil atom, I needed to prepare solution for mocking atoms. You can find this example in `testUtils.tsx`

## Requirements

Node version: >=12.0.0 <13.0.0

npm version: >=6.0.0 <7.0.0

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
