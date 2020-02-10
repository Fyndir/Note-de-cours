%% Exercice 1
clc
clear all
close all

figure;
hold on;

x1 = -10:10;
x2 = x1/2 + 1;
plot(x1,x2);

x2 = x1/2;
plot(x1,x2);

A = [1 -2;2 -4];
b = [2 ; 0];

disp(['Question 2 : ' num2str(det(A))])


disp('Question 3 : Il n y a pas de solution')

x = A\b;

disp('Question 4 : ')
x


%% Exercice 2
clc
clear all
close all

figure;
hold on;

x1 = -10:10;
x2 = x1/2 + 1;
plot(x1,x2);

x2 = x1/4;
plot(x1,x2);

A = [1 -2;1 -4];
b = [2 ; 0];

disp(['Question 6 : determinant : ' num2str(det(A))])

disp('Question 7 : La solution n est pas unique, il y en a 2')

x = A\b;

disp('Question 8 : ')
x




%% Exercice 3
clc
clear all
close all

A = [1 -2;2 -4];
b = [0 ; 0];

disp('Question 9 : Ce système est de type carré avec second membre nulle')

disp(['Question 10 : determinant : ' num2str(det(A))])

disp('Question 11 : determinant nul, pas de solution')

x = A\b;

disp('Question 12 :')
x

%% Exercice 4
clc
clear all
close all

A = [1 -2;1 -4];
b = [0 ; 0];

disp('Question 13 : Ce système est de type carré avec second membre nulle')

disp(['Question 14 : determinant : ' num2str(det(A))])

disp('Question 15 : determinant non nul, une solution')

x = A\b;

disp('Question 16 :')
x

%% Exercice 5
clc
clear all
close all

A = [1 2 3;0 3 1];
b = [1;-2];

x = A\b

2*(-1) + 3
3*(-1) + 1


%% Exercice 6
clc
clear all
close all

A = [2 -1;1 1;6 -1];
b = [2;5;-5];

figure;
hold on;

x1 = -2:6;

x2 = 2*x1 -2;
plot(x1,x2);

x2 = -x1 + 5;
plot(x1,x2);

x2 = 6*x1 + 5;
plot(x1,x2);

x = A\b

2*x(1) - x(2)
x(1) + x(2)
6*x(1) + x(2)

plot(x(1),x(2))


%% Exercice 7
clc
clear all
close all

A = magic(10);
b = [1:10]';

x1 = A\b

%Warning: Matrix is close to singular or badly scaled. Results may be inaccurate. RCOND =  1.243297e-18.

cond(A)

b(10) = 10.0001;

x2 = A\b

b(10) = 10;
A(10,10) = 59.001;

x3 = A\b

[x1 x2 x3]

%% Exercice 8
clc
clear all
close all

A = [1 2 3;3 2 1;3 4 7;10 9 8];
b = [12;15;13;17];

xM = A\b

x = (A'*A) \ (A'*b)


%% Exercice 9
clc
clear all
close all

figure;
hold on;

plot(0.25,18,'+');
plot(0.5,10,'+');
plot(1,7,'+');
plot(2,2,'+');
plot(3,1,'+');

A = [0.25 1;0.5 1;1 1;2 1;3 1];
b = [18;10;7;2;1];

xM = A\b

x = 0:0.25:4;
y = x*xM(1) + xM(2);

plot(x,y);

A = [1 exp(-0.25);1 exp(-0.5);1 exp(-1);1 exp(-2);1 exp(-3)];
b = [18;10;7;2;1];

xM2 = A\b

y = x*xM2(1) + xM2(2);
plot(x,y);


