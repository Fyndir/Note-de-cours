function [s] = Graphes(x)
    figure;
    hold on;
    plot(x,sin(x),'g');
    plot(x,cos(x),'b');
    plot(x,sin(x).^2,'r');
    plot(x,sin(x.^2),'y');
    
    s=0;