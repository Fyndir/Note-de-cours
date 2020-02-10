%TP4 INT NUM QUAD

clc
clear all
close all

%implémentation
a = 0 ;
b = 1 ;
n = 32 ;
h = 1/n ;
x = a:h:b ;
y = fint(x) ;

%formules simpson
Is = (h/3)*(y(1)+y(end)+4*sum(y(2:2:end-1))+2*sum(y(3:2:end-2)))

Iex = quad(@fint,a,b)