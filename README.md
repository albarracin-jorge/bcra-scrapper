# scrapper-bcra

## Overview
This project is a web scraper that retrieves currency exchange data from the BCRA (Central Bank of Argentina) website using Playwright. It is built with TypeScript and Express.

## Project Structure
```
scrapper-bcra
├── src
│   ├── app.ts          # Entry point of the application
│   ├── scrapper.ts     # Contains the scraping logic
│   └── types
│       └── index.d.ts  # Type definitions for the project
├── .gitignore          # Specifies files to ignore in Git
├── package.json        # npm configuration file
├── package-lock.json   # Locks the versions of dependencies
├── tsconfig.json       # TypeScript configuration file
└── README.md           # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd scrapper-bcra
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile the TypeScript files:
   ```
   npx tsc
   ```

4. Run the application:
   ```
   node dist/app.js
   ```

## Usage
- The application starts an Express server on port 3000.
- Access the main route at `http://localhost:3000/` to trigger the scraping process and receive the currency exchange data in JSON format.

## Dependencies
- `express`: Web framework for Node.js.
- `playwright`: Library for browser automation.

## License
This project is licensed under the ISC License.