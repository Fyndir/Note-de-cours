clc
clear all
close all 
A=[63/8 0 70/8 0 15/8 0];
x=linspace(-1 , 1 , 500);
y= polyval (A,x);
plot(x,y);