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
                init_done = init_done + ((int)1 << can_id);
        }
        return 0;
        
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

int main(void)
{
	int s; // mon socket
	struct sockaddr_can addr; // adresse du socket
	struct ifreq ifr; // identifiant de la frame
	struct can_frame frame; // ma frame
	int i =10; // Nb envoi de la trame

	int nbytes; // Nb bytes dans la tram pour la lecture

    /* Ouverture de la socket */
    s = socket(PF_CAN, SOCK_RAW, CAN_RAW);
	if ( s < 0) {
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
    char tampon[4];
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
                break;
            default:
                break;            
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
        int steering = (int) ((ratio / (int)2) * 0x64);       
        sprintf(tampon,"%c%c%c",acceleration,frein,steering);
        send_frame(s,0x321,3,tampon); 
    }

	return 0;
}
