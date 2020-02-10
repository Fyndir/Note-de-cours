function [P1,P2,P3,P4,Bt] = MovePoint(P1,P2,P3,P4)

[p,Bt] = GetPoint(P1,P2,P3,P4)

if p>0 && p<5
    [xs,ys,Bt]=ginput(1);
    switch p
        case 1
            P1 = [xs ys];
        case 2
            P2 = [xs ys];
        case 3
            P3 = [xs ys];
        case 4
            P4 = [xs ys];
    end
else
    if(Bt ~= 3)
        [x y]=xy(P1,P2,P3,P4);
        text(min(x),max(y)+0.05*(max(y)-min(y)),'Point non trouvé','FontSize',12, 'Color',[1 0 1]);
        pause(0.5);
    end
end
