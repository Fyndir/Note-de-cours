#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h> 
#include <stdio.h> 
#include <stdlib.h> 

#include "bmp.h"

couleur_compteur * analyse_bmp_image(char *nom_de_fichier) {
  couleur_compteur * cc = NULL;
  int fd = open(nom_de_fichier, O_RDONLY);  
  printf("%s",nom_de_fichier);
  if (fd < 0) {
    perror("Erreur: open");
    return 0;
  }

  bmp_header bheader;
  bmp_info_header binfo_header;

  ssize_t compte = read(fd, &bheader, sizeof(bheader));
  if (compte < 0) {
    perror("Erreur: read");
    return(NULL);
  }

  if (bheader.type != 0x4D42) {
    return(NULL);
  }

  compte = read(fd, &binfo_header, sizeof(binfo_header));
  if (compte < 0) {
    perror("Erreur: read");
    return(NULL);
  }
  
  off_t offset = lseek(fd, bheader.offset, SEEK_SET);
  if (offset != bheader.offset) {
    perror("Erreur: lseek");
    return(NULL);
  }

  if (binfo_header.compte_bit == 32) {
    couleur32 * c32 = calloc (binfo_header.taille_image/4, 4);
    read(fd, c32, binfo_header.taille_image);
    if (compte < 0) {
      perror("Erreur: read");
      return(NULL);
    }

    int ccsize;
    couleur c;
    c.compte_bit = BITS32;
    c.c.c32 = c32;
    cc = compte_couleur(&c, binfo_header.taille_image/4);
    trier_couleur_compteur(cc);
  }
  else if (binfo_header.compte_bit == 24) {
    couleur24 * c24 = calloc (binfo_header.taille_image/3, 3);
    read(fd, c24, binfo_header.taille_image);
    if (compte < 0) {
      perror("Erreur: read");
      return(NULL);
    }

    int ccsize;
    couleur c;
    c.compte_bit = BITS24;
    c.c.c24 = c24;
    cc = compte_couleur(&c, binfo_header.taille_image/3);
    trier_couleur_compteur(cc);
  }
 
  close(fd);

  return cc; 
}
