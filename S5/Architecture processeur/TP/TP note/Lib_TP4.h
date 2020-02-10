#ifndef LIB_TP4
#define LIB_TP4


void Init_Device (void); // Fonction codée dans LIB_Base.c
void fct_tempo(unsigned int);     // Fonction assembleur codée dans Asm_8051_Lib.asm

void CONFIGTIMER1(void);    // Fonction de configuration du timer1
void CONFIGSERIE0(void);    // Fonction de configuration de l'UART0
char putchar (char c);
void CONFIGTIMER3(void);   
void CONFIGADC0(void); 
void CONFIGINTADC0(void); 
void CONVERSION(void); 
char getchar(void);


#endif