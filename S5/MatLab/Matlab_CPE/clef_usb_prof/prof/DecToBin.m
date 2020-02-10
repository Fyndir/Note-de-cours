% 'floor':  rounds towards minus infinity.
% 'rem': remainder after a division.
% 'num2str': converts numbers to strings.
% 'fliplr': flips matrix in left/right direction.

clc
clear all

a = 8

quotient = floor(a/2);
reste = rem(a, 2);
binaire(1) = num2str(reste);
i = 1;
while quotient >= 2
    a = quotient;
    quotient = floor(a/2);
    reste = rem(a, 2);
    i = i + 1;
    binaire(i) = num2str(reste);
end
binaire(i + 1) = '1';
binaire = fliplr(binaire)
bin2dec(binaire)