#!/bin/bash

function fact()
{
  FACT=$(($FACT*$1))
  i=$(($1-1))
  if [ $i -gt 0 ]; then
    fact $i
  fi
}

export FACT=1

fact $1

echo "$FACT"