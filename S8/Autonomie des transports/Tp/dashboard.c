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

    // /* Clear le terminal pour avoir un jolie affichage */ 
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
                printf("Motor speed: %d rpm\n", ((u_int16_t*) frame.data)[0]);
                break; 
            /* Tram de vitesse en km/h */
            case 0xC07:
                set_cursor_pos(1, 1); 
                printf("Speed : %d km/h \n",frame.data[0]);
                set_cursor_pos(1, 2); 
                printf("Gear : %d",frame.data[1]);
                break;
            /* tram de direction */ 
            case 0x321:
                set_cursor_pos(1, 4);   
                if (frame.data[2] > 0)
                    printf("Direction follow :<- \n");
                else if (frame.data[2] < 0)
                    printf("Direction follow :-> \n");
                if (frame.data[2] == 0)
                    printf("Direction follow : ^ \n");                
                break; 
        }
        printf("\r\n");
    }

	return 0;
}
