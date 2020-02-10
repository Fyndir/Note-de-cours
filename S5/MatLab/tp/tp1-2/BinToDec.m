function [d] = BinToDec(s)

    d = 0;
    len = length(s);

    for i=len:-1:1
        if(s(i) == '1')
            d = d + 2^(len-i);
        end;
    end;
        