close all
clear all
clc

hold on;
grid on

n=100;
t=linspace(0,1,n)';

P1=[0 0];
P2=[0.05 0.5];
P3=[0.05 1.5];
P4=[0 2];

alpha = 3;
P2=italic(P2,alpha);
P3=italic(P3,alpha);
P4=italic(P4,alpha);

[xc yc]=xy(P1,P2,P3,P4);
plot(xc,yc,'or');
M = PlotBezier(P1,P2,P3,P4,t);
plot(M(:,1),M(:,2),'LineWidth',3);

P5=[0.06 0];
P6=[0.1 0.25];
P7=[0.1 0.75];
P8=[0.1 1];

P6=italic(P6,alpha);
P7=italic(P7,alpha);
P8=italic(P8,alpha);

[xc yc]=xy(P5,P6,P7,P8);
plot(xc,yc,'og');
M = PlotBezier(P5,P6,P7,P8,t);
plot(M(:,1),M(:,2),'LineWidth',3);
plot([0 ,xc(1)],[0, yc(1)],'LineWidth',3);

P9=[.6 1];
P10=[.6 2];

P9=italic(P9,alpha);
P10=italic(P10,alpha);

[xc yc]=xy(P8,P9,P10,P4);
plot(xc,yc,'o');
M = PlotBezier(P8,P9,P10,P4,t);
plot(M(:,1),M(:,2),'LineWidth',3);


P11=[0.1 1.2];
P12=[0.5 1.2];
P13=[0.5 1.8];
P14=[0.08 1.8];

P11=italic(P11,alpha);
P12=italic(P12,alpha);
P13=italic(P13,alpha);
P14=italic(P14,alpha);

[xc yc]=xy(P11,P12,P13,P14);
plot(xc,yc,'oc');
M = PlotBezier(P11,P12,P13,P14,t);
plot(M(:,1),M(:,2),'LineWidth',3);

plot([xc(1) ,xc(4)],[yc(1), yc(4)],'LineWidth',3);


window(P1,P4,P10,P9)
axis square
