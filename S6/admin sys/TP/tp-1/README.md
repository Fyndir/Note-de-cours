# tp-1-caille-gamain

## Manuel

### 1. A l’aide du manuel, identifiez le rôle de la commande which

La commande `which` permet de localiser une commande.

*`which`  renvoie  le  chemin  des fichiers (ou liens) qui seraient
exécutés dans l'environnement courant si ses  arguments  avaient
été  donnés  comme  commandes  dans un interpréteur de commandes
strictement conforme à POSIX. Pour ce faire, `which` cherche  dans la variable PATH les fichiers exécutables correspondant aux noms des arguments. `which` ne normalise pas les chemins.*


### 2. Quelle commande permet de rechercher le mot option dans cette page ?

```bash
man which | grep option
```


### 3. Comment quitte-t-on le manuel ?

la touche q

### 4. Afficher la première page de la section 6 ; de quoi parle cette section ?

```bash
man 6 intro
```

## Navigation dans l’arborescence des fichiers

### 1. allez dans le dossier /var/log

```bash
cd /var/log
```

### 2. remontez dans le dossier parent (/var) en utilisant un chemin relatif

```bash
cd ..
```
### 3. retournez dans le dossier personnel

```bash
cd $HOME
```

### 4. revenez au dossier précédent (/var)
```bash
cd -
```


### 5. essayez d’accéder au dossier /root ; que se passe-t-il ?

les permissions ne sont pas suffisantes

### 6. essayez la commande sudo cd /root ; que se passe-t-il ? Expliquez

```bash
[sudo] Mot de passe de fyn :
sudo: cd : commande introuvable
```

la fonction cd est une fct de bash et sudo exiecute des programmes donc cd n'est pas reconnu

## Commandes importantes

### 1. Quelle commande permet d afficher l'heure ? A quoi sert la commande time ?

C'est la commande Date.

time run the program COMMAND with any given arguments ARG....
When COMMAND finishes, time displays information about resources
used by COMMAND (on the standard error output, by default).  If
COMMAND exits with non-zero status, time displays a warning
message and the exit status.


### 2. Dans votre dossier personnel, tapez successivement les commandes ls puis la ; que peut-on en déduire sur les fichiers commençant par un point ?

la commande ls affiche les fichiers depuis l'endroit ou on se situt.

la commande la affiche les fichiers meme cachés (commande par un .) depuis l'endroit ou l'on se situt. (on peut les voir avec la commande ls-A)

### 3. Où se situe le programme ls ?

dans le /bin

### 4. Que fait la commande ll ? (indice : la commande alias peut vous aider)

La commande ll affiche les fichier avec leur droit et leur proprietaire.

c'est juste un alias de la commande ls -alF

### 5. Quelle commande permet d afficher les fichiers contenus dans le dossier /bin ?

cd /Bin
ll (affiche tous les fichiers)

### 6. Que fait la commande ls .. ?

elle affiche la liste des éléments présent dans le dossier ou l'on se situt.

### 7. Quelle commande donne le chemin complet du dossier courant ?

c'est la commande pwd

### 8. Que fait la commande echo 'yo' > plop exécutée 2 fois ?

Creation du fichier plop qui contient yo

### 9. Que fait la commande echo 'yo' >> plop exécutée 2 fois ?

Creation du fichier plop qui contient yoyo

### 10. A quoi sert la commande file ? Essayez la sur des fichiers de types différents.

La commande fiche type du fichier passer en parametre

### 11. Créez un fichier toto qui contient la chaîne Hello Toto ! ; créer ensuite un lien titi vers ce fichier avec la commande ln toto titi. Modifiez à présent le contenu de toto et affichez le contenu de titi :
qu observe-t-on ? Supprimez le fichier toto ; quelle conséquence cela a-t-il sur titi ?

```bash
echo 'Hello Toto !' >> toto
ln toto titi
echo ' test ' >> toto
cat titi
Hello Toto !
test
```

On remarque que le contenu de titi a évoluer
```bash
rm toto
cat titi

Hello Toto !
 test
 ```

Le fichier titi est conservé


### 12. Créez à présent un lien symbolique tutu sur titi avec la commande ln -s titi tutu. Modifiez le contenu de titi ; quelle conséquence pour tutu ? Et inversement ? Supprimez le fichier titi ; quelle conséquence cela a-t-il sur tutu ?

```bash
echo ' test2 ' >> titi
cat tutu

Hello Toto !
 test
 test2
 ```

Le contenu de tutu évolu en meme temps que titi

```bash
echo ' test3 ' >> tutu
cat titi
Hello Toto !
 test
 test2
 test3
 ```

le contenu de titi a evoluer en meme temps que tutu

```bash
rm titi
```

La suppression de titi entraine la supression de tutu



### 13. Affichez à l écran le fichier /var/log/syslog. Quels raccourcis clavier permettent d interrompre et reprendre le défilement à l écran ?

```bash
cat /var/log/syslog
```

le raccourci : ctrl+s pour interrompre et ctrl+q pour reprendre


### 14. Affichez les 5 premières lignes du fichier /var/log/syslog, puis les quinzes  dernières, puis seulement les lignes 10 à 20.

```bash
head -n 5 /var/log/syslog
tail -n 15 /var/log/syslog
```

### 15. Que fait la commande dmesg | less ?

affiche les messages du buffer de noyaux

### 16. Affichez à l écran le fichier /etc/passwd ; que contient-il ? Quelle commande permet d afficher la page de manuel de ce fichier ?

le fichier passwd contient l'ensemble des utilisateurs/groupes defini sur la machine.

man 5 passwd pour le fichier

### 17. Affichez seulement la première colonne triée par ordre alphabétique inverse

```bash
awk 'BEGIN {FS=":"} { print $1 }' /etc/passwd

cut -d : /etc/passwd -f 1 | sort -r -d

```

### 18. Quelle commande nous donne le nombre d utilisateurs ?

```bash
cut -d : /etc/passwd -f 1|wc -l
```
### 19. Combien de pages de manuel comportent le mot-clé conversion dans leur description ?

```bash
man -f conversion | wc -l
```

### 20. A l aide de la commande find, recherchez tous les fichiers se nommant passwd présents sur la machine

```bash
sudo find / -name "passwd"
```

### 21. Modifiez la commande précédente pour que la liste des fichiers trouvés soit enregistrée dans le fichier ~/list_passwd_files.txt et que les erreurs soient redirigées vers le fichier spécial /dev/null

```bash
sudo find / -name "passwd" > ~/list_passwd_files.txt 2>/dev/null
```

### 22. Dans votre dossier personnel, utilisez la commande grep pour chercher où est défini l alias ll vu précédemment

sudo find

les alias sont definis dans le fichiers .bashrc

### 23. Utilisez la commande locate pour trouver le fichier history.log.

```bash
locate history.log
/var/log/apt/history.log
/var/log/apt/history.log.1.gz
/var/log/apt/history.log.2.gz
/var/log/apt/history.log.3.gz
```

### 24. Créer un fichier dans votre dossier personnel puis utilisez locate pour le trouver. Apparaît-il ? Pourquoi ?

```bash
touch  blabla
locate blabla
```

on ne detecte pas le fichier qui vient d'etre crée

## Découverte de l’éditeur de texte nano

### 1. Copiez le fichier /var/log/syslog dans votre dossier personnel sous le nom log.txt, puis ouvrez-le avec nano

```bash
cp /var/log/syslog log.txt
nano log.txt
```

### 2. Remplacez toutes les occurrences du mot kernel par le mot noyau

*ctrl + al gr + 8
kernel
noyaux
T*

### 3. Déplacer les 10 premières lignes à la fin du fichier

### 4. Annulez cette action

### 5. Enregistrez le fichier avant de quitter nano
