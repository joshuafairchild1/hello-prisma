#!/usr/bin/env bash

# nexus-prisma-generate prisma-client-dir output
#
# > Generate the TypeScript types for nexus-prisma
#
# -----
#
# Inputs should be relative to the root of your project
#
# --client (required): Path to your prisma-client directory (eg: ./generated/prisma-client/)
# --output (required): Path to directory where you want to output the typings (eg: ./generated/nexus-prisma)
# --js     (optional): Whether to generate the types for Javascript
#
# This is not well documented, copied from:
# https://github.com/prisma-labs/nexus-prisma/issues/119#issuecomment-465924945

npx nexus-prisma-generate --client ./src/lib/prisma/generated/prisma-client --output ./src/lib/prisma/generated/nexus-prisma