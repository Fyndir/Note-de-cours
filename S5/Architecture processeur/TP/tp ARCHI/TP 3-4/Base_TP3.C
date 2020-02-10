//------------------------------------------------------------------------------------
// Base_TP3_IRC
//------------------------------------------------------------------------------------
//
// AUTH: FJ
// DATE: 03-03-2009
// Target: C8051F02x
// GAMAIN ANTOINE , PHILIPPE LUCAS , CAILLE LOIC
// Tool chain: KEIL Eval 'c'
//
//------------------------------------------------------------------------------------
// Includes
//------------------------------------------------------------------------------------
#include <c8051f020.h>                    // SFR declarations
//------------------------------------------------------------------------------------
// 16-bit SFR Definitions for 'F02x
//------------------------------------------------------------------------------------
sfr16 TMR3RL   = 0x92;                    // Timer3 reload value
sfr16 TMR3     = 0x94;                    // Timer3 counter
sfr16 ADC0     = 0xbe;                    // ADC0 data
sfr16 ADC0GT   = 0xc4;                    // ADC0 greater than window
sfr16 ADC0LT   = 0xc6;                    // ADC0 less than window
sfr16 RCAP2    = 0xca;                    // Timer2 capture/reload
sfr16 T2       = 0xcc;                    // Timer2
sfr16 RCAP4    = 0xe4;                    // Timer4 capture/reload
sfr16 T4       = 0xf4;                    // Timer4
sfr16 DAC0     = 0xd2;                    // DAC0 data
sfr16 DAC1     = 0xd5;                    // DAC1 data


//------------------------------------------------------------------------------------
// Global CONSTANTS
//------------------------------------------------------------------------------------

#define SYSCLK 22118400 //approximate SYSCLK frequency in Hz
#define LED_On 1
#define LED_Off 0

extern  code char Sin_table[];

// Eléments présents sur la carte 8051F020
sbit  LED = P1^6;         // LED verte: '1' = ON; '0' = OFF
sbit BP = P3^7;           // Bouton Poussoir '1' relaché, '0' pressé

// Eléments de l'application Pilotage d'un système de tri
sbit Tst4 = P3^4;
sbit Tst5 = P3^5;
sbit Tst6 = P3^6;

//------------------------------------------------------------------------------------
// Function PROTOTYPES
//------------------------------------------------------------------------------------
void Init_Device (void); // Fonction codée dans LIB_Base.c
void fct_tempo(unsigned int);     // Fonction assembleur codée dans Asm_8051_Lib.asm
void Oscillator_Init(); // Fonction codée dans LIB_Base.c



unsigned long overflow_count = 0;
unsigned long Nb_Boucle = 4;

void ISR_TIMER2(void) interrupt 5
{
	
TF2 = 0;            /* Clear the interrupt request */
overflow_count++;   /* Increment the overflow count */
	
	if ( overflow_count>= Nb_Boucle)
	{
		LED = ~LED;
		Tst4 = ~Tst4;
		overflow_count=0;
	}
	
}


void INT7(void) interrupt 19
{
	P3IF &= ~0x80;
	if( Nb_Boucle == 4)
	{
		Nb_Boucle = 24;
	}
	else
	{
		Nb_Boucle = 4;			
	}
	
	
}

//------------------------------------------------------------------------------------
// MAIN Routine
//------------------------------------------------------------------------------------
void main (void) {
	

	Init_Device();
	Tst4 = 0;
	LED = LED_Off;
	RCAP2 = 0xFFFF-184320; // valeur du timer environ 100ms

	while (1)
	{ 
		while (~BP)		
		{
			LED = 0;
		}	
	}	 
}



