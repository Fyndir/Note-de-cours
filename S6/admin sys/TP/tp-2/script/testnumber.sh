#!/bin/bash

function is_number()
{
re='^[+-]?[0-9]+([.][0-9]+)?$'
if ! [[ $1 =~ $re ]] ; then
return 1
else
return 0
fi
}

if is_number($1); then
  echo "C'est bien un nombre"
else
  echo "Ce n'est pas un nombre"
fi
