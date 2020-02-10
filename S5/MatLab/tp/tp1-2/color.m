function [s] = color()
s=0;
T=-500:500;
figure;
x = -pi:0.1:pi;
y = -pi:0.1:pi;

for i=1:length(x)
    for j=1:length(y)
        Z(i,j) = 1*(sin(T(i)*sqrt(x(i).^2+y(j).^2))/(T(j)*sqrt(x(i).^2+y(i).^2)));
    end;
end;
surf(x,y,Z);