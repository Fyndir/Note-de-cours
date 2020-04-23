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
