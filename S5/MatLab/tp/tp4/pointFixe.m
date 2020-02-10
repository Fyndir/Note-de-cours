%% Q16
clc
clear all
close all

f = [1 0 -4 1];

hold on
x = -3:0.1:3;
y = x.^3*f(1) + x*f(3) + f(4);

plot(x,y);
plot(x,0,'g');

%% Q17
clc
clear all
close all

f = [1 0 -4 1];

sort(roots(f))

%% Q19
clc
clear all
close all

f = [1 0 -4 1];
phi = [1/4 0 0 1/4];

hold on
x = -3:0.1:3;
yF = x.^3*f(1) + x*f(3) + f(4);
yPhi = x.^3*phi(1) + phi(4);

plot(x,yF);
plot(x,yPhi,'g');
plot(x,0,'r');

%% Q20
clc
clear all
close all

f = [1 0 -4 1];
phi = [1/4 0 0 1/4];
R = sort(roots(f))

hold on
x = -3:0.1:3;
yF = x.^3*f(1) + x*f(3) + f(4);
yPhi = x.^3*phi(1) + phi(4);
grid on

plot(x,yF);
plot(x,yPhi,'g');
plot(R(1),R(1).^3*f(1) + R(1)*f(3) + f(4),'+r');
plot(R(2),R(2).^3*f(1) + R(2)*f(3) + f(4),'+r');
plot(R(3),R(3).^3*f(1) + R(3)*f(3) + f(4),'+r');
plot(x,x,'m');

%% Q21
clc
clear all
close all

phi = [1/4 0 0 1/4];

act = 0;
prec = -1000;
eps = 10^(-15);
i=0;

while i<100 && ((act - prec)/prec).^2 > eps.^2
    i = i+1;
    prec = act;
    act = phi(1)*act.^3 + phi(4);
end;

disp(i);
disp(prec);
    
