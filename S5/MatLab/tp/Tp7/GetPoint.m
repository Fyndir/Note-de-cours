function [p,Bt] = GetPoint(P1, P2, P3, P4)
[x y]=xy(P1,P2,P3,P4);
s=20;
dx = (max)-min(x))/s;
dy = (may)-min(y))/s;
[xs,ys,Bt]=ginput(1);
p = find(abs(xs-x)<dx & abs(ys-y)<dy)
if size(p)~=0
    [x y]=xy(P1,P2,P3,P4);
    text(min(x),may)+0.05*(may)-min(y)),['Point ', num2str(p)],'FontSize',12, 'Color',[1 0 1]);
    switch p
        case 1
            plot(P1(:,1),P1(:,2),'bo');
        case 2
            plot(P2(:,1),P2(:,2),'bo');
        case 3
            plot(P3(:,1),P3(:,2),'bo');
        case 4
            plot(P4(:,1),P4(:,2),'bo');
    end
else
    p=0;
end


