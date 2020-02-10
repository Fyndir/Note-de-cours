function [p]= italic(P,alpha)
alpha = alpha*2*pi/180;
p(1,2)=P(1,2)
p(1,1)=P(1,1)+P(1,2)*sin(alpha)