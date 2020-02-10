close all
clear all
clc

hold on;
grid on

n=100;
t=linspace(0,1,n)';

c=1.3;

P1=[2 1*c];
P2=[2 0.2*c];
P3=[2 0];
P4=[1 0];
[xc yc]=xy(P1,P2,P3,P4);
plot(xc,yc,'or');
M = PlotBezier(P1,P2,P3,P4,t);
plot(M(:,1),M(:,2),'LineWidth',3);

plot([2 1],[1 1]*c,'ro')
plot([2 1],[1 1]*c,'LineWidth',3)

P1=[1 0];
P2=[0.4 0];
P3=[0 0.4*c];
P4=[0 1*c];
[xc yc]=xy(P1,P2,P3,P4);
plot(xc,yc,'or');
M = PlotBezier(P1,P2,P3,P4,t);
plot(M(:,1),M(:,2),'LineWidth',3);

P1=[0 1*c];
P2=[0 1.6*c];
P3=[0.4 2*c];
P4=[1 2*c];
[xc yc]=xy(P1,P2,P3,P4);
plot(xc,yc,'or');
M = PlotBezier(P1,P2,P3,P4,t);
plot(M(:,1),M(:,2),'LineWidth',3);

P1=[1 2*c];
P2=[1.6 2*c];
P3=[2 1.9*c];
P4=[2 1.7*c];
[xc yc]=xy(P1,P2,P3,P4);
plot(xc,yc,'or');
M = PlotBezier(P1,P2,P3,P4,t);
plot(M(:,1),M(:,2),'LineWidth',3);

dx=0.1;
dy=0.1;
axis([-0.1*dx 3+0.1*dx -0.1*dy 3+0.1*dy]);
axis square

