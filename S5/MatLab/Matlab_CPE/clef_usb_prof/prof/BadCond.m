clear all
clc
e=1e-10;
A=[e 1; 1 1]
b=[1 2]'
cond(A)
x=A\b