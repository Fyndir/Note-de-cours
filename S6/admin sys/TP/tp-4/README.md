# TP 4 - Utilisateurs, groupes et permissions

## Exercice 1. Gestion des utilisateurs et des groupes

### Commencez par créer ensuite deux groupes groupe1 et groupe2

on passe en root :
```bash
groupadd groupe1
groupadd groupe2

```

### Créez ensuite 4 utilisateurs u1, u2, u3, u4 avec leur dossier ”home” et ayant bash pour shell

on passe en root :
```bash

useradd u1 --home /home/u1/ --create-home --shell /bin/bash

useradd u2 --home /home/u2/ --create-home --shell /bin/bash

useradd u3 --home /home/u3/ --create-home --shell /bin/bash

useradd u4 --home /home/u4/ --create-home --shell /bin/bash

```

### Placez les utilisateurs dans les groupes :
-  u1, u2, u4 dans groupe1
-  u2, u3, u4 dans groupe2

```bash
usermod u1 -g groupe1
usermod u2 -g groupe1
usermod u4 -g groupe1

usermod u4 -G groupe2
usermod u2 -g groupe2
usermod u3 -g groupe2

```

### Donnez deux moyens d’afficher les membres de groupe2

la commande `groups` :
```bash
groups u4
```
ou la commande `id` :
```bash
id u4
```

### faites de groupe1 le groupe propriétaire de /home/u1 et /home/u2 et de groupe2 le groupe propriétaire de /home/u3 et /home/u4

```bash
chown :groupe1 /home/u1
chown :groupe1 /home/u2
chown :groupe2 /home/u3
chown :groupe2 /home/u4
```
on verifie :

```bash
ls -l /home
```


### Remplacez le groupe primaire des utilisateurs :
- groupe1 pour u1 et u2
- groupe2 pour u3 et u4

```bash
for u in u1 u2 ; do usermod $u -g groupe1 ; done

for u in u3 u4 ; do usermod $u -g groupe2 ; done
```

### Créez deux répertoires /home/groupe1 et /home/groupe2 pour le contenu commun aux groupes, et mettez en place les permissions permettant aux membres de chaque groupe d’écrire dans le dossier associé.

```bash
for d in groupe1 groupe2; do mkdir /home/$d;chown :$d /home/$d done
```

### Comment faire pour que, dans ces dossiers, seul le propriétaire d’un fichier ait le droit de renommer ou supprimer ce fichier ?

il faut utiliser la commande `chmod`

### Pouvez-vous vous connecter en tant que u1 ? Pourquoi ?

non car il n'a pas encore de password

### Activez le compte de l’utilisateur u1 et vérifiez que vous pouvez désormais vous connecter avec son compte.

```bash
passwd u1
login u1
```

### Quels sont l’uid et le gid de u1 ?

```bash
id u1

uid=1001(u1) gid=1001(groupe1) groups=1001(groupe1)
```




### Quel utilisateur a pour uid 1003 ?
```bash
cat /etc/passwd | grep 1003
u3:x:1003:1002::/home/u3/:/bin/bash

```

### Quel est l’id du groupe groupe1 ?
```bash
cat /etc/group | grep groupe1
```

### Quel groupe a pour guid 1002 ?

```bash
cat /etc/group | grep 1002
```

### Retirez l’utilisateur u3 du groupe groupe2. Que se passe-t-il ? Expliquez.

```bash
deluser u3 groupe2
You may not remove the user from their primary group.
```

on ne peut pas supprimer le groupe primaire d'un utilisateur

### Modifiez le compte de u4 de sorte que :
- il expire au 1 er juin 2019
- il faut changer de mot de passe avant 90 jours
- il faut attendre 5 jours pour modifier un mot de passe
- l’utilisateur est averti 14 jours avant l’expiration de son mot de passe
- le compte sera bloqué 30 jours après expiration du mot de passe

```bash
usermod u4 -e 01/06/2019
chage -M 90 u4
chage -m 5 u4
chage -W 14 u4
chage -I 30 u4
```


### Quel est l’interpréteur de commandes (Shell) de l’utilisateur root ?

```bash
cat /etc/passwd |grep root
root:x:0:0:root:/root:/bin/bash

```

### à quoi correspond l’utilisateur nobody ?

nobody est le nom conventionnel d'un compte d'utilisateur à qui aucun fichier n'appartient, qui n'est dans aucun groupe qui a des privilèges et dont les seules possibilités sont celles que tous les "autres utilisateurs" ont.

Il est utile pour les taches courantes car il limite les degats en cas de panne/defaut

### Par défaut, combien de temps la commande sudo conserve-t-elle votre mot de passe en mémoire ? Quelle commande permet de forcer sudo à oublier votre mot de passe ?
la commande sudo conserve le mdp trop longtemps !!!!!!

il faut rajouter dans le fichier de conf /`etc/sudoers` la ligne :
```bash
timestamp_timeout=X
```
X etant la durée souhaitée

## Exercice 2. Gestion des permissions

### Dans votre $HOME, créez un dossier test, et dans ce dossier un fichier fichier1 contenant quelques lignes de texte. Quels sont les droits sur test et fichier1 ?

```bash
cd
mkdir test
touch /test/fichier1
echo bla >> /test/fichier1
ls -l test
```
le fichier appartient a l'utilisateur qui l'a créé cad : droit de modif/exec pour l'utilisateur et son grp primaire et droit de lecture pour les autres

### Retirez tous les droits sur ce fichier (même pour vous), puis essayez de le modifier et de l’afficher en tant que root. Conclusion

```bash
chmod -R 000 test
ls -l test
nano fichier1
```

la modif fonctionne en root.


### Redonnez vous les droits en écriture et exécution sur fichier puis exécutez la commande echo "echo Hello" > fichier. On a vu lors des TP précédents que cette commande remplace le contenu d’un fichier s’il existe déjà. Que peut-on dire au sujet des droits ?

```bash
chmod 300 -R test
echo "echo Hello" > fichier1
```

### Essayez d’exécuter le fichier. Est-ce que cela fonctionne ? Et avec sudo ? Expliquez.

```bash
./fichier1
sudo ./fichier
```

l'execution ne marche pas car il faut les droits de lecture pour voir la commande à exécuter, en su vu que root fait fi des permissions ça fonctionne

### Placez-vous dans le répertoire test, et retirez-vous le droit en lecture pour ce répertoire. Listez le contenu du répertoire, puis exécutez ou affichez le contenu du fichier essai. Qu’en déduisez-vous ? Rétablissez le droit en lecture sur test

```bash
cd test
chmod 000 test
ls -l
permission denied
cat fichier1
permission denied
chmod 700 -R test
```

### Créez dans test un fichier nouveau ainsi qu’un répertoire sstest. Retirez au fichier nouveau et au répertoire test le droit en écriture. Tentez de modifier le fichier nouveau. Rétablissez ensuite le droit en écriture au répertoire test. Tentez de modifier le fichier nouveau, puis de le supprimer. Que pouvez-vous déduire de toutes ces manipulations ?

```bash
mkdir sstest
touch nouveau
chmod u=rx nouveau
chmod u=rx sstest
```

les droits sont cohérent : on peut renomme le fichier, le supprimer mais pas le lire ni le modif, pour le dossier on peux s'y rendre/le supprimer mais on ne peux pas créer de truc à l'interieur

### Positionnez vous dans votre répertoire personnel, puis retirez le droit en exécution du répertoire test. Tentez de créer, supprimer, ou modifier un fichier dans le répertoire test, de vous y déplacer, d’en lister le contenu, etc...Qu’en déduisez vous quant au sens du droit en exécution pour les répertoires ?

```bash
chmod u-x test
```
on ne peut rien faire dans le dossier

### Rétablissez le droit en exécution du répertoire test. Positionnez vous dans ce répertoire et retirez lui à nouveau le droit d’exécution. Essayez de créer, supprimer et modifier un fichier dans le répertoire test, de vous déplacer dans ssrep, de lister son contenu. Qu’en concluez-vous quant à l’influence des droits que l’on possède sur le répertoire courant ? Peut-on retourner dans le répertoire parent avec ”cd ..” ? Pouvez-vous donner une explication ?
```bash
chmod +x test
cd test
touch e
mkdir eeee
chmod -x test
cat e
permission denied
cd ..
```
on ne peux toujours rien faire mise à part sortir du fichier.


### Rétablissez le droit en exécution du répertoire test. Attribuez au fichier essai les droits suffisants pour qu’une autre personne de votre groupe puisse y accéder en lecture, mais pas en écriture.

```bash
chmod g=r essai
```

### Définissez un umask très restrictif qui interdit à quiconque à part vous l’accès en lecture ou en écriture, ainsi que la traversée de vos répertoires. Testez sur un nouveau fichier et un nouveau répertoire.

```bash
chmod u=rxw,g-rxw,o-rxw -R test
```

### Définissez un umask très permissif qui autorise tout le monde à lire vos fichiers et traverser vos répertoires, mais n’autorise que vous à écrire. Testez sur un nouveau fichier et un nouveau répertoire.

```bash
chmod u=rxw,g=rx,o=rx -R test
```

### Définissez un umask équilibré qui vous autorise un accès complet et autorise un accès en lecture aux membres de votre groupe. Testez sur un nouveau fichier et un nouveau répertoire.

```bash
chmod u=rxw,g=rx,o= -R test
```

### Transcrivez les commandes suivantes de la notation classique à la notation octale ou vice-versa (vous pourrez vous aider de la commande stat pour valider vos réponses) :
- chmod u=rx,g=wx,o=r fic : utilisateur droit en lecture exec , groupe : r-x-wx-r--
- chmod uo+w,g-rx fic en sachant que les droits initiaux de fic sont r--r-x--- : rw----xw-
- chmod 653 fic en sachant que les droits initiaux de fic sont 711 : rw-r-x-wx
- chmod u+x,g=w,o-r fic en sachant que les droits initiaux de fic sont r--r-x--- : rx--w----

### Affichez les droits sur le programme passwd. Que remarquez-vous ? En affichant les droits du fichier /etc/passwd, pouvez-vous justifier les permissions sur le programme passwd ?

```bash

ls -l /etc/passwd
-rw-r--r-- 1 root root 2279 mars  18 07:48 /etc/passwd
```

tous les utilisateur peuvent le lire mais seul root peut le modifier.

### Access Control Lists (ACL) : suivez le tutoriel de cette page : https://doc.ubuntu-fr.org/acl.

### Quotas disques : suivez le tutoriel de cette page : https://doc.ubuntu-fr.org/quota.
