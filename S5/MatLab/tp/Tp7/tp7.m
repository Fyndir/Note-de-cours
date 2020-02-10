clc;
clear all; 
close all; 
format long; 
hold on;
grid on;



a=0;
b=5;
nt=500; %n est le nombre de points a tracer
hr=(b-a)/nt; %h est le pas

x=a:hr:b; % suite de nb de 0 à 5 avec un pas de h
y=f(x);


for i=1:length(x)
    dx=x(i);
    dy=y(i);
    
    plot(dx,dy,'r.');
    drawnow % refresh 
    
end   

%%
clc;
clear all; 
close all; 
format long; 
hold on;
grid on;


a=0;
b=6.3;
nt=500; %n est le nombre de points a tracer
hr=(b-a)/nt; %h est le pas

x=sin(3*(a:hr:b)); % suite de nb de 0 à 5 avec un pas de h
y=sin(4*(a:hr:b));


for i=1:length(x)
    dx=x(i);
    dy=y(i);
    
    plot(dx,dy,'r.');
    drawnow % refresh 
    
end   


%%

clc;
clear all; 
close all; 
format long; 
hold on;
grid on;

a=-5;
b=5;
nt=500; %n est le nombre de points a tracer
hr=(b-a)/nt; %h est le pas

x=cos((a:hr:b)).^3; % suite de nb de 0 à 5 avec un pas de h
y=sin((a:hr:b)).^3;

for i=1:length(x)
    dx=x(i);
    dy=y(i);
    
    plot(dx,dy,'r.');
    drawnow % refresh 
    
end   

%%

clc;
clear all; 
close all; 
format long; 
hold on;
grid on;

a=0;
b=2*pi;
nt=500; %n est le nombre de points a tracer
hr=(b-a)/nt; %h est le pas

x=cos(a:hr:b); % suite de nb de 0 à 5 avec un pas de h
y=((a:hr:b)./2)+sin((a:hr:b));

for i=1:length(x)
    dx=x(i);
    dy=y(i);
    
    plot(dx,dy,'r.');
    drawnow % refresh 
    
end  

%%

clc;
clear all; 
close all; 
format long; 
hold on;
grid on;

a=0;
b=12;
nt=500; %n est le nombre de points a tracer
hr=(b-a)/nt; %h est le pas

x=cos(a:hr:b); % suite de nb de 0 à 5 avec un pas de h
y=(sin(a:hr:b).^2)./(2+sin(a:hr:b));


for i=1:length(x)
    dx=x(i);
    dy=y(i);
    
    plot(dx,dy,'r.');
    drawnow % refresh 
    
end 

%% P

clc
clear all;
close all;

hold on;

t = 0:0.005:1;

P1=[0 0];
P2=[0.05 0.5];
P3=[0.05 1.5];
P4=[0 2];
P5=[0.06 0];
P6=[0.1 0.25];
P7=[0.1 0.75];
P8=[0.1 1];
P9=[0.6 1];
P10=[0.6 2];
P11=[0.1 1.2];
P12=[0.5 1.2];
P13=[0.5 1.8];
P14=[0.08 1.8];

plot(P1(1),P1(2),'or')
plot(P2(1),P2(2),'or')
plot(P3(1),P3(2),'or')
plot(P4(1),P4(2),'or')
plot(P5(1),P5(2),'or')
plot(P6(1),P6(2),'or')
plot(P7(1),P7(2),'or')
plot(P8(1),P8(2),'or')
plot(P9(1),P9(2),'or')
plot(P10(1),P10(2),'or')
plot(P11(1),P11(2),'or')
plot(P12(1),P12(2),'or')
plot(P13(1),P13(2),'or')
plot(P14(1),P14(2),'or')

M1 = bezier4(P1,P2,P3,P4,t');
M2 = bezier4(P5,P6,P7,P8,t');
M3 = bezier4(P8,P9,P10,P4,t');
M4 = bezier4(P11,P12,P13,P14,t');
M5 = bezier4(P1,P5,P1,P5,t');
M6 = bezier4(P11,P14,P11,P14,t');
for i=1 : length(t)
    
    plot(M1(i,1),M1(i,2),'g.')
    plot(M2(i,1),M2(i,2),'g.')
    plot(M3(i,1),M3(i,2),'g.')
    plot(M4(i,1),M4(i,2),'g.')
    plot(M5(i,1),M5(i,2),'g.')
    plot(M6(i,1),M6(i,2),'g.')
    drawnow;
    
end;







