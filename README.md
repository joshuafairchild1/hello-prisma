### What is it?
A basic to-do app built using Prisma (and a "few" other tools...)
for the backend, with a frontend written in React. The entire app is
written in TypeScript, with a large portion of that code being generated
by Prisma and made available to both the client and the server. Pretty cool!

This app was build as an exploration to see what it is that Prisma does, and how
quickly it can be used to get an app up and running.

### ["What is Prisma?"](https://github.com/prisma/prisma/blob/master/docs/1.1/04-Reference/01-Introduction/What-is-Prisma.md)

### How do I use it?
1. Navigate to `src/lib/prisma`

1. [Deploy](https://www.prisma.io/docs/prisma-cli-and-configuration/cli-command-reference/prisma-deploy-xcv9/) your prisma service locally.
    ```
    $ prisma deploy
    ```

2. [Generate](https://www.prisma.io/docs/prisma-cli-and-configuration/cli-command-reference/prisma-generate-xcv2/) your data model
   from the [SDL schema](https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51) defined in `src/lib/model/datamodel.prisma`.
    ```
    $ prisma generate
    ```
   
3. After generating the data model, GraphQL playground is available at http://localhost:4466 and
   admin screen available at http://localhost:4466/_admin (the port is configurable in `prisma.yml`).
   
4. Generate GraphQL API.
    ```
    $ npx nexus-prisma-generate --client ./src/lib/prisma/generated/prisma-client --output ./src/lib/prisma/generated/nexus-prisma
    ```
   
5. Navigate to `src/server`. Start the prisma server.
    ```
    $ npm run start
    ``` 
   
6. Navigate to `src/client`. Start the client development server.
    ```
    $ npm run start
    ```
   
7. App can be viewed at http://localhost:3000/
