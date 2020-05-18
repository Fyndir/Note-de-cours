#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <net/if.h>
#include <sys/ioctl.h>
#include <sys/socket.h>

#include <linux/can.h>
#include <linux/can/raw.h>


void send_frame(int s, int adresse , int nboctet , char* data){   
    struct can_frame frame; // ma frame   
    frame.can_id = adresse;
	frame.can_dlc = nboctet;	
    memcpy(frame.data,data,sizeof(char)*frame.can_dlc) ; 
    if(write(s, &frame, sizeof(struct can_frame)) != sizeof(struct can_frame)) {
        perror("Socket");
		exit(EXIT_FAILURE);      
    }      
}
/*  permet de clear le terminal*/
void clear_term() {
        printf("\033[H\033[J");
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
	strcpy(ifr.ifr_name, "vcan1" );
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
        clear_term();      

        sprintf(frame.data, "\x03\xd1\x0d\xaa\xaa\xaa\xaa\xaa");
        send_frame(s,0x7DF,8, frame.data);
        /* On attrape la tram */         	
        nbytes = read(s, &frame, sizeof(struct can_frame));
        if (nbytes < 0) {
            perror("Erreur de lecture");
            return 1;
        }
        // interprete frame speed  
        int speed = frame.data[3];
        printf("speed: %d km/h\n", speed);        
        printf("\r\n");


        sprintf(frame.data, "\x03\xd1\x11\xaa\xaa\xaa\xaa\xaa");
        send_frame(s,0x7DF,8, frame.data);
        /* On attrape la tram */         	
        nbytes = read(s, &frame, sizeof(struct can_frame));
        if (nbytes < 0) {
            perror("Erreur de lecture");
            return 1;
        }
        // interprete frame throttle  
        int Throttle = (int)(((int)frame.data[3])/2.55);
        printf("Throttle: %d \n", Throttle);        
        printf("\r\n");



        sprintf(frame.data, "\x04\xd1\x0c\xaa\xaa\xaa\xaa\xaa");
        send_frame(s,0x7DF,8, frame.data);
        /* On attrape la tram */         	
        nbytes = read(s, &frame, sizeof(struct can_frame));
        if (nbytes < 0) {
            perror("Erreur de lecture");
            return 1;
        }        
        // interprete frame rpm  
        char a = frame.data[3];
        char b= frame.data[4];
        double rpm = (double)(((256*a)+b)/4.0);
        printf("Motor speed: %d rpm\n", a,b,rpm);        
        printf("\r\n");
    }

	return 0;
}
