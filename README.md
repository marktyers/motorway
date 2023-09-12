
![CI Workflow](https://github.com/marktyers/motorway/actions/workflows/ci.yml/badge.svg?branch=main)

This repository demonstrates:

1. The technical solution to the challenge.
2. Use of ES6 modules in Node/Express.
3. Writing scripts in TypeScript and compiling.
4. Use of ESLint to check TypeScript code.
5. Building a GitHub Actions pipeline with badge.
6. Configuring Jest for ES6 modules using Babel.
7. Writing simple specs using Jest and SuperTest.

## Postgres Cacheing

The indexing means that the initial query is quick. Any requests for the same record use thepostgres cache.

```
/cars/:id execution time: 23.003984928131104 milliseconds
/cars/:id execution time: 0.8330907821655273 milliseconds
```