#!/bin/bash

function fact()
{
  FACT=$FACT*$1
  $1="$1"-1
  if ! [ $1 = 1 ]; then
    fact $1
  fi
}

export FACT=1

fact $1

echo "$FACT"
