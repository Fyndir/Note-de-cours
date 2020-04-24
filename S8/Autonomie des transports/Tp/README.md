# TP1

## Commande de base

```bash
candump vcan0 # Print every frames received on vcan0
```

la commande ci dessus permet d'afficher les trames recues sur l'interface virtuel vcan0

```bash
cansend vcan0 123#F0A1DD03 # Send 4 bytes 0xF0 0xA1 0xDD 0x03 with frame ID Ox123
```

la commande ci dessus permet d'envoyer des trames sur l'interface virtuel vcan0. 

Les trames de données sont encodées : adresse#bit1bit2bit3bit4

pour envoyer une trames de type remote : adresse#RLongueurMessage

>    <can_id>#{data}            for 'classic' CAN 2.0 data frames

>    <can_id>#R{len}            for 'classic' CAN 2.0 RTR frames

>    <can_id>##<flags>{data}    for CAN FD frames



## Let's write your own C code to send a can frame

Write a program test.c sending (in a loop) 8 bytes with the ID 0x8123 on vcan0. The same program should listen and print every frames with an ID between 0x100 and 0x1FF, but not frames with other IDs.
Test it thanks to can-utils tools
Your must comment each relevant line of the code with /* comment */

```c
 #include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <net/if.h>
#include <sys/ioctl.h>
#include <sys/socket.h>

#include <linux/can.h>
#include <linux/can/raw.h>

int main(int argc, char **argv)
{
	int s; // mon socket
	struct sockaddr_can addr; // adresse du socket
	struct ifreq ifr; // identifiant de la frame
	struct can_frame frame; // ma frame
	int i =10; // Nb envoi de la trame

	int nbytes; // Nb bytes dans la tram pour la lecture

	printf("CAN Sockets Demo\r\n");

    /* Ouverture de la socket */
	if ((s = socket(PF_CAN, SOCK_RAW, CAN_RAW)) < 0) {
		perror("Socket");
		return 1;
	}

    /* definition de l'interface de destination */
	strcpy(ifr.ifr_name, "vcan0" );
	ioctl(s, SIOCGIFINDEX, &ifr);

    /* clean l'espace memoire  */
	memset(&addr, 0, sizeof(addr));
	/* Parametrage de l'adresse */    
    addr.can_family = AF_CAN;
	addr.can_ifindex = ifr.ifr_ifindex;

    /* Bind du socket */
	if (bind(s, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
		perror("Bind");
		return 1;
	}

    /* Envoi de la frame */
    while(i!=0)
    {
		/* Parametre de la frame*/
		frame.can_id = 0x8123; //  addresse frame
		frame.can_dlc = 8; // nb octet de la frame
		sprintf(frame.data, "azertyu"); // Contenu
		
        if (write(s, &frame, sizeof(struct can_frame)) != sizeof(struct can_frame)) {
            perror("Write");
            return 1;
        }       
		i--;	


		struct can_filter rfilter[1];

		rfilter[0].can_id   = 0x100;
		rfilter[0].can_mask = 0xF00;	

		setsockopt(s, SOL_CAN_RAW, CAN_RAW_FILTER, &rfilter, sizeof(rfilter));

		/* Receive the frame */		
		nbytes = read(s, &frame, sizeof(struct can_frame));
		if (nbytes < 0) {
			perror("Read");
			return 1;
		}
		printf("CAN Sockets read : \r\n");
		/**** Print tram reçu ***/
		printf("0x%03X [%d] ",frame.can_id, frame.can_dlc);

		for (j = 0; j < frame.can_dlc; j++)
			printf("%02X ",frame.data[j]);

		printf("\r\n");

    }
    /* Fermeture de la frame */
    if (close(s) < 0) {
        perror("Close");
        return 1;
    }

	return 0;
}


```

## HackKKKKKKKK


On peut voir avec la commande ci dessous les trams can envoyer par le programme `vehicule_checker` :

```bash
candump vcan0 # Print every frames received on vcan0
```
A l'aide du programme si dessus il est facile de les rejouer et de déduire leur role :

* `cansend vcan0 123#0000` --> tout eteindre
* `cansend vcan0 123#0001` --> clignotant droit
* `cansend vcan0 123#0002` --> clignotant gauche
* `cansend vcan0 123#0003` --> clignotant gauche + droit
* `cansend vcan0 123#0100` --> far
* `cansend vcan0 123#0200` --> plein far

Toute les valeurs inconnues eteignent tout

# TP2a

## Features available on CAN-Bus

|     Area     |            What is seen            |
|:------------:|:----------------------------------:|
|  Full left   | Road: 68%, yield: 5%, crossing: 9% |
|     Left     |      Road: 43%, crossing: 9%       |
| Middle left  |      Road: 51%, crossing: 6%       |
| Middle right |             Road: 15%              |
|    Right     |              Road: 6%              |
|  Full right  |             Road: 45%              |

## Re-code vehicle_checker


```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <time.h>

#include <net/if.h>
#include <sys/ioctl.h>
#include <sys/socket.h>

#include <linux/can.h>
#include <linux/can/raw.h>

int main(int argc, char **argv)
{
	int s; // mon socket
	struct sockaddr_can addr; // adresse du socket
	struct ifreq ifr; // identifiant de la frame
	struct can_frame frame; // ma frame   
	int nbytes; // Nb bytes dans la tram pour la lecture

	printf("CAN Sockets Demo\r\n");

    /* Ouverture de la socket */
	if ((s = socket(PF_CAN, SOCK_RAW, CAN_RAW)) < 0) {
		perror("Socket");
		return 1;
	}

    /* definition de l'interface de destination */
	strcpy(ifr.ifr_name, "vcan0" );
	ioctl(s, SIOCGIFINDEX, &ifr);

    /* clean l'espace memoire  */
	memset(&addr, 0, sizeof(addr));
	/* Parametrage de l'adresse */    
    addr.can_family = AF_CAN;
	addr.can_ifindex = ifr.ifr_ifindex;

    /* Bind du socket */
	if (bind(s, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
		perror("Bind");
		return 1;
	}

    /* en attente des trames de 0xC00 a 0xC07 */

    /* parametrage du filtra */
    struct can_filter rfilter[1];
    rfilter[0].can_id   = 0xC00;
    rfilter[0].can_mask = 0xFFF;

    printf("En attente des 8 frames\n");
    while(rfilter[0].can_id <= 0xC07)
    {
        /* Setting our filter to our socket */
        setsockopt(s, SOL_CAN_RAW, CAN_RAW_FILTER, &rfilter, sizeof(rfilter));

        /* On lit les frames de vcan0 */
        printf("Reading id %x...", rfilter[0].can_id);
        nbytes = read(s, &frame, sizeof(struct can_frame));

        if (nbytes < 0) {
            perror("Read");
            return 1;
        }
        
        /* Print la trame */
        printf("0x%03X [%d] ",frame.can_id, frame.can_dlc);

        for (int k = 0; k < frame.can_dlc; k++)
            printf("%02X ",frame.data[k]);

        printf("\r\n");

        rfilter[0].can_id++;
    } 
    
    printf("Debut des instructions : \r\n"); 
    printf("\r\n");

    /* Envoi des frames de deplacements de la voiture */
    int i =0; // iterateur de la trame de gestion des phares/clicgno
    char* instfar[]= {  
    "\x00\x00",  // Tout eteindre 
    "\x00\x02", // clignotant droit
    "\x00\x01", // clignotant gauche
    "\x01\x00", // petit phare
    "\x02\x00", // grand phare
    "\x00\x00"  // Tout eteindre
    } ;
    /* Phare+clignotant */
    while(i!=6)
    {
        printf("lumiere %d:%x%x \n",i,instfar[i][0],instfar[i][1]);
		/* Parametre de la frame*/
		frame.can_id = 0x123; //  addresse frame
		frame.can_dlc = 2; // nb octet de la frame
		memcpy(frame.data,instfar[i],sizeof(char)*frame.can_dlc) ;  // Contenu
		
        if (write(s, &frame, sizeof(struct can_frame)) != sizeof(struct can_frame)) {
            perror("Write");
            return 1;
        }       
		i++;	
        sleep(1);
    }



    int j =0; // iterateur de la trame de gestion des deplacements
    char* instdeplacement[]= {   
        "\x32\x00\x12", // on tourne en avançant       
        "\32\x00\x00", // on va tout droit 
        "\x00\64\x00", // en freine  
    } ;
    /* deplacement */
    while(j!=3)
    {
        printf("deplacement %d:%x%x%x \n",j,instdeplacement[j][0],instdeplacement[j][1],instdeplacement[j][2]);
		/* Parametre de la frame*/
		frame.can_id = 0x321; //  addresse frame
		frame.can_dlc = 3; // nb octet de la frame		
        memcpy(frame.data,instdeplacement[j],sizeof(char)*frame.can_dlc) ;    // Contenu      
		
        if (write(s, &frame, sizeof(struct can_frame)) != sizeof(struct can_frame)) {
            perror("Write");
            return 1;
        }       
		j++;	
        usleep(9725000);
    }

    /* Fermeture de la frame */
    if (close(s) < 0) {
        perror("Close");
        return 1;
    }

	return 0;
}

```


## Dashboard

Je pense que je n'aurais pas du utiliser le 0x321 mais j'ai dev une solution alternative est dans le code du raod_follower   
 ```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <net/if.h>
#include <sys/ioctl.h>
#include <sys/socket.h>

#include <linux/can.h>
#include <linux/can/raw.h>

/*  permet de clear le terminal*/
void clear_term() {
        printf("\033[H\033[J");
}

/* permet de set le curseur du termnal en x,y */
void set_cursor_pos(int x, int y) {
        printf("\x1b[%d;%dH", y, x); 
}

int main(int argc, char **argv)
{
	int s; // mon socket
	struct sockaddr_can addr; // adresse du socket
	struct ifreq ifr; // identifiant de la frame
	struct can_frame frame; // ma frame
	int i =10; // Nb envoi de la trame

	int nbytes; // Nb bytes dans la tram pour la lecture

	printf("CAN Sockets Demo\r\n");

    /* Ouverture de la socket */
	if ((s = socket(PF_CAN, SOCK_RAW, CAN_RAW)) < 0) {
		perror("Socket");
		return 1;
	}

    /* definition de l'interface de destination */
	strcpy(ifr.ifr_name, "vcan0" );
	ioctl(s, SIOCGIFINDEX, &ifr);

    /* clean l'espace memoire  */
	memset(&addr, 0, sizeof(addr));
	/* Parametrage de l'adresse */    
    addr.can_family = AF_CAN;
	addr.can_ifindex = ifr.ifr_ifindex;

    /* Bind du socket */
	if (bind(s, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
		perror("Bind");
		return 1;
	}
    /* Clear le terminal pour avoir un jolie affichage */ 
    clear_term();
   
    /* Lecture des trames dans une boucle infini */
    while(1)
    {
        /* On attrape la tram */         	
        nbytes = read(s, &frame, sizeof(struct can_frame));
        if (nbytes < 0) {
            perror("Erreur de lecture");
            return 1;
        }        

        /* On affiche les bonnes infos en fontions de la tram */
        switch(frame.can_id & 0xFFF /* Pour enlever les 0 inutile */){
            /* Tram de vitesse  rpm */
            case 0xC06:
                set_cursor_pos(1, 3); 
                /* defini sur 2 bit */
                printf("Motor speed: %d rpm\n", frame.data[1] << 8 | frame.data[0]);
                break; 
            case 0xC07:
                set_cursor_pos(1, 1); 
                printf("Speed : %d km/h \n",frame.data[0]);
                set_cursor_pos(1, 2); 
                printf("Gear : %d",frame.data[1]);
                break; 
            case 0x321:
                set_cursor_pos(1, 4);   
                if (frame.data[2] > 0)
                    printf("Direction follow :<- \n");
                if (frame.data[2] < 0)
                    printf("Direction follow :-> \n");
                if (frame.data[2] == 0)
                    printf("Direction follow : ^ \n");                
                break; 
        }
        printf("\r\n");
    }

	return 0;
}


 ```


 ## Loop

 ```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <net/if.h>
#include <sys/ioctl.h>
#include <sys/socket.h>

#include <linux/can.h>
#include <linux/can/raw.h>

/* Attend les données des capteurs du vehicules et retourne deux valeur (droite gauche)*/
int recupdatacapteur(int s,int poids[]) {
        struct can_frame frame;
        // Création du filtre
        struct can_filter rfilter[1];

        // Définition du masque du filtre du CAN
        rfilter[0].can_id   = 0xC00;
        rfilter[0].can_mask = 0xFF8;

        setsockopt(s, SOL_CAN_RAW, CAN_RAW_FILTER, &rfilter, sizeof(rfilter));

        u_int8_t can_id;
        u_int8_t init_done = 0x00;        

        while (init_done != 0xff) {
                if (read(s, &frame, sizeof(struct can_frame)) < 0) {
                        perror("Read");
                        return -1; 
                }
                // recupe le nombre apres le "C"
                can_id = frame.can_id & 0xff;
                switch (can_id)
                {
                    case 00: 
                        poids[0]+=frame.data[0]*50;
                        break;
                    case 01:
                        poids[0]+=frame.data[0]*10;
                        break;
                    case 02:
                        poids[0]+=frame.data[0];
                        break;
                    case 03:
                        poids[1]+=frame.data[0]*50;
                        break;
                    case 04:
                        poids[1]+=frame.data[0]*10;
                        break;
                    case 05:
                        poids[1]+=frame.data[0];
                        break;
                    
                }
                   
                // on up les bit un par un , quand ils sont tous up les données sont toute reçu
                init_done = init_done + (1 << can_id);
        }
        return 0;
        
}

/*  permet de clear le terminal*/
void clear_term() {
        printf("\033[H\033[J");
}

/* permet de set le curseur du termnal en x,y */
void set_cursor_pos(int x, int y) {
        printf("\x1b[%d;%dH", y, x); 
}

int send_frame(int s, int adresse , int nboctet , char* data)
{
    struct can_frame frame; // ma frame   
    frame.can_id = adresse;
	frame.can_dlc = nboctet;	
    memcpy(frame.data,data,sizeof(char)*frame.can_dlc) ; 
    if(write(s, &frame, sizeof(struct can_frame)) != sizeof(struct can_frame)) {
        perror("Write");
        return 1;
    }
    else return 0;
}

int main(int argc, char **argv)
{
	int s; // mon socket
	struct sockaddr_can addr; // adresse du socket
	struct ifreq ifr; // identifiant de la frame
	struct can_frame frame; // ma frame
	int i =10; // Nb envoi de la trame

	int nbytes; // Nb bytes dans la tram pour la lecture

	printf("CAN Sockets Demo\r\n");

    /* Ouverture de la socket */
	if ((s = socket(PF_CAN, SOCK_RAW, CAN_RAW)) < 0) {
		perror("Socket");
		return 1;
	}

    /* definition de l'interface de destination */
	strcpy(ifr.ifr_name, "vcan0" );
	ioctl(s, SIOCGIFINDEX, &ifr);

    /* clean l'espace memoire  */
	memset(&addr, 0, sizeof(addr));
	/* Parametrage de l'adresse */    
    addr.can_family = AF_CAN;
	addr.can_ifindex = ifr.ifr_ifindex;

    /* Bind du socket */
	if (bind(s, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
		perror("Bind");
		return 1;
	}  

    int rpm =0;
    int vitesse =0;
    int direction = 0x00;
    int acceleration = 0x64;
    int frein = 0x00;
    char tampon[3];
    /* Lecture des trames dans une boucle infini */
    while(1)
    {
        /* On attrape la tram */         	
        nbytes = read(s, &frame, sizeof(struct can_frame));
        if (nbytes < 0) {
            perror("Erreur de lecture");
            return 1;
        }        
        
        /* On regule la vitesse */
        switch(frame.can_id & 0xFFF /* Pour enlever les 0 inutile */){        
            /* Tram de vitesse en km/h */
            case 0xC07:
                vitesse = frame.data[0];

                /* On accelere */
                if (vitesse < 50)
                {
                    frein=0x00;
                    acceleration=0x64;
                    sprintf(tampon,"%c%c%c",acceleration,frein,direction); 
                    send_frame(s,0x321,3,tampon);
                }   
                /* On ralenti */            
                else if(vitesse == 50)
                {
                    acceleration=0x00;
                    frein=0x00;
                    sprintf(tampon,"%c%c%c",acceleration,frein,direction); 
                    send_frame(s,0x321,3,tampon);
                }
                /* On ralenti */
                else 
                {
                    frein=0x15;
                    acceleration=0x00;
                    sprintf(tampon,"%c%c%c",acceleration,frein,direction); 
                    send_frame(s,0x321,3,tampon);
                }                    
                break;  
            case 0x321:
            /* on recupere la direction pour ne pas la modifier quand on change la vitesse */
                direction = frame.data[2];
                acceleration = frame.data[0];
                frein = frame.data[1];            
        }

        /* On regule la direction */
        int poids[2]={0,0};
        if(recupdatacapteur(s,poids) != 0)
        {
           perror("Socket");
		    return 1; 
        };

        int poidtotal = poids[0]+poids[1];        
        int diff = poids[0] - poids[1];
        double ratio = (double) diff / poidtotal;
        int steering = (int) ((ratio / 2) * 0x64);       
        sprintf(tampon,"%c%c%c",acceleration,frein,steering);
        send_frame(s,0x321,3,tampon); 
    }

	return 0;
}

 ```

 # TP 2b

 ## explain what is MISRA 

MISRA C est une norme de programmation en langage C. Elle spécifie les règles de programmation , l'objectif est d’éviter des erreurs d’exécution en homogenéisant la structure du code entre tout les developpeurs.

## Track des erreurs de conformités

```
Checking road_follower.c ...
road_follower.c:149:29: error: Buffer is accessed out of bounds: tampon [bufferAccessOutOfBounds]
                    sprintf(tampon,"%c%c%c",acceleration,frein,direction);
                            ^
road_follower.c:157:29: error: Buffer is accessed out of bounds: tampon [bufferAccessOutOfBounds]
                    sprintf(tampon,"%c%c%c",acceleration,frein,direction);
                            ^
road_follower.c:165:29: error: Buffer is accessed out of bounds: tampon [bufferAccessOutOfBounds]
                    sprintf(tampon,"%c%c%c",acceleration,frein,direction);
                            ^
road_follower.c:188:17: error: Buffer is accessed out of bounds: tampon [bufferAccessOutOfBounds]
        sprintf(tampon,"%c%c%c",acceleration,frein,steering);
                ^
road_follower.c:88:5: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-2.7]
int main(int argc, char **argv)
    ^
road_follower.c:67:16: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-4.1]
        printf("\033[H\033[J");
               ^
road_follower.c:72:16: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-4.1]
        printf("\x1b[%d;%dH", y, x);
               ^
road_follower.c:37:26: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-7.1]
                    case 00:
                         ^
road_follower.c:40:26: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-7.1]
                    case 01:
                         ^
road_follower.c:43:26: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-7.1]
                    case 02:
                         ^
road_follower.c:46:26: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-7.1]
                    case 03:
                         ^
road_follower.c:49:26: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-7.1]
                    case 04:
                         ^
road_follower.c:52:26: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-7.1]
                    case 05:
                         ^
road_follower.c:59:44: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-10.1]
                init_done = init_done + (1 << can_id);
                                           ^
road_follower.c:187:38: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-10.4]
        int steering = (int) ((ratio / 2) * 0x64);
                                     ^
road_follower.c:101:9: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-13.4]
 if ((s = socket(PF_CAN, SOCK_RAW, CAN_RAW)) < 0) {
        ^
road_follower.c:31:25: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-15.5]
                        return -1;
                        ^
road_follower.c:83:9: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-15.5]
        return 1;
        ^
road_follower.c:85:10: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-15.5]
    else return 0;
         ^
road_follower.c:103:3: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-15.5]
  return 1;
  ^
road_follower.c:119:3: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-15.5]
  return 1;
  ^
road_follower.c:135:13: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-15.5]
            return 1;
            ^
road_follower.c:181:7: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-15.5]
      return 1;
      ^
road_follower.c:174:9: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-16.3]
        }
        ^
road_follower.c:35:17: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-16.4]
                switch (can_id)
                ^
road_follower.c:139:9: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-16.4]
        switch(frame.can_id & 0xFFF /* Pour enlever les 0 inutile */){
        ^
road_follower.c:98:8: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
 printf("CAN Sockets Demo\r\n");
       ^
road_follower.c:107:8: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
 strcpy(ifr.ifr_name, "vcan0" );
       ^
road_follower.c:111:8: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
 memset(&addr, 0, sizeof(addr));
       ^
road_follower.c:149:28: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
                    sprintf(tampon,"%c%c%c",acceleration,frein,direction);
                           ^
road_follower.c:150:31: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
                    send_frame(s,0x321,3,tampon);
                              ^
road_follower.c:157:28: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
                    sprintf(tampon,"%c%c%c",acceleration,frein,direction);
                           ^
road_follower.c:158:31: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
                    send_frame(s,0x321,3,tampon);
                              ^
road_follower.c:165:28: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
                    sprintf(tampon,"%c%c%c",acceleration,frein,direction);
                           ^
road_follower.c:166:31: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
                    send_frame(s,0x321,3,tampon);
                              ^
road_follower.c:188:16: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
        sprintf(tampon,"%c%c%c",acceleration,frein,steering);
               ^
road_follower.c:189:19: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-17.7]
        send_frame(s,0x321,3,tampon);
                  ^
road_follower.c:1:0: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-21.6]
#include <stdio.h>
^

```

## Code conforme à misra

Pour corriger les erreurs les plus frequete j'ai du remplacer tout mes fprint par des memcpy et passer la valeur de retour d'une fonction dans une variable

```c
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <net/if.h>
#include <sys/ioctl.h>
#include <sys/socket.h>

#include <linux/can.h>
#include <linux/can/raw.h>

/* Attend les données des capteurs du vehicules et retourne deux valeur (droite gauche)*/
int recupdatacapteur(int s,int poids[]) {
        int ret=0;
        struct can_frame frame;
        // Création du filtre
        struct can_filter rfilter[1];

        // Définition du masque du filtre du CAN
        rfilter[0].can_id   = 0xC00;
        rfilter[0].can_mask = 0xFF8;

        setsockopt(s, SOL_CAN_RAW, CAN_RAW_FILTER, &rfilter, sizeof(rfilter));

        u_int8_t can_id;
        u_int8_t init_done = 0x00;        

        while (init_done != 0xff) {
                if (read(s, &frame, sizeof(struct can_frame)) < 0) {                       
                        ret=-1; 
                }
                // recupe le nombre apres le "C"
                can_id = frame.can_id & 0xff;
                switch (can_id)
                {
                    case 0x00: 
                        poids[0]+=frame.data[0]*50;
                        break;
                    case 0x01:
                        poids[0]+=frame.data[0]*10;
                        break;
                    case 0x02:
                        poids[0]+=frame.data[0];
                        break;
                    case 0x03:
                        poids[1]+=frame.data[0]*50;
                        break;
                    case 0x04:
                        poids[1]+=frame.data[0]*10;
                        break;
                    case 0x05:
                        poids[1]+=frame.data[0];
                        break;
                    default:
                        break;                    
                }
                   
                // on up les bit un par un , quand ils sont tous up les données sont toute reçu
                init_done = init_done + ((u_int8_t)1 << can_id);
        }
        return ret;
        
}

void send_frame(int s, int adresse , int nboctet , char* data)
{
   
    struct can_frame frame; // ma frame   
    frame.can_id = adresse;
	frame.can_dlc = nboctet;	
    memcpy(frame.data,data,sizeof(char)*frame.can_dlc) ; 
    if(write(s, &frame, sizeof(struct can_frame)) != sizeof(struct can_frame)) {
               
    }  
    
}

int main(void)
{
    int ret =0;
	int s; // mon socket
	struct sockaddr_can addr; // adresse du socket
	struct ifreq ifr; // identifiant de la frame
	struct can_frame frame; // ma frame
	int i =10; // Nb envoi de la trame
	int nbytes; // Nb bytes dans la tram pour la lecture

    void* cpystatus;
    void* memstatus;

    /* Ouverture de la socket */
    s = socket(PF_CAN, SOCK_RAW, CAN_RAW);
	if ( s < 0) {		
		ret=1;
	}

    /* definition de l'interface de destination */
	cpystatus = strcpy(ifr.ifr_name, "vcan0" );
    if(sizeof(cpystatus) <= (long unsigned int) 0)
    {
        ret = -1;
    }
	ioctl(s, SIOCGIFINDEX, &ifr);

    /* clean l'espace memoire  */
	memstatus = memset(&addr, 0, sizeof(addr));
    if(sizeof(memstatus) == (long unsigned int) 0)
    {
        ret = -1;
    }
	/* Parametrage de l'adresse */    
    addr.can_family = AF_CAN;
	addr.can_ifindex = ifr.ifr_ifindex;

    /* Bind du socket */
	if (bind(s, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
			ret=1;
	}  

    char afd[3]={0x64,0x00,0x00};    
    int vitesse = 0 ;
    /* Lecture des trames dans une boucle infini */
    while(1)
    {
        /* On attrape la tram */         	
        nbytes = read(s, &frame, sizeof(struct can_frame));
        if (nbytes < 0) {           
            ret=1;
        }        
        
        /* On regule la vitesse */
        switch(frame.can_id & 0xFFF /* Pour enlever les 0 inutile */){        
            /* Tram de vitesse en km/h */
            case 0xC07:
                vitesse = frame.data[0];

                /* On accelere */
                if (vitesse < 50)
                {
                    afd[1]=0x00;
                    afd[0]=0x64;
                    send_frame(s,0x321,3,afd);                    
                }   
                /* On ralenti */            
                else if(vitesse == 50)
                {
                    afd[0]=0x00;
                    afd[1]=0x00;                    
                    send_frame(s,0x321,3,afd);
                }
                /* On ralenti */
                else 
                {
                    afd[1]=0x15;
                    afd[0]=0x00;                   
                    send_frame(s,0x321,3,afd);                  
                }                    
                break;  
            case 0x321:
            /* on recupere la afd[2] pour ne pas la modifier quand on change la vitesse */
                afd[2] = frame.data[2];
                afd[0] = frame.data[0];
                afd[1] = frame.data[1];
                break;
            default:
                break;            
        }

        /* On regule la afd[2] */
        int poids[2]={0,0};
        if(recupdatacapteur(s,poids) != 0)
        {        
		    ret=1; 
        };
        
        int poidtotal = poids[0]+poids[1];        
        int diff = poids[0] - poids[1];
        double ratio = (double) diff / poidtotal;      
        afd[2] = (u_int8_t) ((ratio / (u_int8_t)2) * 0x64); 
        send_frame(s,0x321,3,afd); 
       
    }

	return ret;
}
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <net/if.h>
#include <sys/ioctl.h>
#include <sys/socket.h>

#include <linux/can.h>
#include <linux/can/raw.h>

/* Attend les données des capteurs du vehicules et retourne deux valeur (droite gauche)*/
int recupdatacapteur(int s,int poids[]) {
        int ret=0;
        struct can_frame frame;
        // Création du filtre
        struct can_filter rfilter[1];

        // Définition du masque du filtre du CAN
        rfilter[0].can_id   = 0xC00;
        rfilter[0].can_mask = 0xFF8;

        setsockopt(s, SOL_CAN_RAW, CAN_RAW_FILTER, &rfilter, sizeof(rfilter));

        u_int8_t can_id;
        u_int8_t init_done = 0x00;        

        while (init_done != 0xff) {
                if (read(s, &frame, sizeof(struct can_frame)) < 0) {                       
                        ret=-1; 
                }
                // recupe le nombre apres le "C"
                can_id = frame.can_id & 0xff;
                switch (can_id)
                {
                    case 0x00: 
                        poids[0]+=frame.data[0]*50;
                        break;
                    case 0x01:
                        poids[0]+=frame.data[0]*10;
                        break;
                    case 0x02:
                        poids[0]+=frame.data[0];
                        break;
                    case 0x03:
                        poids[1]+=frame.data[0]*50;
                        break;
                    case 0x04:
                        poids[1]+=frame.data[0]*10;
                        break;
                    case 0x05:
                        poids[1]+=frame.data[0];
                        break;
                    default:
                        break;                    
                }
                   
                // on up les bit un par un , quand ils sont tous up les données sont toute reçu
                init_done = init_done + ((u_int8_t)1 << can_id);
        }
        return ret;
        
}

void send_frame(int s, int adresse , int nboctet , char* data)
{
   
    struct can_frame frame; // ma frame   
    frame.can_id = adresse;
	frame.can_dlc = nboctet;	
    memcpy(frame.data,data,sizeof(char)*frame.can_dlc) ; 
    if(write(s, &frame, sizeof(struct can_frame)) != sizeof(struct can_frame)) {
               
    }  
    
}

int main(void)
{
    int ret =0;
	int s; // mon socket
	struct sockaddr_can addr; // adresse du socket
	struct ifreq ifr; // identifiant de la frame
	struct can_frame frame; // ma frame
	int i =10; // Nb envoi de la trame
	int nbytes; // Nb bytes dans la tram pour la lecture

    void* cpystatus;
    void* memstatus;

    /* Ouverture de la socket */
    s = socket(PF_CAN, SOCK_RAW, CAN_RAW);
	if ( s < 0) {		
		ret=1;
	}

    /* definition de l'interface de destination */
	cpystatus = strcpy(ifr.ifr_name, "vcan0" );
    if(sizeof(cpystatus) <= (long unsigned int) 0)
    {
        ret = -1;
    }
	ioctl(s, SIOCGIFINDEX, &ifr);

    /* clean l'espace memoire  */
	memstatus = memset(&addr, 0, sizeof(addr));
    if(sizeof(memstatus) == (long unsigned int) 0)
    {
        ret = -1;
    }
	/* Parametrage de l'adresse */    
    addr.can_family = AF_CAN;
	addr.can_ifindex = ifr.ifr_ifindex;

    /* Bind du socket */
	if (bind(s, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
			ret=1;
	}  

    char afd[3]={0x64,0x00,0x00};    
    int vitesse = 0 ;
    /* Lecture des trames dans une boucle infini */
    while(1)
    {
        /* On attrape la tram */         	
        nbytes = read(s, &frame, sizeof(struct can_frame));
        if (nbytes < 0) {           
            ret=1;
        }        
        
        /* On regule la vitesse */
        switch(frame.can_id & 0xFFF /* Pour enlever les 0 inutile */){        
            /* Tram de vitesse en km/h */
            case 0xC07:
                vitesse = frame.data[0];

                /* On accelere */
                if (vitesse < 50)
                {
                    afd[1]=0x00;
                    afd[0]=0x64;
                    send_frame(s,0x321,3,afd);                    
                }   
                /* On ralenti */            
                else if(vitesse == 50)
                {
                    afd[0]=0x00;
                    afd[1]=0x00;                    
                    send_frame(s,0x321,3,afd);
                }
                /* On ralenti */
                else 
                {
                    afd[1]=0x15;
                    afd[0]=0x00;                   
                    send_frame(s,0x321,3,afd);                  
                }                    
                break;  
            case 0x321:
            /* on recupere la afd[2] pour ne pas la modifier quand on change la vitesse */
                afd[2] = frame.data[2];
                afd[0] = frame.data[0];
                afd[1] = frame.data[1];
                break;
            default:
                break;            
        }

        /* On regule la afd[2] */
        int poids[2]={0,0};
        if(recupdatacapteur(s,poids) != 0)
        {        
		    ret=1; 
        };
        
        int poidtotal = poids[0]+poids[1];        
        int diff = poids[0] - poids[1];
        double ratio = (double) diff / poidtotal;      
        afd[2] = (u_int8_t) ((ratio / (u_int8_t)2) * 0x64); 
        send_frame(s,0x321,3,afd); 
       
    }

	return ret;
}


```