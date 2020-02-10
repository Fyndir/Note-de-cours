close all
clear all
clc
hold on;
grid on

n=100;

t=0:0.001:1

P1=[0 0];
P2=[1 0];
P3=[1 1];
P4=[0 1];

plot(P1(1),P1(2),'o');
plot(P2(1),P2(2),'o');
plot(P3(1),P3(2),'o');
plot(P4(1),P3(2),'o');


M = bezier4(P1,P2,P3,P4,t');

plot(M(:,1),M(:,2));

