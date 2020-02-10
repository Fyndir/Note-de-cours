%% Q2
clc
clear all
close all

L = [63/8 0 -70/8 0 15/8 0];

x = -1:1/250:1;
y = (x.^5)*L(1)+(x.^3)*L(3)+x*L(5);
grid on
plot(x,y)

%% Q4
clc
clear all
close all

L = [63/8 0 -70/8 0 15/8 0];
beta = roots(L)

%% Q5
clc
clear all
close all

L = [63/8 0 -70/8 0 15/8 0];
beta = sort(roots(L))

%% Q6
clc
clear all
close all

L = [63/8 0 -70/8 0 15/8 0];
beta = sort(roots(L))

hold on
x = -1:1/250:1;
y = (x.^5)*L(1)+(x.^3)*L(3)+x*L(5);
plot(x,y)
plot(beta(1),(beta(1).^5)*L(1)+(beta(1).^3)*L(3)+beta(1)*L(5),'+r');
plot(beta(2),(beta(2).^5)*L(1)+(beta(2).^3)*L(3)+beta(2)*L(5),'+r');
plot(beta(3),(beta(3).^5)*L(1)+(beta(3).^3)*L(3)+beta(3)*L(5),'+r');
plot(beta(4),(beta(4).^5)*L(1)+(beta(4).^3)*L(3)+beta(4)*L(5),'+r');
plot(beta(5),(beta(5).^5)*L(1)+(beta(5).^3)*L(3)+beta(5)*L(5),'+r');

%% Q7
clc
clear all
close all

L = [63/8 0 -70/8 0 15/8 0];
beta = sort(roots(L))

hold on
x = -1:1/250:1;
y = (x.^5)*L(1)+(x.^3)*L(3)+x*L(5);
plot(x,y)
plot(beta(1),(beta(1).^5)*L(1)+(beta(1).^3)*L(3)+beta(1)*L(5),'+r');
plot(beta(2),(beta(2).^5)*L(1)+(beta(2).^3)*L(3)+beta(2)*L(5),'+r');
plot(beta(3),(beta(3).^5)*L(1)+(beta(3).^3)*L(3)+beta(3)*L(5),'+r');
plot(beta(4),(beta(4).^5)*L(1)+(beta(4).^3)*L(3)+beta(4)*L(5),'+r');
plot(beta(5),(beta(5).^5)*L(1)+(beta(5).^3)*L(3)+beta(5)*L(5),'+r');
plot(0.6,x,'g.');
plot(1,x,'g.');

%% Q8
clc
clear all
close all

log2(0.4/10^(-6))
log2(0.4/10^(-10))
log2(0.4/10^(-12))
log2(0.4/10^(-14))

%% Q9
clc
clear all
close all

a = 0.6;
b = 1;
L = [63/8 0 -70/8 0 15/8 0];
i = 1;

eps = 10.^-14;

while (b - a) > eps && i < 100
    m = (a + b) / 2;
    if (((a.^5)*L(1)+(a.^3)*L(3)+a*L(5))*((m.^5)*L(1)+(m.^3)*L(3)+m*L(5)) <= 0)
       b = m;
    else
       a = m;
    end
    i = i+1;
    disp(i)
end

disp(a)
disp(b)


