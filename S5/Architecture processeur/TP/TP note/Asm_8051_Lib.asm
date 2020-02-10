;******************************************************************************
;ASM8051_Lib.asm
;
; AUTH: FJ
; DATE: 03-03-2009
; DATE MODIF: 2/12/2016
; Target: C8051F02x
;
; Tool chain: KEIL PK51
;
;   Ce fichier contient des routines Assembleur utiles au TP Microcontrôleur
;   Aucune modification n'est nécessaire.
;   Il suffit d'ajouter ce fichier à votre Projet
;   TARGET MCU  :  C8051F020 

;******************************************************************************

$INCLUDE(C8051F020.INC)  ; Register definition file.
;******************************************************************************
;Declaration des variables et fonctions publiques
;******************************************************************************

PUBLIC _fct_tempo
PUBLIC Sin_table

;******************************************************************************
;Consignes de segmentation
;******************************************************************************

Timer_UartLib     segment  CODE

               rseg     Timer_UartLib  ; Switch to this code segment.
               using    0              ; Specify register bank for the following
                                       ; program code.

;******************************************************************************
;******************************************************************************
; _fct_tempo
;
; Description: Sous-programme produisant une temporisation logicielle
;              paramétrable par la variable csg_tempo.
;              La temporisation générée est égale à csg_tempo micro-secondes.
;              ATTENTION: csg_tempo ne doit pas être inférieure à 2
;
; Paramètres d'entrée:  csg_tempo dans R6(MSB) et R7(LSB)
; Paramètres de sortie: aucun
; Registres modifiés: R6 et R7
; Pile: 2 octets (sauf pour l'appel de la sous -routine)
; Pour un appel par une fonction en C: passage d'un seul paramètre déclaré en entier
;******************************************************************************

_fct_tempo:
         PUSH  ACC
         MOV   A,R5
         PUSH  ACC
         MOV   A,R7
         DEC   R7
         JNZ   ?C0006
         DEC   R6
?C0006:
?C0001:
         MOV   A,R7
         ORL   A,R6
         JZ    ?C0005

         MOV   A,R7
         DEC   R7
         JNZ   ?C0007
         DEC   R6
?C0007:
         MOV   R5,#01H
?C0003:
         MOV   A,R5
         JZ    ?C0001
         DEC   R5
         SJMP  ?C0003
?C0005:
         POP   ACC
         MOV   R5,ACC
         POP   ACC
         RET
;******************************************************************************
;******************************************************************************
;Initialisations de la mémoire code - Stockage de constante
;******************************************************************************

;Table de sinus
; sin(0) = 127, sin(90°) = 255, sin(270°)= 0
Sin_table:    DB 129,132,135,138,142,145,148,151,154,157,160,163,166,169,172,175
              DB 178,181,184,186,189,192,195,197,200,202,205,207,210,212,215,217
              DB 219,221,223,225,227,229,231,233,235,236,238,240,241,243,244,245
              DB 246,247,249,250,250,251,252,253,253,254,254,255,255,255,255,255
              DB 255,255,255,255,255,254,254,253,253,252,251,250,250,249,247,246
              DB 245,244,243,241,240,238,236,235,233,231,229,227,225,223,221,219
              DB 217,215,212,210,207,205,202,200,197,195,192,189,186,184,181,178
              DB 175,172,169,166,163,160,157,154,151,148,145,142,138,135,132,129
              DB 126,123,120,117,113,110,107,104,101,098,095,092,089,086,083,080
              DB 077,074,071,069,066,063,060,058,055,053,050,048,045,043,040,038
              DB 036,034,032,030,028,026,024,022,020,019,017,015,014,012,011,010
              DB 009,008,006,005,005,004,003,002,002,001,001,000,000,000,000,000
              DB 000,000,000,000,000,001,001,002,002,003,004,005,005,006,008,009
              DB 010,011,012,014,015,017,019,020,022,024,026,028,030,032,034,036
              DB 038,040,043,045,048,050,053,055,058,060,063,066,069,071,074,077
              DB 080,083,086,089,092,095,098,101,104,107,110,113,117,120,123,126

end