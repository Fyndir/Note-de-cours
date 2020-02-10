#TP 6 - Gestion des disques / Tâches d’administration

## Exercice 1. Disques et partitions

### 1. Dans l’interface de configuration de votre VM, créez un second disque dur, de 5 Go dynamiquement alloués ; puis démarrez la VM

tous se fait avec l'interface graphique de virtual box

### 2. Vérifiez que ce nouveau disque dur est bien détecté par le système

on utilise la commande ```cfdisk -l``` pour voir la liste des periphériques.

```
Device     Boot  Start     End Sectors  Size Id Type
/dev/sdb1         2048  411647  409600  200M 83 Linux
/dev/sdb2       411648 1023999  612352  299M  7 HPFS/NTFS/exFAT
```

### 3. Partitionnez ce disque en utilisant fdisk : créez une première partition de 2 Go de type Linux (n°83), et une seconde partition de 3 Go en NTFS (n°7)

on utilise la commande ```fdisk /dev/sdb/``` .
Cependant la commande ```cfdisk /dev/sdb/``` est beaucoup plus intinctive et user friendly

On verifie que les partitions ont étées crées avec la commande  ```cfdisk -l```


### 4. A ce stade, les partitions ont été créées, mais elles n’ont pas été formatées avec leur système de fichiers. A l’aide de la commande mkfs, formatez vos deux partitions ( pensez à consulter le manuel !)

on utilise la commande  ``` mkfs.ext4 /dev/sdb2``` et ```mkfs.ext4 /dev/sdb1/``` pour formater en ext4 qui est le format de fichier le plus recent.

### 5. Pourquoi la commande df -T, qui affiche le type de système de fichier des partitions, ne fonctionne-t-elle pas sur notre disque ?

Parce que les partitions n'ont jamais étées montées sur le systeme.

### 6. Faites en sorte que les deux partitions créées soient montées automatiquement au démarrage de la machine, respectivement dans les points de montage /data et /win (vous pourrez vous passer des UUID en raison de l’impossibilité d’effectuer des copier-coller)

On utilise la commande ```mkdir``` pour créer les point de montage :
```
mkdir /data
mkdir /win
```

on les monte avec la commande mount :
```
mount /dev/sdb1 /data
mount /dev/sdb2 /win
```
à l'aide de la commande ```blkid``` on recupere le UUID et on genere les ligne si dessous.
```
root@serv:/home/fynn# echo "UUID=9bbebe0a-f534-4cc2-be71-caaf3b3eabbd /data auto defaults 0 0" >> /etc/fstab
root@serv:/home/fynn# echo "UUID=3c79825c-6fe6-4447-8cca-005d7c4267ae /win auto defaults 0 0" >> /etc/fstab
```

### 7. Utilisez la commande mount puis redémarrez votre VM pour valider la configuration

On redemare la vm et on utilise la commande ```mount -l``` pour verifier que les deux partitions sont monter :

```
/dev/sdb1 on /data type ext4 (rw,relatime,data=ordered)
/dev/sdb2 on /win type ext4 (rw,relatime,data=ordered)
```

### 8. Montez votre clé USB dans la VM

On utilise ```fdisk -l``` pour voir le nouveau peripherique de montage
on utilise la commande ```mont /dev/sdX /Mnt``` pour monter la clef usb

### 9. Créez un dossier partagé entre votre système hôte (rem. il peut être nécessaire d’installer les Additions invité de VirtualBox)

tous se fait avec l'interface graphique du client VirtualBox

## Exercice 2. Partitionnement LVM

### 1. On va réutiliser le disque de 5 Gio de l’exercice précédent. Commencez par démonter les systèmes de fichiers montés dans /data et /win s’ils sont encore montés, et supprimez les lignes correspondantes du fichier /etc/fstab

On utilise les commande suivante pour démonter les 2 lecteurs reseau :
```
root@serv:/home/fynn# umount /data
root@serv:/home/fynn# umount /win
```

on edite le fichier /etc/fstab pour supprimer les deux lignes suivantes :

```
UUID=9bbebe0a-f534-4cc2-be71-caaf3b3eabbd /data auto defaults 0 0
UUID=3c79825c-6fe6-4447-8cca-005d7c4267ae /win auto defaults 0 0

```

### 2. Supprimez les deux partitions du disque, et créez une patition unique de type LVM

on utile ```cfdisk``` pour avoir une interface grafique.
```
root@serv:/home/fynn# cfdisk /dev/sdb
```

on utilise la commande ```fdisk -l``` pour verifier que ça a marché :
```
Device     Boot Start     End Sectors  Size Id Type
/dev/sdb1        2048 1023999 1021952  499M 8e Linux LVM
```

### 3. A l’aide de la commande pvcreate, créez un volume physique LVM. Validez qu’il est bien créé, en utilisant la commande pvdisplay.

Pour créer le volume :
```7oot@serv:/home/fynn# pvcreate /dev/sdb1
WARNING: ext4 signature detected on /dev/sdb1 at offset 1080. Wipe it? [y/n]: y
  Wiping ext4 signature on /dev/sdb1.
  Physical volume "/dev/sdb1" successfully created.
```
pour verifier qu'il existe :
```
root@serv:/home/fynn# pvdisplay
  "/dev/sdb1" is a new physical volume of "499,00 MiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdb1
  VG Name               
  PV Size               499,00 MiB
  Allocatable           NO
  PE Size               0   
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               1BDsGV-js3r-2gBd-NjoB-K88g-zqmt-8nOc5Q
```

### 4. A l’aide de la commande vgcreate, créez un groupe de volumes, qui pour l’instant ne contiendra que le volume physique créé à l’étape précédente. Vérifiez à l’aide de la commande vgdisplay.

creation :
```
root@serv:/home/fynn# vgcreate volume1 /dev/sdb1
  Volume group "volume1" successfully created
```
verfication :
```
root@serv:/home/fynn# vgdisplay
  --- Volume group ---
  VG Name               volume1
  System ID             
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               496,00 MiB
  PE Size               4,00 MiB
  Total PE              124
  Alloc PE / Size       0 / 0   
  Free  PE / Size       124 / 496,00 MiB
  VG UUID               06ubKb-wsKW-GCCx-nMlS-uoP3-4KVM-VygkNM
```
### 5. Créez un volume logique appelé lvData occupant l’intégralité de l’espace disque disponible.

On utilise les commandes :
```
root@serv:/home/fynn# lvcreate -l 100%FREE -n lvData volume1
  Logical volume "lvData" created.
```
et on verifie avec :
```
root@serv:/home/fynn# lvdisplay
  --- Logical volume ---
  LV Path                /dev/volume1/lvData
  LV Name                lvData
  VG Name                volume1
  LV UUID                mTJGP1-1K3f-x4rP-D0Gz-VGB0-QBX5-WOjz9Q
  LV Write Access        read/write
  LV Creation host, time serv, 2019-05-06 08:47:01 +0000
  LV Status              available
  # open                 0
  LV Size                496,00 MiB
  Current LE             124
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:0
```

### 6. Dans ce volume logique, créez une partition que vous formaterez en ext4, puis procédez comme dans l’exercice 1 pour qu’elle soit montée automatiquement, au démarrage de la machine, dans /data.

On utilise la commande ```fdisk -l ``` pour recupérer le nom du volume :
```
Disk /dev/mapper/volume1-lvData: 496 MiB, 520093696 bytes, 1015808 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```
et on utilise la commande ```cfdisk /dev/mapper/volume1-lvData``` pour créer la partition.

Pour la formater au format ext4 :
```
root@serv:/home/fynn# mkfs.ext4 /dev/mapper/volume1-lvData
mke2fs 1.44.1 (24-Mar-2018)
Found a dos partition table in /dev/mapper/volume1-lvData
Proceed anyway? (y,N) y
Creating filesystem with 507904 1k blocks and 126976 inodes
Filesystem UUID: f0a2c404-7929-403f-b5a3-42a773dc3c42
Superblock backups stored on blocks:
	8193, 24577, 40961, 57345, 73729, 204801, 221185, 401409

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (8192 blocks): done
Writing superblocks and filesystem accounting information: done
```

on rajoute la ligne suivante dans ```/etc/dev/fstab``` :

```
UUID=f0a2c404-7929-403f-b5a3-42a773dc3c42 /data auto defaults 0 0
```

### 7. Eteignez la VM pour ajouter un second disque (peu importe la taille pour cet exercice). Redémarrez la VM, vérifiez que le disque est bien présent. Puis, répétez les questions 2 et 3 sur ce nouveau disque.

On verifie que le nouevau volume est bien present avec ```fdisk -l``` :
```
Disk /dev/sdc: 506,2 MiB, 530804224 bytes, 1036727 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

on créé une partition avec la commande ```cfdisl /dev/sdc```

on créé le volume physique :
```
root@serv:/home/fynn# pvcreate /dev/sdc1
Physical volume "/dev/sdc1" successfully created.

```

### 8. Utilisez la commande vgextend <nom_vg> <nom_pv> pour ajouter le nouveau disque au groupe de volumes

on utilise la commande suivante :
```
root@serv:/home/fynn# vgextend volume1 /dev/sdc1
Volume group "volume1" successfully extended
```

### 9. Utilisez la commande lvresize (ou lvextend) pour agrandir le volume logique. Enfin, il ne faut pas oublier de redimensionner le système de fichiers à l’aide de la commande resize2fs

on utilise la commande
```
root@serv:/home/fynn# lvresize /dev/mapper/volume1-lvData -l 250
  Size of logical volume volume1/lvData changed from 504,00 MiB (126 extents) to 1000,00 MiB (250 extents).
  Logical volume volume1/lvData successfully resized.
```

le 250 est donnée par la commande ```vgdisplay``` :
```
root@serv:/home/fynn# vgdisplay
  --- Volume group ---
  VG Name               volume1
  System ID             
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  4
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               1
  Max PV                0
  Cur PV                2
  Act PV                2
  VG Size               1000,00 MiB
  PE Size               4,00 MiB
  Total PE              250
  Alloc PE / Size       126 / 504,00 MiB
  Free  PE / Size       124 / 496,00 MiB
  VG UUID               06ubKb-wsKW-GCCx-nMlS-uoP3-4KVM-VygkNM
```

## Exercice 3. Exécution de commandes en différé : at et cron

### 1. Programmez une tâche qui affiche un rappel pour la réunion qui aura lieu dans 3 minutes. Vérifiez entre temps que la tâche est bien programmée.

On utile la commande : ```echo 'echo "reunion"'| at now +3 minutes```

### 2. Est-ce que le message s’est affiché ? Si la réponse est non, essayez de trouver la cause du problème (par exemple en vous aidant des logs, du manuel...)

on a l'erreur suivante :
```
May  6 09:22:00 serv atd[3272]: Exec failed for mail command: No such file or directory
```

pour palier à ce pb on installe mailutils


### 3. Pour tester le fonctionnement de cron, commencez par programmer l’exécution d’une tâche simple,l’affichage de “Il faut réviser pour l’examen !”, toutes les 3 minutes.

on utile la ligne :
```
crontab -e
*/5 * * * * echo "Il faut réviser pour l’examen!"
```

### 4.  Programmez l’exécution d’une commande tous les jours, toute l’année, tous les quarts d’heure

on utile la ligne :
```
crontab -e
*/5 * * * * echo "Il faut réviser pour l’examen!"
*/15 * * * * echo "Tout les quarts d'heure"
```

### 5. Programmez l’exécution d’une commande toutes les cinq minutes à partir de 2 (2, 7, 12, etc.) à 18 heures les 1er et 15 du mois

on utile la ligne :
```
crontab -e
2-18/5 18 1,15 * * echo "echo 'hehe'"
```

### 6. Programmez l’exécution d’une commande du lundi au vendredi à 17 heures

on utilise :
```
crontab -e
* 17 * * mon,tue,wed,thu,fri echo "echo 'semaine'"
```

### 7. Modifiez votre crontab pour que les messages ne soient plus envoyés par mail, mais redirigés dans un fichier de log situé dans votre dossier personnel

on rajoute l'entete MAIL TO dans la cron table :
```
crontab -e
MAIL TO
```

### 8. Videz votre crontab

la commande ```crontab -r``` vide les cron talbe
