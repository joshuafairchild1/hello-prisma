### Usage
1. Navigate to `src/server`

1. [Deploy](https://www.prisma.io/docs/prisma-cli-and-configuration/cli-command-reference/prisma-deploy-xcv9/) your local prisma service
    ```
    $ prisma deploy
    ```

2. [Generate](https://www.prisma.io/docs/prisma-cli-and-configuration/cli-command-reference/prisma-generate-xcv2/) the data model
    ```
    $ prisma generate
    ```
   
3. After generating the data model, GraphQL playground is available at http://localhost:4466 and
   admin screen available at http://localhost:4466/_admin (the port is configurable in `prisma.yml`)
   
4. Generate GraphQL API
    ```
    $ npx nexus-prisma-generate --client <absolute path to prisma-client>  --output <absolute path to nexus-prisma>
    ```
   
5. Start the prisma server
    ```
    $ npm run start
    ```
   
6. Navigate to `/src/client`. Start the client development server
    ```
    $ npm run start
    ```