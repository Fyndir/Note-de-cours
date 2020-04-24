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
