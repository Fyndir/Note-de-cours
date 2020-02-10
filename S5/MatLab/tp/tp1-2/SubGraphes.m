function [s] = SubGraphes(x)
    figure;
    hold on;
    subplot(2,2,1);
    plot(x,sin(x),'g');
    subplot(2,2,2);
    plot(x,cos(x),'b');
    subplot(2,2,3);
    plot(x,sin(x).^2,'r');
    subplot(2,2,4);
    plot(x,sin(x.^2),'y');
    
    s=0;