%TP3 equations non lineaires

clc
clear all
close all

%POINT FIXE
A = [1, 0, -4, 1] ;
B = [-3:2/99:3];
C = polyval(A,B) ;
plot(B,C,'r')
hold on

%Calcul racines + tri
beta = roots(A);
sort(beta)

D = [1/4, 0, 0, 1/4] ;
E = polyval(D,B) ;
plot(B,E)
hold on

plot([-3,3],[-3,3],'g')
hold on
grid on