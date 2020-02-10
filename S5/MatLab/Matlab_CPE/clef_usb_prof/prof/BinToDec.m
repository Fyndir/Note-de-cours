% 'floor':  rounds towards minus infinity.
% 'rem': remainder after a division.
% 'num2str': converts numbers to strings.
% 'fliplr': flips matrix in left/right direction.

clc
clear all

binaire = [1 0 0 0]
a = 0;
b = 1;
binaire = fliplr(binaire);
for i=1:length(binaire)
    a = a + binaire(i)* b;
    b = b * 2;
end
a
dec2bin(a)