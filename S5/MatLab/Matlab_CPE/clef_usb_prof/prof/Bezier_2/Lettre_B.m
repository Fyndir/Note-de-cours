close all
clear all
clc

hold on;
grid on

n=100;
t=linspace(0,1,n)';

P1=[0 0];
P2=[0.8 0.1];
P3=[0.8 0.9];
P4=[0.4 1];
[xc yc]=xy(P1,P2,P3,P4);
plot(xc,yc,'or');
M = PlotBezier(P1,P2,P3,P4,t);
plot(M(:,1),M(:,2),'LineWidth',3);

P1=[0.1 0.2];
P2=[0.7 0.4];
P3=[0.7 0.8];
P4=[0.3 0.9];
[xc yc]=xy(P1,P2,P3,P4);
plot(xc,yc,'or');
M = PlotBezier(P1,P2,P3,P4,t);
plot(M(:,1),M(:,2),'LineWidth',3);

P1=[0.4 1];
P2=[0.8 1.1];
P3=[0.8 1.9];
P4=[0 2];
[xc yc]=xy(P1,P2,P3,P4);
plot(xc,yc,'or');
M = PlotBezier(P1,P2,P3,P4,t);
plot(M(:,1),M(:,2),'LineWidth',3);

P1=[0.3 1.1];
P2=[0.7 1.2];
P3=[0.7 1.6];
P4=[0.1 1.82];
[xc yc]=xy(P1,P2,P3,P4);
plot(xc,yc,'or');
M = PlotBezier(P1,P2,P3,P4,t);
plot(M(:,1),M(:,2),'LineWidth',3);

dx=0.1;
dy=0.1;
axis([-0.1*dx 1+0.1*dx -0.1*dy 2+0.1*dy]);
axis square

