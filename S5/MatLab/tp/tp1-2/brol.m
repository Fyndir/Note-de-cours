function [s] = brol(xmin,xmax)
    
%     figure;
%     i = xmin:0.01:xmax;
%     stable = find(i<=0);
%     up = find(i>0);
% 
%     hold on;
%     plot(i(stable),1,'g');
%     plot(i(up),i(up));
figure;
x=xmin:xmax;
y=(x>0).*x;

plot(x,y);



s=i;
    
    