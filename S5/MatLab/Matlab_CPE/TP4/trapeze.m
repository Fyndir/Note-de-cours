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

%formules composites
It = h*((y(1)+y(end))/2 + sum(y(2:end-1)))

%valeur exacte
Iex = quad(@fint,a,b)