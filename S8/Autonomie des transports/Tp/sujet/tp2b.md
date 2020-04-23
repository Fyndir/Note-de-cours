# Practical Work 2 (part B - in autonomy)

Until now we did some quick and dirty code. Fortunately this can't be done to transport people at 130 km/h from a point A to a point B.  

The automotive industry brings us good practices to code and to design hardware. 

Please take a glance to this document: [The MISRA C Coding Standard and its Role in the Development and Analysis of Safety- and Security-Critical Embedded Software](https://arxiv.org/pdf/1809.00821.pdf)

:pencil: With your 50 own words (+/- 10) explain what is MISRA (preferably in  french)

The goal of this practical work will be to modify your code `road_follower.c` to follow a few MISRA rules.

Here is how we are going to proceed:
  1. Install a MISRA parser/checker
  2. Identify MISRA non-compliant code 
  3. Make your code a bit more MISRA compliant

## 1. Install a MISRA parser/checker

MISRA parsers are way too expensive. However there are some proprietary evaluation demo (e.g IAR) and also some open source initiatives. In the latter option, the most common one is cppcheck. Actually cppcheck checks some code best practices and provides an optionnal MISRA parser. However, it has 2 main drawbacks:
- It doesn't cover all the misra rules. If you open [this page](http://cppcheck.sourceforge.net/misra.php), you can see which misra rules are natively covered by cppcheck (without misra addon), which rules are covered by the misra addon, and which rules are not covered 
- The parser gives ONLY the mira rules numbers and NOT the corresponding explanation text. This text is under liscence and should be payed to MISRA... that's the reason ! 

Let's install...

In another folder than your git project (to avoid git conficts), run de command lines below.  
:warning: it can take a few minutes (especially build), so read [this](https://www.synopsys.com/automotive/what-is-misra.html) to wait :wink: : 

```bash
git clone https://github.com/danmar/cppcheck.git
cd cppcheck
mkdir build
cd build
cmake ..
cmake --build .
sudo make install
```

## 2. Identify MISRA non-compliant code 

Now make a test. Move to your project folder and write this command line:
```bash
cppcheck --addon=misra road_follower.c
```

You will (or you are very lucky) notice a bunch of misra violation like in this exemple:
```
Checking road_follower.c ...
vehicle_checker.c:16:5: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-2.7]
int main(int argc, char **argv)
    ^
vehicle_checker.c:163:5: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-3.1]
    /*
    ^
vehicle_checker.c:26:9: style: misra violation (use --rule-texts=<file> to get proper output) [misra-c2012-13.4]
 if ((s = socket(PF_CAN, SOCK_RAW, CAN_RAW)) < 0) {
        ^
```

You can find a file called `Misra-c_2012_compliance.pdf` on eCampus. This file contains the summary description for every misra rules and directives. 

So if we move back to parser logs we have 3 violations:
- R 2.7 - There should be no unused parameters in functions
- R 3.1 - The character sequences /* and // shall not be used within a comment
- R 13.4 - The result of an assignment operator should not be used

:pencil: For each of these 3 rules, check if they are required for misra-compliance or if they are just advisement

Option : If not having directly the misra violation explation in cppcheck is itchy for you... I just let you know that [there is a way to have it](https://github.com/ChisholmKyle/SublimeLinter-cppcheck-misra), but it might take you some time.


## 3. Make your code a bit more MISRA compliant

Before all, copy `road_follower.c` in `road_follower_misra.c` 

:pencil: Now you have to modify `road_follower_misra.c` with this purpose : remove every occurences of at least 3 different kind of misra violations. If possible, choose 3 different static analysis categories (control-flow, points-to, arithmetic). Explain in your report how this compliance can avoid misleading a future developper in this specific code.


<!--

MISRA



http://my.ldrasoftware.co.uk/repository//miscellaneous/Misra-c_2012_compliance.pdf

http://cppcheck.sourceforge.net/misra.php


https://www.academia.edu/40301277/MISRA_C_2_012_Guidelines_for_the_use_of_the_C_language_in_critical_systems




git clone https://github.com/danmar/cppcheck.git
mkdir build
cd build
cmake ..
cmake --build .
sudo make install


cppcheck --addon=misra vehicle_checker.c





Quest secu CAN :
- Que se passe t'il si on envoi une commande plein gaz et que la communication CAN à un problème ?
> Proposer une solution à implémenter côté simulateur
> 
-->

:pencil: [Tag](https://docs.gitlab.com/ee/university/training/topics/tags.html) your work with "TP2b"