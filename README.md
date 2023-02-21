## Description

Vault Nest mono repo.  
I'm bored at home so why not do something for fun?

Vault is meant to be a zero trust key value  store. 
The idea is to be able to store sensitive information urelated to the source
or the user. Every piece of information sent by a client should be encrypted
and treated as if it could be exposed to the public.



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
