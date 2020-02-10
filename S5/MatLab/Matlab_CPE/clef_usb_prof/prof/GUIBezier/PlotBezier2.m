function M =  PlotBezier2(P1,P2,t)
b = [t 1];
mat = [-1  1;
        1  0];
M = b*mat*[P1;P2];
