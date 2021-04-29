# musicians-app-backend

## Tech used:
* NodeJS 
* PostgreSQL 
* Express.js

## Getting Started

Add a `.env` file with those properties:
PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT
or leave empty for default values that are:
```
PGHOST='localhost'
PGUSER=process.env.USER
PGDATABASE=process.env.USER
PGPASSWORD=null
PGPORT=5432
```

Run the development server:
```
npm run dev
# or
yarn dev
```
