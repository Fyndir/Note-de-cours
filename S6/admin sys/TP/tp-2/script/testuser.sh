#!/bin/bash

if [ $# = 0 ]; then
  echo "Utilisation: $0 nom_utilisateur"
else
  grep $1 /etc/password >/dev/null 2>&1
  if [ $? == 1 ]; then
    echo "utilisateur non trouve"
  else
    echo  "utilisateur trouve"
  fi
fi
