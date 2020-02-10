close all
clear all

poly=[1 0 -4  1]
x=-3:1/100:3;
y=polyval(poly,x); 
racines = roots(poly);
plot(x,y)
grid on;
