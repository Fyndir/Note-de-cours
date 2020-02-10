clc
close all

% clear x y t
% close all
% t=linspace(0,6,200);
% hold on
% for i=1 : length(t)
%     x = t(i);
%     y = 1-t(i);
%     plot(x,y,'g.')
%     drawnow
% end
% grid on

figure
set(gcf,'doublebuffer','off');
clear x y t
close all
t=linspace(0,6.3,2000);
hold on
for i=1 : length(t)
    tt=t(i);
    x = sin(3*tt);
    y = sin(4*tt);
    plot(x,y,'g.')
    drawnow
end
grid on
axis equal

% clear x y t
% close all
% hold on
% axis([-2 2 -5 5]);
% t=linspace(-5,5,200);
% for i=1 : length(t)
%     tt = t(i);
%     x=(1-tt*tt)./(1+tt*tt);
%     y =tt*x;
%     plot(x,y,'g.')
%     drawnow
% end
% plot(x,y,'b');
% grid on

% clear x y t
% close all
% hold on
% axis([-1 1 -1 1]);
% t=linspace(0,2*pi,200);
% for i=1 : length(t)
%     tt = t(i);
%     x=cos(tt)^3;
%     y=sin(tt)^3;
%     plot(x,y,'g.')
%     drawnow
% end
% plot(x,y,'b');
% grid on

% clear x y t
% close all
% hold on
% %axis([-1 1 -1 1]);
% t=linspace(0,12,500);
% for i=1 : length(t)
%     tt = t(i);
%     x=cos(tt);
%     y=tt/2+sin(tt);
%     plot(x,y,'r.')
%     drawnow
% end
% plot(x,y,'b');
% grid on

% 
%  clear x y t
%  close all
%  hold on
%  %axis([-1 1 -1 1]);
%  t=linspace(0,6,3000);
%  for i=1 : length(t)
%      tt = t(i); % un point
%      x=cos(tt);
%      y=sin(tt)^2/(2+sin(tt));
%      plot(x,y,'g.')
%      drawnow
%  end
%  grid on