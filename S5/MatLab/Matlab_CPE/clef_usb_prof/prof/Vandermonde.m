clear all
close all
clc
hold on

% tracer du sinus
nt=500;
x0=0:2*pi/nt:2*pi;
y0=sin(x0);
plot(x0,y0)

% points de collocation
nc=10;
xc=(0:2*pi/nc:2*pi)';
yc=sin(xc);

% matrice de Vandermonde
A=ones(nc+1,1);
format long
for i=1:nc
    A=[A (xc.^i)];
end

% resolution du systeme
a=A\yc;

% coefficients du polynome
a=fliplr(a') ;

% tracer des points
y=polyval(a,xc);
plot(xc,y,'ro')

% tracer de la courbe d'interpolation
y=polyval(a,x0);
plot(x0,y,'r')
