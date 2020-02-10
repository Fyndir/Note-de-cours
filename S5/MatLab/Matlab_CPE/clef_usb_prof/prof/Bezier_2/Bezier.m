close all
clear all
clc
hold on;
grid on

n=100;
t=linspace(0,1,n)';

P1=[0 0];
P2=[1 0];
P3=[1 1];
P4=[0 1];

[xc yc]=xy(P1,P2,P3,P4);
plot(xc,yc,'or');
window(P1, P2, P3, P4)

M = PlotBezier(P1,P2,P3,P4,t);
plot(M(:,1),M(:,2));

bt=1;
while (bt~=3)
    [P1,P2,P3,P4,bt]=MovePoint(P1,P2,P3,P4);
    clf
    hold on
    grid on
    [xc yc]=xy(P1,P2,P3,P4);
    plot(xc,yc,'or')
    window(P1, P2, P3, P4)
    M = PlotBezier(P1,P2,P3,P4,t);
    plot(M(:,1),M(:,2));
end
