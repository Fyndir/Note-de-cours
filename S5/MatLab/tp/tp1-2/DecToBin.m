function [s] = DecToBin(d)

    i=0;
    
    while ((2^i) <= d)
        i = i+1;
    end;
    
    for j = i:-1:1
        if((2^(j-1)) <= d)
            s(1,i-j+1) = '1';
            d = d - (2^(j-1));
        else
            s(1,i-j+1) = '0';
        end;
    end;