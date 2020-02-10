% Script TP1 Equation linéaire exo6

clc
clear all
close all

A = [2 -2 ; 1 1 ; 6 -1];
B = [2; 5; -5];
A\B

x1 = -2:6;
x2 = -2+2*(x1) ;
plot(x1,x2,'g')
title('x2=f(x1)');
hold on

x2 = 5-(x1) ;
plot(x1,x2)

x2 = 5 + 6*(x1);
plot(x1,x2,'r')