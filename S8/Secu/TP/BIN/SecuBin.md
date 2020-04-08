# Secu Binaire

## Cours

```bash
sudo docker run -it registry.gitlab.com/piloo/tps:tpbin2 /bin/bash
cd niveau1
./niveau1
```

On peut regarder le contenu avec ```gdb ./niveau1``` et on exit avec ```quit```
On poeut avoir le code assembleur avec ```pdisass main```
On ne peut pas lire l'assembleur lignt par ligne, il vaut mieux commencer à reconnaitre les groupes (printf, etc)
On peut demander la conversion d'un exa avec ```p /d 0x40```
On peut retrouver les instruction avec explore ```x/s``` (string) ou ```x/x``` (hexa)

Analyser en statique c'est juste demander la mémoire

Analyer en dynamique c'est stopper le programe (breakpoint) pour demander la mémoire durant le programme
```b *[addresse]``` et ```delete breakpoint [n°]``` ou ```delete breakpoints``` pour suppr
```n``` --> next
```c``` --> continue

le prologiue permet de réserver la stackframe (assignation de la mémoire à la variable)

## Ex1

On utilise strings (**BASH**) pour trouver les variables encodées et on trouve le mdp.

## Ex2

En utilisans pdisass, on arrive à reconnaitre les caractères codés en dur.

## Ex3

On se rend compte qu'il y a un chiffrement des caractères codés en dur donc on peut les retrouver. (chiffrement XOR)

## Ex4

### Appeler la fonction callMeMaybe

#### Principe

La faille est un stack overflow. Entre ESP et EBP, on voit une différence de 0x38(0d56) octet reservé alors qu'on autorise ca saisie de 0c8(0d200).
Lorsqu'on sort de la fonction checkpassword (dans la fonction main), l'instruction suivante est censée être "aller à l'adresse contenue dans SEIP". Si on arrive à changer l'instruction, alors on peut appeller CallMeMaybe.
Pour savoir combien on est censé mettre, on regarde l'adresse de SEIP. Et on regarde la différence entre SEIP et l'adresse du buffer (adresse du début de la saisie) et ensuite on flood avec l'entrée utilisateur pour override EIP et donc mettre l'adresse de la fonction callMeMaybe à la place de là où est censé continuer le code.

#### Exemple

On est dans la fonction main
on met un breakpoint durant l'appel de la fonction fgets (ici 0x8048390) --> ```b * 0x080484dd```
On lance la fonction puis on fait un ```info frame``` pour trouver le buffer(stack) et l'adresse de eip (parcequ'on veut override eip).

Ici, on trouve :
EIP --> Adresse de l'EIP (pas sa valeur) --> 0xffb08b2c
stack : Il faut prendre l'adresse du second argument (ce que tu as rentré) --> 0xffb08b0c
En faisant EIP - stack : ```p/d 0xffb08b2c - 0xffb08b0c``` = 32
On va donc vouloir flood la mémoire avec 32 caractères puis on veut rajouter l'adresse de la fonction callMeMaybe pour qu'elle écrase pile poil la valeur d'EIP.

Pour trouver la valeur de l'adresse de callMeMaybe : ```disassemble callMeMaybe``` et on prend la valeur de la première instruction (ici 0x08048494)
Les adresses de processeur sont en Little Indian, c'est à dire que les adresses sont retournées si on les passe en argument
On écrit donc : ```python -c 'print "A"*32 + "\x94\x84\x04\x08"' | ./niveau4```
On peut vérifier avec ```sudo dmesg | tail```

### Obtenir un shell

On utilise un shell code (suite d'instruction assembleur intrerpretable par l''assembleur). Donc en on insère le shellcode dans une variable d'environement (ici SC) et on lance la "fonction" avec la même manip d'SEIP. Le shell code utilisé sera un pour prendre la main sur le shell.

En executant le programe niveau4 plusieurs fois, la protection ASLR va changer l'adresse du SC régulièrement (on peut regarder avec ```./../tools/getenv SC ./niveau4```)
On va faire un nope slide pour couvrir la plage d'adresse que peut prendre les variables d'env. La technique du nope slide consiste en un flood d'instruction NOPE (no operation) qui vont faire "glisser le pointeur" jusqu'au début du code qui sera situé en dehors de la plage (pour éviter qu'on tombe en plein milieu).
