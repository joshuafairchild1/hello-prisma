#!/usr/bin/env bash

if [ "$1" ];
  then
    prisma deploy $1
else
    prisma deploy
fi
