# TP 2 - Bash


## Exercice 1. Variables d’environnement

### 1. Dans quels dossiers bash trouve-t-il les commandes tapées par l’utilisateur ?

Dans tout les dossiers contenu dans la variable $PATH :
* **/usr/local/sbin**
* **/usr/local/bin**
* **/usr/sbin**
* **/usr/bin**
* **/bin**
* **/sbin**

### 2. Quelle variable d’environnement permet à la commande cd tapée sans argument de vous ramener dans votre répertoire personnel ?

Dans la variables d'environnement $HOME


### 3. Explicitez le rôle des variables LANG, PWD, OLDPWD, SHELL et \_.

* LANG : defini la langue du systeme
* PWD : defini le repertoire courant
* OLDPWD : defini le repertoire precedent
* SHELL : defini le shell utilisé par le systeme
* \_ : derniere argument de la derniere commande

### 4. Créez une variable locale MY_VAR (le contenu n’a pas d’importance). Vérifiez que la variable existe.

```Bash
MY_VAR="test"
echo "$MY_VAR"
```


### 5. Tapez ensuite la commande bash. Que fait-elle ? La variable MY_VAR existe-t-elle ? Expliquez. A la fin de cette question, tapez la commande exit pour revenir dans votre session initiale.

la commande ```bash``` ouvre une nouvelle session bash , la variable locale MY_VAR n'existe plus.

### 6. Transformez MY_VAR en une variable d’environnement et recommencez la question précédente. Expliquez.

Pour exporter la variable on utilise la commande : ```export```

```Bash
export MY_VAR
printenv MY_VAR
```


### 7. Créer la variable d’environnement NOMS ayant pour contenu vos noms de binômes séparés par un espace. Afficher la valeur de NOMS pour vérifier que l’affectation est correcte.

```Bash
export NOMS="CAILLE GAMAIN"
```

### 8. Ecrivez une commande qui affiche ”Bonjour à vous deux, binôme1 binôme2 !” (où binôme1 et binôme2 sont vos deux noms) en utilisant la variable NOMS.

```bash
echo "Bonjour à vous deux $NOMS"
```


### 9. Quelle différence y a-t-il entre donner une valeur vide à une variable et l’utilisation de la commande unset ?

la commande ```unset``` supprime la variable alors que l'autre commande lui affecte une chaine vide

### 10. Utilisez la commande echo pour écrire exactement la phrase : $HOME = chemin (où chemin est votre dossier personnel d’après bash)

```Bash
echo '$HOME' = "$HOME"
```

# Programmation Bash

*Vous enregistrerez vos scripts dans un dossier script que vous créerez dans votre répertoire personnel.
Tous les scripts sont bien entendu à tester.
Ajoutez le chemin vers script à votre PATH de manière permanente.*

## Exercice 2. Contrôle de mot de passe

*Écrivez un script testpwd.sh qui demande de saisir un mot de passe et vérifie s’il correspond ou non au
contenu d’une variable PASSWORD dont le contenu est codé en dur dans le script. Le mot de passe saisi par
l’utilisateur ne doit pas s’afficher*

```bash
#!/bin/bash
PASSWORD="Spa1965"

read -p "Saissez votre mot de passe \n" -s psswrd

if [ $PASSWORD = $psswrd ]; then
  echo "Mot de passe correct"
else
  echo "Mot de passe incorrect"
fi
```


## Exercice 3. Expressions rationnelles
*Ecrivez un script qui prend un paramètre et utilise la fonction suivante pour vérifier que ce paramètre
est un nombre réel :*

~~~~
function is_number()
{
re='^[+-]?[0-9]+([.][0-9]+)?$'
if ! [[ $1 =~ $re ]] ; then
return 1
else
return 0
fi
}
~~~~

*Il affichera un message d’erreur dans le cas contraire.*

```Bash
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

if is_number $1; then
  echo "C'est bien un nombre"
else
  echo "Ce n'est pas un nombre"
fi


```


### Exercice 4. Contrôle d’utilisateur

*Écrivez un script qui vérifie l’existence d’un utilisateur dont le nom est donné en paramètre du script. Si le
script est appelé sans nom d’utilisateur, il affiche le message : ”Utilisation : nom_du_script nom_utilisateur”,
où nom_du_script est le nom de votre script récupéré automatiquement (si vous changez le nom de votre
script, le message doit changer automatiquement)*

```Bash
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
```

### Exercice 5. Factorielle

*Écrivez un programme qui calcule la factorielle d’un entier naturel passé en paramètre (on supposera que
l’utilisateur saisit toujours un entier naturel).*

```bash
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

```

### Exercice 6. Le juste prix
*Écrivez un script qui génère un nombre aléatoire entre 1 et 1000 et demande à l’utilisateur de le deviner.
Le programme écrira ”C’est plus !”, ”C’est moins !” ou ”Gagné !” selon les cas (vous utiliserez $RANDOM).*


```bash
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
```


### Exercice 7. Statistiques
*  *Écrivez un script qui prend en paramètres trois entiers (entre -100 et +100) et affiche le min, le max et la moyenne. Vous pouvez réutiliser la fonction de l’exercice 3 pour vous assurer que les paramètres sont bien des entiers.*
* *Généralisez le programme à un nombre quelconque de paramètres (pensez à SHIFT)*
* *Modifiez votre programme pour que les notes ne soient plus données en paramètres, mais saisies et stockées au fur et à mesure dans un tableau.*


```Bash
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
```
