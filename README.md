## Description

Vault Nest mono repo

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start -p {project name}

# watch mode
$ npm run start:dev -p {project name}

# production mode
$ npm run start:prod -p {project name}
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Dependency
Needs a redis instance to run. use Docker to spin one up quickly

```bash
$ export REDIS_PASSWORD=secretpassword
$ docker run -p 6379:6379 --name vault-redis -d redis redis-server --requirepass "$REDIS_PASSWORD"
```

## License

Unlicensed
