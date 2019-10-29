### Usage
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
   
4. Start the prisma app
    ```
    $ npm run start
    ```