# TP 3 - Gestion des paquets

## Exercice 1. Commandes de base


### *1-Quels sont les 5 derniers paquets installés sur votre machine?*

```Bash
tail -5 /var/log/dpkg.log
```

### *2-Utiliser dpkg et apt pour compter le nombre de paquets installés (ne pas hésiter à consulter le manuel!).Comment explique-t-on la (petite) différence de comptage?*

```Bash
dpkg -l | wc -l
apt list --installed | wc -l
```

la différence vient du fait que la commande ```dpkg``` contient une entete dans les resultat qu'elle retourne

### *3-Combien de paquets sont disponibles en téléchargement?*

```Bash
apt update
apt list | wc -l
```

### *4-Créer un alias ”maj” qui met à jour le système*

```Bash
alias maj='sudo apt-get update'
```

### *5-A quoi sert le paquetfortunes? Installez-le.*


```Bash
apt search "fortunes"
apt-get install paquetfortunes
```

### *6-Quels paquets proposent de jouer au sudoku?*

```Bash
apt search sudoku
```

### *7-Lister les derniers paquets installés explicitement avec la commande apt install*

on peut fouiller le fichier /var/log/apt/history.log

## Exercice 2.

### *A partir de quel paquet est installée la commande ls? Comment obtenir cette informationen une seule commande, pour n’importe quel programme (indice : la réponse est dans le poly de cours 2, dans la liste descommandes utiles)? Utilisez la réponse à pour écrire un script appeléorigine-commande(sans l’extension .sh) prenant en argument le nom d’une commande, et indiquant quel paquet l’a installée.*

la ligne
```Bash
which ls | xargs dpkg -S
```

le script :

```Bash
#!/bin/bash
which $1 | xargs dpkg -S
```

## Exercice 3.

### *ecrire une commande qui affiche ”INSTALLÉ” ou ”NON INSTALLÉ” selon le nom et le statut du packagespécifié dans cette commande.*

```Bash
#!/bin/bash

exec 2>/dev/null

line=$(apt list --installed | grep ^"$1"/ | wc -l)

if [ $line = 1 ]; then
        echo INSTALLÉ
else
        echo NON INSTALLÉ
fi
```

## Exercice 4.

### *Lister les programmes livrés avec coreutils. A quoi sert la commande ’[’ et comment afficher ce qu’elle retourne?*

```Bash
apt show coreutils
```

et on regarde la partie dependance.

la commande [ sert de test

## Exercice 5. aptitude

### *Installez le paquetemacs à l’aide de la versiongraphique d’aptitude.*

on installe aptitude avec la commande :

```Bash
apt-get install aptitude
```

On le lance avec la commande :

```Bash
aptitude
```

Ctrl+T pour accéder au menu et donc à la commande Find


## Exercice 6 Installation d'un paquet par PPA

### Installer la version Orancle de java

```Bash
sudo add-apt-repository ppa:linuxuprising/java
sudo apt update
sudo apt install oracle-java11-installer
```
### Vérifiez qu’un nouveau fichier a été créé dans/etc/apt/sources.list.d. Que contient-il?

```Bash
cd /etc/apt/sources.list.d
ls
cat linuxuprising-ubuntu-java-bionic.list
```

Le fichier contient l'adresse du serveur

## Exercice 7. Création de dépôt personnalisé

Dans cet exercice, vous allez créer vos propres paquets et dépôts, ce qui vous permettra de gérer les programmes que vous écrivez comme s’ils provenaient de dépôts officiels.

### Création d’un paquet Debian avec dpkg-deb1.

### 1-Dans le dossierscripts créé lors du TP 2, créez un sous-dossier origine-commande où vous créerez un sous-dossier DEBIAN, ainsi que l’arborescenceusr/local/bin où vous placerez le script écrit à l’exercice 2

 ### 2- Dans le dossier DEBIAN, créez un fichier control avec les champs suivants :

```
 Package: origine-commande
 Version: 0.1
 Maintener: Foo Bar
 Architecture: all
 Description: Cherche l'origine d'une command
 Section : utils
 Priority: optional
 ```
### 3-Revenez dans le dossier parent de origine-commande(normalement, c’est votre $HOME) et tapez la commande suivante pour construire le paquet :

```dpkg-deb --build origine-commande```
