clear all
clc
close all



% tracer des mesures
x0=0:5:45;
y0=[55 60 58 54 55 60 54 57 52 49];
plot(x0,y0,'r+');
hold on

% points de collocation
xc=0:5:45';
yc=[55 60 58 54 55 60 54 57 52 49];
yc=yc';

plot(xc,yc,'go');

% Interpolation
yc=[55 60 58 54 55 60 54 57 52 49];
x=0:.1:45;
y=interp1(xc,yc,x,'spline');
plot(x,y,'g')
y=interp1(xc,yc,x,'pchip');
plot(x,y,'r')
hold on
