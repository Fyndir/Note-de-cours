% Script TP1 Equation lin�aire exo1
clc
clear all
close all

A = [1 -2;2 -4];
B = [2;0];
A\B
%infinit� de solutions

det(A)

x1 = -10:10;
x2 = -1+(x1)/2;
plot(x1,x2)
title('x2=f(x1)');
hold on

x2 = x1/2;
plot(x1,x2)

