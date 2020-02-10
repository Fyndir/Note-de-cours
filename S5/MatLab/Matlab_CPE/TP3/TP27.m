% Script TP1 Equation linéaire exo7

clc
clear all
close all

A = magic(10);
A(10,10)=59.001;
cond(A)

b = 1:10 ;
b(10)=10;

%Résolution Ax=b (erreur normale)
A\b


