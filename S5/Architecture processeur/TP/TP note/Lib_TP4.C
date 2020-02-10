//-----------------------------------------------------------------------------
// Lib_TP4.c
//-----------------------------------------------------------------------------
// AUTH: FJ
// DATE: 03-03-2009
// DATE MODIF: 2/12/2016
// Target: C8051F02x
//
// Tool chain: KEIL PK51
//-----------------------------------------------------------------------------
// Includes
//-----------------------------------------------------------------------------

#include <c8051f020.h>                 // SFR declarations
#include <c8051f020_sfr16.h>           // SFR16 declarations
#include <stdio.h>
#include <Lib_TP4.h>

//-----------------------------------------------------------------------------
// MACRO DEFINE
//-----------------------------------------------------------------------------

#define BAUDRATE     9600          // Baud rate of UART in bps
#define SYSCLK       22118400          // SYSCLK frequency in Hz
#define SAMPLE_RATE  100            // Sample frequency in Hz
#define INT_DEC      256               // integrate and decimate ratio

//-----------------------------------------------------------------------------
// Initialization Subroutines
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// 
//-----------------------------------------------------------------------------
//
void CONFIGTIMER1(void) 
{
	// CODE A AJOUTER
}	
//-----------------------------------------------------------------------------
// 
//-----------------------------------------------------------------------------
//
// Configure the UART0 using Timer1, for <baudrate> and 8-N-1.
//
void CONFIGSERIE0 (void)
{
 // CODE A AJOUTER
}

//-----------------------------------------------------------------------------
// ADC0_Init
//-----------------------------------------------------------------------------
//
// Configure ADC0 to use Timer3 overflows as conversion source, to
// generate an interrupt on conversion complete, and to use left-justified
// output mode.  Enables ADC end of conversion interrupt. ADC started
//
void CONFIGADC0 (void)
{
  
	 ADC0CF = (SYSCLK/1000000)<< 3;        // ADC conversion clock = 1MHz
	 ADC0CF |= 0x01;                     // PGA gain = 2
	 // CODE A AJOUTER
}
//-----------------------------------------------------------------------------
// 
//-----------------------------------------------------------------------------
//
void CONFIGINTADC0 (void)
{
	  // CODE A AJOUTER
}	

//-----------------------------------------------------------------------------
// Timer3_Init
//-----------------------------------------------------------------------------
//
// Configure Timer3 to auto-reload at interval specified by <counts> (no 
// interrupt generated) using SYSCLK as its time base.
//
void CONFIGTIMER3(void)
{
  // CODE A AJOUTER
}
//-----------------------------------------------------------------------------
// 
//-----------------------------------------------------------------------------
char  putchar(char c)
{
// CODE A AJOUTER
  return c;
}


