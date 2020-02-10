#!/bin/bash

prix=$(((RANDOM%1000)+1))

devine=-1

while [ $devine -ne $prix ]
do
read devine
if [ $devine -gt $prix ]; then
  echo 'Trop haut !'
fi
if [ $devine -lt $prix ]; then
  echo 'Trop bas !'
fi
done

echo 'Gagné !'