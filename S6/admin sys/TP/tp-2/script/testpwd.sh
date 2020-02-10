 #!/bin/bash
PASSWORD="Spa1965"

read -p "Saissez votre mot de passe\n" -s psswrd

if [ $PASSWORD = $psswrd ]; then
  echo "Mot de passe correct"
else
  echo "Mot de passe incorrect"
fi
