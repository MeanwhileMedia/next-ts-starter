# next-ts-starter
Starter code for building a Typescript, Next.js, React app. It comes with:
- Partially implemented page and API routes for an example app that displays user info. 
- Unit and e2e testing frameworks (mocha and cypress) and some example tests.
- Material UI components for quicker UI builds.


## Usage

##### 1. Install system dependencies:

  Install the newest stable version of Node. NVM is the suggested tool which provides instructions [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#intro).

##### 2. Install app dependencies
```
npm install
```

##### 3. If connecting with an external API, add keys to a new a `.env.local` file in the project root. For example:
```
FOO_API_ID={yourPrivateID}
FOO_API_KEY={yourPrivateKey}
```

##### 4. Run in local browser
```
npm run dev
```

##### 5. Visit http://localhost:3000/hello

## Tests
To execute automated tests run the following command. This will run both unit tests (Mocha) and end-to-end tests (Cypress):
```
npm run test:all
```

Alternatively, to open the interactive Cypress dashboard, execute the following. This is a helpful tool to write and debug new e2e tests.
```
npm run cypress:open
```

NOTE: Before running tests you must have the next dev server running:
```
npm run dev
```