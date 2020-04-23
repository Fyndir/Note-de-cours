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