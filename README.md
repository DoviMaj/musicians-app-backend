# Musicians App - backend

## Tech used:

- NodeJS
- PostgreSQL
- Express.js

Database schema [here](https://github.com/DoviMaj/musicians-app-backend/blob/master/schema.txt)

Run `psql -d api -f api.sql` to import the sample db.

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

The server will be available at [http://localhost:5000](http://localhost:5000)
