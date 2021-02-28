# parcels-rest
RESTful parcel service

# Check Requirements

- [Node](https://nodejs.org/) v14.x
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/)

# Install 

```
npm install
```

# Configure

Copy `.env.sample` as `.env` and review/edit settings.

# Prepare Database

```
mkdir temp
touch temp/db.sqlite
npm run migrate
```

To undo changes:

```
npm run rollback
```


## Create new migration (for new tables)

```
npm run typeorm migration:create -- -n MyNewMigration
```

## Create new subscriber (optional)

```
npm run typeorm subscriber:create -- -n MyNewSubscriber
```

# Run

```
npm run start:dev
```

Refer to [Postman](https://www.postman.com/) collection for API: `parcels-rest.postman_collection.json`

# Build

```
npm run build
```

# Test

[Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) and [Nyc](https://github.com/istanbuljs/nyc) have been used.

```
npm run test
npm run test:coverage
```

Currently:

```
File                   | % Stmts | % Branch | % Funcs | % Lines
-----------------------|---------|----------|---------|---------
All files              |    93.1 |     71.7 |    90.8 |   93.97 
```

# TODO

Registration and login handlers can be implemented using users repo. JWT middleware is in place. Permissions can be checked by each controller/action using `req.user`;

- authentication
- authorization
