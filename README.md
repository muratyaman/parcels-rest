# parcels-rest
RESTful parcel service

# Check Requirements

We are using Node v14.x, TypeScript, TypeORM, SQLite3

# Install 

```
npm install
```

# Configure

Review/edit `ormconfig.json` (TODO move settings to `.env`)

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

# Build

```
npm run build
```

# Test

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
