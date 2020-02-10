//Graphics
function initPlan() {
    context.beginPath();
    context.fillStyle = "#4b4b4b";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#295814";
    context.fillRect(0, 0, canvas.width, 70);
    context.fillRect(0, canvas.height-70, canvas.width, 70);

    context.fillStyle = "#e5e5e5";
    context.fillRect(0, 70, canvas.width, 5);
    context.fillRect(0, canvas.height-70, canvas.width, 5);
    context.stroke();
}

function initLine(){

    context.lineWidth = 10;
    context.beginPath();
    context.fillStyle = "#4b4b4b";
    context.fillRect(0, middle, canvas.width, 5);
    context.stroke();

    context.beginPath();
    context.fillStyle = "#e5e5e5";
    nbOfLine = (canvas.width / lenLine) + 10;

    u = (n%10)*25

    for(i=0;i<nbOfLine;i++){
        if(i%2){
            context.fillRect(i*lenLine-u, middle, lenLine, 5);
        }
    }

    context.stroke();
}

function drawCar(x,y,plan) {  
    // Axes pour les roues
    plan.lineWidth = 5;
    plan.beginPath();
    plan.strokeStyle =  "#f2eeed";
    plan.moveTo(x+10,y);
    plan.lineTo(x+10,y+20);
    plan.moveTo(x+10,y+70)
    plan.lineTo(x+10,y+50);
    plan.moveTo(x+120,y);
    plan.lineTo(x+120,y+20);
    plan.moveTo(x+120,y+70)
    plan.lineTo(x+120,y+50);
    plan.stroke();

    // Carrosserie
    plan.lineWidth = 10;
    plan.strokeStyle =  EcuriePlayer['princ'];
    plan.fillStyle =  EcuriePlayer['princ'];
    plan.beginPath();
    plan.rect(x, y+20, 120, 30);
    plan.fill();
    plan.moveTo(x+120,y+20);
    plan.quadraticCurveTo(x+150, y+35, x+120, y+50);
    plan.fill();
    plan.stroke();

    // Intérieur
    plan.lineWidth = 10;
    plan.strokeStyle =  EcuriePlayer['sec'];
    plan.fillStyle =  EcuriePlayer['sec'];
    plan.beginPath();
    plan.rect(x+50, y+25, 40, 20);
    plan.fill();
    plan.moveTo(x+90,y+25);
    plan.quadraticCurveTo(x+120, y+35, x+90, y+45);
    plan.fill();
    plan.stroke();

    // Volant
    plan.lineWidth = 2;
    plan.strokeStyle =  "#363431";
    plan.beginPath();
    plan.moveTo(x+90,y+25)
    plan.lineTo(x+90, y+45);
    plan.moveTo(x+90,y+35)
    plan.lineTo(x+110,y+35);
    plan.lineTo(x+90,y+30);
    plan.moveTo(x+110,y+35);
    plan.lineTo(x+90,y+40);
    plan.stroke();

    // Moteur
    plan.beginPath();
    plan.fillStyle =  "#363431";
    plan.rect(x, y+20, 35, 30);
    plan.rect(x-15, y+22, 15, 5);
    plan.rect(x-15, y+43, 15, 5);
    plan.fill();
    plan.stroke();

    // Roues
    plan.lineWidth = 15;
    plan.strokeStyle =  "#363431";
    plan.beginPath();
    plan.moveTo(x,y,plan);
    plan.lineTo(x+20,y);
    plan.moveTo(x,y+70);
    plan.lineTo(x+20,y+70);
    plan.moveTo(x+110,y);
    plan.lineTo(x+130,y);
    plan.moveTo(x+110,y+70);
    plan.lineTo(x+130,y+70);
    plan.stroke();

    // Roues lignes
    plan.beginPath();
    plan.lineWidth = 2;
    plan.strokeStyle =  "#403e3b";

    decalage = 0;
    if(Car['invicibleToOil']){
        decalage = 2;
        plan.strokeStyle =  "rgba(31, 177, 214, 0.7)";
    } else {
        plan.strokeStyle =  "#403e3b";
    }

    r = n%4;
    if(r==3){
        drawPneuLine2(x,y,plan,decalage,r);
        drawPneuLine2(x+110,y,plan,decalage,r);
        drawPneuLine2(x,y+70,plan,-decalage,r);
        drawPneuLine2(x+110,y+70,plan,-decalage,r);
    } else if(r==2) {
        drawPneuLine1(x+6,y,plan,decalage);
        drawPneuLine1(x+116,y,plan,decalage);
        drawPneuLine1(x+6,y+70,plan,-decalage);
        drawPneuLine1(x+116,y+70,plan,-decalage);
    } else if(r==1){
        drawPneuLine1(x+4,y,plan,decalage);
        drawPneuLine1(x+114,y,plan,decalage);
        drawPneuLine1(x+4,y+70,plan,-decalage);
        drawPneuLine1(x+114,y+70,plan,-decalage);
    } else{
        drawPneuLine2(x+2,y,plan,decalage,r);
        drawPneuLine2(x+112,y,plan,decalage,r);
        drawPneuLine2(x+2,y+70,plan,-decalage,r);
        drawPneuLine2(x+112,y+70,plan,-decalage,r);
    }
    plan.stroke();

    if(debug){
        plan.beginPath();
        plan.lineWidth = 2;
        plan.strokeStyle =  "#1fb1d6";
        plan.rect(x-16,y-8,157,85);
        plan.stroke();
    }

}

function drawPneuLine1(x,y,plan,decalage){
    if(decalage<0){
        plan.moveTo(x-decalage,y-7);
        plan.lineTo(x,y+7);
        plan.moveTo(x+9-decalage,y-7);
        plan.lineTo(x+9,y+7);
    } else {
        plan.moveTo(x,y-7);
        plan.lineTo(x+decalage,y+7);
        plan.moveTo(x+9,y-7);
        plan.lineTo(x+9+decalage,y+7);
    }
}

function drawPneuLine2(x,y,plan,decalage,r){
    if(decalage<0){
        if (r==3){
            plan.moveTo(x-decalage,y-7);
            plan.lineTo(x+1,y+7);
        } else {
            plan.moveTo(x-decalage,y-7);
            plan.lineTo(x,y+7);
        }
        plan.moveTo(x+9-decalage,y-7);
        plan.lineTo(x+9,y+7);
        if(r==1){
            plan.moveTo(x+18,y-7);
            plan.lineTo(x+18,y+7);
        }else if (r==3){
            plan.moveTo(x+17-decalage,y-7);
            plan.lineTo(x+18,y+7);
        }
    } else {
        if (r==3){
            plan.moveTo(x+1,y-7);
            plan.lineTo(x+decalage,y+7);
        } else {
            plan.moveTo(x,y-7);
            plan.lineTo(x+decalage,y+7); 
        }
        plan.moveTo(x+9,y-7);
        plan.lineTo(x+9+decalage,y+7);
        if(r==1){
            plan.moveTo(x+18,y-7);
            plan.lineTo(x+18,y+7);
        }else if (r==3){
            plan.moveTo(x+18,y-7);
            plan.lineTo(x+17+decalage,y+7);
        }
    }
}

function drawCrashedCar(x,y,plan) {

    plan.rotate(-20 * Math.PI / 180);

    // Axes pour les roues
    plan.lineWidth = 5;
    plan.beginPath();
    plan.strokeStyle =  "#f2eeed";
    plan.moveTo(x+10,y);
    plan.lineTo(x+10,y+20);
    plan.moveTo(x+120,y)
    plan.lineTo(x+120,y+20);
    plan.moveTo(x+120,y+50);
    plan.lineTo(x+120,y+70);

    plan.moveTo(x+10,y+50);
    plan.lineTo(x+15,y+70)

    plan.stroke();

    // Carrosserie
    plan.lineWidth = 10;
    plan.strokeStyle =  EcuriePlayer['princ'];
    plan.fillStyle =  EcuriePlayer['princ'];
    plan.beginPath();
    plan.rect(x, y+20, 120, 30);
    plan.fill();
    plan.moveTo(x+125,y+17);
    plan.quadraticCurveTo(x+115, y+20+15, x+125, y+23+30);
    plan.fill();
    plan.stroke();

    // Intérieur
    plan.lineWidth = 10;
    plan.strokeStyle =  EcuriePlayer['sec'];
    plan.fillStyle =  EcuriePlayer['sec'];
    plan.beginPath();
    plan.rect(x+50, y+25, 40, 20);
    plan.fill();
    plan.moveTo(x+90,y+25);
    plan.quadraticCurveTo(x+120, y+35, x+90, y+45);
    plan.fill();
    plan.stroke();

    // Volant
    plan.lineWidth = 2;
    plan.strokeStyle =  "#363431";
    plan.beginPath();
    plan.moveTo(x+90,y+25);
    plan.lineTo(x+90, y+45);
    plan.moveTo(x+90,y+35);
    plan.lineTo(x+110,y+35);
    plan.lineTo(x+90,y+30);
    plan.moveTo(x+110,y+35);
    plan.lineTo(x+90,y+40);
    plan.stroke();

    // Moteur
    plan.beginPath();
    plan.fillStyle =  "#363431";
    plan.rect(x, y+20, 35, 30);
    plan.rect(x-15, y+22, 15, 5);
    plan.rect(x-15, y+43, 15, 5);
    plan.fill();
    plan.stroke();

    // Roues
    plan.lineWidth = 15;
    plan.strokeStyle =  "#363431";
    plan.beginPath();
    plan.moveTo(x,y,plan);
    plan.lineTo(x+20,y);
    plan.moveTo(x+110,y+70);
    plan.lineTo(x+130,y+70);

    plan.moveTo(x+4,y+70)
    plan.lineTo(x+24,y+67);

    plan.stroke();

    // Roue cassée
    plan.beginPath();
    plan.lineWidth = 6;
    plan.arc(x+100, y, 8, 0, 2 * Math.PI);
    plan.stroke();
    plan.beginPath();
    plan.lineWidth = 1;
    plan.moveTo(x+100,y-10);
    plan.lineTo(x+100,y+10);
    plan.moveTo(x+95,y-5);
    plan.lineTo(x+105,y+5);
    plan.moveTo(x+95,y+5);
    plan.lineTo(x+105,y-5);
    plan.stroke();

    plan.rotate(20 * Math.PI / 180);
}

function drawOpp(x,y,plan) {  

    // Axes pour les roues
    plan.lineWidth = 5;
    plan.beginPath();
    plan.strokeStyle =  "#f2eeed";
    plan.moveTo(x+10,y);
    plan.lineTo(x+10,y+20);
    plan.moveTo(x+10,y+70)
    plan.lineTo(x+10,y+50);
    plan.moveTo(x+120,y);
    plan.lineTo(x+120,y+20);
    plan.moveTo(x+120,y+70)
    plan.lineTo(x+120,y+50);
    plan.stroke();

    // Carrosserie
    plan.lineWidth = 10;
    plan.strokeStyle =  Opp['ecurie']['princ'];
    plan.fillStyle =  Opp['ecurie']['princ'];
    plan.beginPath();
    plan.rect(x, y+20, 120, 30);
    plan.fill();
    plan.moveTo(x+120,y+20);
    plan.quadraticCurveTo(x+150, y+35, x+120, y+50);
    plan.fill();
    plan.stroke();

    // Intérieur
    plan.lineWidth = 10;
    plan.strokeStyle =  Opp['ecurie']['sec'];
    plan.fillStyle =  Opp['ecurie']['sec'];
    plan.beginPath();
    plan.rect(x+50, y+25, 40, 20);
    plan.fill();
    plan.moveTo(x+90,y+25);
    plan.quadraticCurveTo(x+120, y+35, x+90, y+45);
    plan.fill();
    plan.stroke();

    // Volant
    plan.lineWidth = 2;
    plan.strokeStyle =  "#363431";
    plan.beginPath();
    plan.moveTo(x+90,y+25);
    plan.lineTo(x+90, y+45);
    plan.moveTo(x+90,y+35);
    plan.lineTo(x+110,y+35);
    plan.lineTo(x+90,y+30);
    plan.moveTo(x+110,y+35);
    plan.lineTo(x+90,y+40);
    plan.stroke();

    // Moteur
    plan.beginPath();
    plan.fillStyle =  "#363431";
    plan.rect(x, y+20, 35, 30);
    plan.rect(x-15, y+22, 15, 5);
    plan.rect(x-15, y+43, 15, 5);
    plan.fill();
    plan.stroke();

    // Roues
    plan.lineWidth = 15;
    plan.strokeStyle =  "#363431";
    plan.beginPath();
    plan.moveTo(x,y,plan);
    plan.lineTo(x+20,y);
    plan.moveTo(x,y+70);
    plan.lineTo(x+20,y+70);
    plan.moveTo(x+110,y);
    plan.lineTo(x+130,y);
    plan.moveTo(x+110,y+70);
    plan.lineTo(x+130,y+70);
    plan.stroke();

    // Roues lignes
    plan.beginPath();
    plan.lineWidth = 2;
    plan.strokeStyle =  "#403e3b";
    r = n%4;
    if(r==3){
        drawPneuLine2(x,y,plan,0,1);
        drawPneuLine2(x+110,y,plan,0,1);
        drawPneuLine2(x,y+70,plan,0,1);
        drawPneuLine2(x+110,y+70,plan,0,1);
    } else if(r==2) {
        drawPneuLine1(x+6,y,plan,0);
        drawPneuLine1(x+116,y,plan,0);
        drawPneuLine1(x+6,y+70,plan,0);
        drawPneuLine1(x+116,y+70,plan,0);
    } else if(r==1){
        drawPneuLine1(x+4,y,plan,0);
        drawPneuLine1(x+114,y,plan,0);
        drawPneuLine1(x+4,y+70,plan,0);
        drawPneuLine1(x+114,y+70,plan,0);
    } else{
        drawPneuLine2(x+2,y,plan,0,1);
        drawPneuLine2(x+112,y,plan,0,1);
        drawPneuLine2(x+112,y+70,plan,0,1);
        drawPneuLine2(x+112,y+70,plan,0,1);
    }
    plan.stroke();

    if(debug){
        plan.beginPath();
        plan.lineWidth = 2;
        plan.strokeStyle =  "#1fb1d6";
        plan.rect(x-16,y-8,157,85);
        plan.stroke();
    }
}

function drawGas(x,y,plan){

    y+=16;

    plan.lineWidth = 5;
    plan.beginPath();
    plan.strokeStyle =  "#e2e239";
    plan.moveTo(x+22,y+10);
    plan.quadraticCurveTo(x+30, y-5, x+35, y);
    plan.stroke();

    plan.lineWidth = 4;
    plan.beginPath();
    plan.strokeStyle =  "#d6422e";
    plan.fillStyle =  "#d6422e";
    plan.rect(x, y+10, 25, 25);
    plan.rect(x, y, 18, 1);
    plan.rect(x, y, 1, 10);
    plan.rect(x+20, y+5, 1, 10);
    plan.fill();
    plan.stroke();

    if(debug){
        plan.beginPath();
        plan.lineWidth = 2;
        plan.strokeStyle =  "#1fb1d6";
        plan.rect(x-4,y-4,41,41);
        plan.stroke();
    }
}

function drawOilPath(x,y,plan){
    plan.strokeStyle =  "#141400";
    plan.fillStyle =  "#141400";

    var w1;
    var w2;
    switch(Car['posX']){
        case 0:
            w1 = 88;
            w2 = 158;
            break;
        case 1:
            w1 = 173;
            w2 = 243;
            break;
        case 2:
            w1 = 265;
            w2 = 335;
            break;
        case 3:
            w1 = 350;
            w2 = 420;
            break;
    }

    plan.beginPath();
    plan.lineWidth = 10;
    plan.moveTo(x-4,w1);
    plan.lineTo(360,w1);
    plan.moveTo(x,w2);
    plan.lineTo(360,w2);
    plan.stroke();
}

function drawOil(x,y,plan){

    plan.strokeStyle =  "#141400";
    plan.fillStyle =  "#141400";

    plan.lineWidth = 1;
    plan.beginPath();
    plan.moveTo(x-29,y+5);
    plan.bezierCurveTo(x-15, y, x-5, y-16, x, y-5);
    plan.bezierCurveTo(x+5, y+2, x+10, y+10, x+20, y+20);
    plan.bezierCurveTo(x+30, y+30, x+60, y+40, x+50, y+60);
    plan.bezierCurveTo(x+30, y+60, x+6, y+90, x+2, y+75);
    plan.bezierCurveTo(x, y+90, x-5, y+50, x-20, y+67);
    plan.bezierCurveTo(x-25, y+40, x-44,y+10, x-29,y+5);
    plan.fill();
    plan.stroke();

    if(debug){
        plan.beginPath();
        plan.lineWidth = 2;
        plan.strokeStyle =  "#1fb1d6";
        plan.rect(x-34,y-10,87,89);
        plan.stroke();
    }
}

function drawPneu(x,y,plan){

    plan.beginPath();
    plan.lineWidth = 2;
    plan.strokeStyle =  "rgba(31, 177, 214, 0.5)";
    plan.rect(x-8,y+25,16,20);
    plan.stroke();

    plan.lineWidth = 15;
    plan.strokeStyle =  "#363431";
    plan.beginPath();
    plan.moveTo(x,y+25);
    plan.lineTo(x,y+45);
    plan.stroke();

    plan.beginPath();
    plan.lineWidth = 2;
    plan.strokeStyle =  "rgba(31, 177, 214, 0.7)";
    plan.moveTo(x-7,y+26);
    plan.lineTo(x+7,y+30);
    plan.moveTo(x-7,y+33);
    plan.lineTo(x+7,y+37);
    plan.moveTo(x-7,y+40);
    plan.lineTo(x+7,y+44);  
    plan.stroke();

    if(debug){
        plan.beginPath();
        plan.lineWidth = 2;
        plan.strokeStyle =  "#1fb1d6";
        plan.rect(x-8,y+25,16,20);
        plan.stroke();
    }
}

//Draw

function drawCarC(){
    if(Car['crashed']){
        x=130;
        y=posX[Car['posX']]+90;
        drawCrashedCar(x,y,context);
    } else {
        x=250;
        y=posX[Car['posX']];
        drawCar(x,y,context);
    }
}

function drawOppC(){

    if(Opp['init']){
        x=Opp['posY'];
        y=posX[Opp['posX']];
        drawOpp(x,y,context);
    }

}

function drawGasC(){
    if(Gas['init']){
        x=Gas['posY'];
        y=posX[Gas['posX']];
        drawGas(x,y,context);
    }
}

function drawOilC(){
    if(Oil['init']){
        x=Oil['posY'];
        y=posX[Oil['posX']];
        drawOil(x,y,context);
    }  

    if(Car['oiled']){
        if(Oil['hasBeenOiled']){
            drawOilPath(-20,y,context);
        } else {
            drawOilPath(x,y,context);
        }

    }
}

function drawPneuC(){
    if(Pneu['init']){
        x=Pneu['posY'];
        y=posX[Pneu['posX']];
        drawPneu(x,y,context);
    }
}

function drawDashboard(ctx){
    drawFond(ctx);

    drawPareBrise(ctx)
    drawCoque(EcuriePlayer,ctx);
    drawBoard(EcuriePlayer,ctx);

    drawGasGauge(380,170,EcuriePlayer,ctx);
    drawRPMGauge(620,170,EcuriePlayer,ctx);
    drawGearSpeed(ctx);
    drawVolant(EcuriePlayer,ctx);
}

function drawFond(ctx){

    len = 10;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle =  "#295814";
    ctx.fillStyle =  "#295814";
    ctx.rect(0, dashHeight/7, dashWidth, dashHeight-dashHeight/7);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle =  "#4b4b4b";
    ctx.fillStyle =  "#4b4b4b";
    ctx.moveTo(0,dashHeight);
    ctx.lineTo(dashWidth/3,dashHeight/7);
    ctx.lineTo(dashWidth-dashWidth/3,dashHeight/7);
    ctx.lineTo(dashWidth,dashHeight);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle =  "#e5e5e5";
    ctx.moveTo(0,dashHeight);
    ctx.lineTo(dashWidth/3,dashHeight/7);
    ctx.moveTo(dashWidth-dashWidth/3,dashHeight/7);
    ctx.lineTo(dashWidth,dashHeight);
    ctx.stroke();

    offset = n%20;
    ctx.lineWidth = 15;
    ctx.beginPath();
    for(i=0;i<=100;i++){
        if(i%3){
            ctx.moveTo(dashWidth/2,dashHeight-i*len+offset*3);
            ctx.lineTo(dashWidth/2,dashHeight-(i+1)*len+offset*3);
        }
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle =  "#99d7ef";
    ctx.fillStyle =  "#99d7ef";
    ctx.rect(0, 0, dashWidth, dashHeight/7);
    ctx.fill();
    ctx.stroke();
}

function drawPareBrise(ctx){

    ctx.strokeStyle = "rgba(20, 145, 195, 0.67)";
    ctx.fillStyle = "rgba(20, 145, 195, 0.67)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100,150);
    ctx.bezierCurveTo(200, -20, dashWidth-200, -20, dashWidth-100, 150);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}

function drawCoque(ecurie,ctx){
    ctx.beginPath();
    ctx.strokeStyle = ecurie['princ'];
    ctx.fillStyle = ecurie['princ'];

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-150,dashHeight);
    ctx.bezierCurveTo(20, 20, dashWidth-20, 20, dashWidth+150, dashHeight);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "#2e2e2e";
    ctx.lineWidth = 3;

    sep = 50;

    for(i=0;i<5;i++){
        ctx.beginPath();
        ctx.moveTo(-150+i*sep,dashHeight+i*sep);
        ctx.bezierCurveTo(20, 20+i*sep, dashWidth-20, 20+i*sep, dashWidth+150-i*sep, dashHeight+i*sep);
        ctx.stroke();
    }
}

function drawBoard(ecurie,ctx){
    ctx.beginPath();
    ctx.strokeStyle = ecurie['sec'];
    ctx.fillStyle = ecurie['sec'];

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(320,dashHeight);
    ctx.bezierCurveTo(300, dashHeight, 300, dashHeight-200, 320, dashHeight-200);
    ctx.bezierCurveTo(320, dashHeight-215, 680, dashHeight-215, 680, dashHeight-200);
    ctx.bezierCurveTo(700, dashHeight-200, 700, dashHeight, 680, dashHeight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#2e2e2e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(320,dashHeight);
    ctx.bezierCurveTo(300, dashHeight, 300, dashHeight-200, 320, dashHeight-200);
    ctx.bezierCurveTo(320, dashHeight-215, 680, dashHeight-215, 680, dashHeight-200);
    ctx.bezierCurveTo(700, dashHeight-200, 700, dashHeight, 680, dashHeight);
    ctx.stroke();
}

function drawGasGauge(x,y,ecurie,ctx){
    ctx.beginPath();
    ctx.strokeStyle = "#222222";
    ctx.fillStyle = "#3c3c3c";
    ctx.lineWidth = 4;
    ctx.arc(x, y, 60, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    drawGasNumbers(ctx,x,y);
    ctx.save(); 
    var radius = 59;
    ctx.translate(radius+x-64, radius+y-53);
    radius = radius * 0.90
    pos = translateToGas(Car['gas']);
    drawGasHand(ctx, pos, radius*0.52, radius*0.03);
    ctx.restore();
}

function translateToGas(gas){
    u = gas/100;
    v = u*0.5;
    w = v-0.75;

    pos = w*Math.PI;
    return pos;

}

function drawGasNumbers(ctx,x,y) {
    ctx.font = "12px arial";
    ctx.fillStyle = "#ededed";
    ctx.fillText("E", x-38, y+38);
    ctx.fillText("F", x-38, y-18);
}

function drawGasHand(ctx, pos, length, dashWidth) {
    ctx.strokeStyle = "#ededed";
    ctx.beginPath();
    ctx.lineWidth = dashWidth;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawRPMGauge(x,y,ecurie,ctx){
    ctx.beginPath();
    ctx.strokeStyle = "#222222";
    ctx.fillStyle = "#3c3c3c";
    ctx.lineWidth = 4;
    ctx.arc(x, y, 60, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.save(); 
    var radius = 59;
    ctx.translate(radius+x-64, radius+y-53);
    radius = radius * 0.90
    drawRPMNumbers(ctx, radius);
    pos = translateToRPM(Car['rpm']);
    drawRPMHand(ctx, pos, radius*0.9, radius*0.04);
    ctx.restore();
}

function translateToRPM(rpm){
    u = rpm/12;
    v = u*(1.31);
    w = v-0.66;

    pos = w*Math.PI;
    return pos;

}

function drawRPMNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius*0.28 + "px arial";
    for(num = 1; num < 13; num++){
        if(num<8){
            ctx.fillStyle = "#ededed";
        } else {
            ctx.fillStyle = "#ea1a1a";
        }
        ang = (num-6)/1.4 * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawRPMHand(ctx, pos, length, dashWidth) {
    ctx.strokeStyle = "#ededed";
    ctx.beginPath();
    ctx.lineWidth = dashWidth;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawGearSpeed(ctx){
    ctx.beginPath();
    ctx.strokeStyle = "#222222";
    ctx.fillStyle = "#3c3c3c";
    ctx.lineWidth = 4;
    ctx.rect(475,100,50,75);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#f40d0d";
    ctx.font = "60px Arial";
    ctx.fillText(Car['speed'],484,154);
    ctx.stroke();
}

function drawVolant(ecurie,ctx){

    turn = Car['turn'];

    ctx.beginPath();
    ctx.strokeStyle = ecurie['sec'];
    ctx.fillStyle = ecurie['sec'];
    ctx.lineWidth = 30;
    ctx.arc(500, 295, 120, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.save();

    ctx.translate(500, 295);
    ctx.rotate(turn*Math.PI);

    ctx.beginPath();
    ctx.strokeStyle = "#2e2e2e";
    ctx.lineWidth = 30;
    ctx.arc(0, 0, 120, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(-110,-25);
    ctx.lineTo(110,-25);
    ctx.moveTo(0,-25);
    ctx.lineTo(0,35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = ecurie['logo'];
    ctx.lineWidth = 5;
    ctx.arc(0, -25, 18, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

//Controls

document.onkeydown = function(event) {
    event = event || window.event;
    event.preventDefault();

    if(event.keyCode==69 || event.keyCode==90){
        cheatedRun = true;
    }

    console.log(event.keyCode);

    switch(event.keyCode){
        case 38:
            updateCar("up");
            break;
        case 40:
            updateCar("down");
            break;
        case 74:
            Car['crashed'] = true;
            break;
        case 75:
            debug = !debug;
            break;
        case 82:
            initGame();
            break;
        case 69:
            Car['gas'] = 100;
            break;
        case 90:
            Car['invicibleToOil'] = 200;
            break;
        case 84:
            tickTime += 50;
            break;
        case 89:
            tickTime -= 10;
            if(tickTime<10) tickTime = 10;
            break;
    }
}

function updateCar(dir){

    if(!Car['crashed']){
        if(dir == "up" && Car['posX'] > 0){
            Car['turn'] = -0.2;
            if(!Car['oiled']){
                Car['posX']--;
                drawCarC(); 
            } 
        } else if(dir == "down" && Car['posX'] < 3){
            Car['turn'] = 0.2;
            if(!Car['oiled']){
                Car['posX']++;
                drawCarC();
            }
        }
        drawVolant(EcuriePlayer,dashboard);
    }

}

// Game

function init(){
    n = 0;
    scoreNb = 0;
    accel = 0;
    accelApp = 0;
    cheatedRun = false;
    Car = {
        posX: 2,
        crashed: false,
        crashedByOpp: false,
        crashedByGas: false,
        invicibleToOil: 0,
        oiled: false,
        gas: 100,
        speed: 1,
        rpm: 1,
        turn: 0
    };
    Opp = {
        init: false,
        posX: 1,
        posY: 1
    };
    Gas = {
        init: false,
        posX: 1,
        posY: 1,
    };
    Oil = {
        init: false,
        posX: 1,
        posY: 1,
        hasBeenOiled: false
    };
    Pneu = {
        init: false,
        posX: 1,
        posY: 1
    };
    tickTime = 100;
    appOpp = 6;
    appGas = 100;
    appOil = 20;
    appPneu = 250;
}

function initGame(){

    init();
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);

    id = params.get('id');

    initEcuries(id);
    initPlan();

    tick();
}

function initEcuries(id){
    var Ferrari = {
        princ: "#db360f",
        sec: "#b54024",
        logo: "#e0e01c",
        name: "Ferrari",
        id: 1
    }
    var Honda = {
        princ: "#7915dd",
        sec: "#59189a",
        logo: "#b54024",
        name: "Honda",
        id: 2
    }
    var Renault = {
        princ: "#0a4390",
        sec: "#092750",
        logo: "#e0e01c",
        name: "Renault",
        id: 3
    }
    var Lotus = {
        princ: "#21860e",
        sec: "#1b6a0c",
        logo: "#e0e01c",
        name: "Lotus",
        id: 4
    }
    var Toyota = {
        princ: "#f4f4f4",
        sec: "#b54024",
        logo: "#b54024",
        name: "Toyota",
        id: 5
    }
    var McLaren = {
        princ: "#e0e01c",
        sec: "#b2be31",
        logo: "#575757",
        name: "McLaren",
        id: 6
    }
    var Mercedes = {
        princ: "#4e4e4e",
        sec: "#383838",
        logo: "#c4c4c4",
        name: "Mercedes",
        id: 7
    }
    var AlfaRomeo = {
        princ: "#f4f4f4",
        sec: "#e6e6e6",
        logo: "#092750",
        name: "Alfa Romeo",
        id: 8
    }

    Ecuries = [Ferrari,Honda,Renault,Lotus,Toyota,McLaren,Mercedes,AlfaRomeo];

    EcuriesOpp = [];
    Ecuries.forEach(function(element){
        if(element['id'] != id){
            EcuriesOpp.push(element);
        } else {
            EcuriePlayer = element;
        }
    });
}

function tick(){

    n++;
    initPlan();
    updateSocre(); 

    initOpp();
    initGas();
    initOil();
    initPneu();

    initLine();

    initDashboard();

    testCrashCar();
    testGas();
    testOil();
    testPneu();
    testInvincibleToOil();

    drawGasC();
    drawOilC();
    drawPneuC();
    drawOppC();
    drawCarC();

    if(!(n%10)){
        if(tickTime>10) tickTime--;
        else if(accel<20) accel++;
    }

    if(!(n%50)){
        if(accelApp<5){
            accelApp++;
        }
    }

    if(Car['gas']<0){
        Car['crashed'] = true;
        Car['crashedByGas'] = true;
        gasEmpty.play();
    }

    if(!Car['crashed']){
        setTimeout(tick, tickTime);
    } else {
        endGame();
    }
}

function initDashboard(){

    if(Car['rpm']<12.6){
        Car['rpm']+=0.06;
    }
    if(Car['rpm']>10 && Car['speed']<7){
        Car['speed']++;
        Car['rpm']=1;
    }

    Car['gas']-=0.2;
    drawDashboard(dashboard);
    if(Car['turn']>0){
        Car['turn']-=0.1;
    } else if (Car['turn']<0){
        Car['turn']+=0.1;
    }
}

function initOpp(){

    if(!Opp['init']){
        r = Math.floor(Math.random() * (appOpp-accelApp));
        if(!r){
            do{
                pos = Math.floor(Math.random() * 4);
            } while((Pneu['init'] && pos==Pneu['posX'])||(Gas['init'] && pos==Gas['posX'])||(Oil['init'] && pos==Oil['posX']));

            c = Math.floor(Math.random() * 7);
            Opp['init'] = true;
            Opp['posX'] = pos;
            Opp['posY'] = 1050;
            Opp['ecurie'] = EcuriesOpp[c];
        }

    } else {
        if(Opp['posY'] < -140){
            Opp['init'] = false;
            scoreNb += 200;
        } else {
            Opp['posY'] -= (10+accel);
        }
    }

}

function initGas(){

    if(!Gas['init']){
        r = Math.floor(Math.random() * (appGas-accelApp));
        if(!r){
            do{
                pos = Math.floor(Math.random() * 4);
            } while((Opp['init'] && pos==Opp['posX'])||(Pneu['init'] && pos==Pneu['posX'])||(Oil['init'] && pos==Oil['posX']));

            Gas['init'] = true;
            Gas['posX'] = pos;
            Gas['posY'] = 1050;
        }

    } else {
        if(Gas['posY'] < -40){
            Gas['init'] = false;
        } else {
            Gas['posY'] -= (50+accel);
        }
    }

}

function initOil(){

    if(!Oil['init']){
        r = Math.floor(Math.random() * (appOil-accelApp));
        if(!r){
            do{
                pos = Math.floor(Math.random() * 4);
            } while((Opp['init'] && pos==Opp['posX'])||(Gas['init'] && pos==Gas['posX'])||(Pneu['init'] && pos==Pneu['posX']));

            Oil['init'] = true;
            Oil['posX'] = pos;
            Oil['posY'] = 1050;
            Oil['dead'] = false;
        }

    } else {
        if(Oil['posY'] < -200){
            Oil['init'] = false;
            if(Car['oiled'] && !Oil['hasBeenOiled']){
                Oil['hasBeenOiled'] = true;
            }
        } else {
            Oil['posY'] -= (50+accel);
        }
    }

}

function initPneu(){

    if(!Pneu['init'] && !Car['invicibleToOil']){
        r = Math.floor(Math.random() * (appPneu-accelApp));
        if(!r){ 
            do{
                pos = Math.floor(Math.random() * 4);
            } while((Opp['init'] && pos==Opp['posX'])||(Gas['init'] && pos==Gas['posX'])||(Oil['init'] && pos==Oil['posX']));

            Pneu['init'] = true;
            Pneu['posX'] = pos;
            Pneu['posY'] = 1050;
        }

    } else {
        if(Pneu['posY'] < -200){
            Pneu['init'] = false;
        } else {
            Pneu['posY'] -= (50+accel);
        }
    }

}

function testCrashCar(){
    if(Opp['init']){
        if(Opp['posX'] == Car['posX'] && Opp['posY'] > 110 && Opp['posY'] < 400){
            Car['crashedByOpp'] = true;
            Car['crashed'] = true;
            crashSound.play();
        }
    }
}

function testGas(){
    if(Gas['init'] && !Gas['dead']){
        if(Gas['posX'] == Car['posX'] && Gas['posY'] > 220 && Gas['posY'] < 380){
            Gas['init'] = false;
            Car['gas']+=20;
            if(Car['gas']>100) Car['gas'] = 100;
            getGasSound.play();
        }
    }
}

function testOil(){
    if(Oil['init'] && !Oil['dead']){
        if(Oil['posX'] == Car['posX'] && Oil['posY'] > 240 && Oil['posY'] < 390){
            if(!Car['invicibleToOil']){
                Car['oiled'] = true;
                oilRunSound.play();
            }
        }
    }
}

function testPneu(){
    if(Pneu['init']){
        if(Pneu['posX'] == Car['posX'] && Pneu['posY'] > 240 && Pneu['posY'] < 390){
            Pneu['init'] = false;
            scoreNb+=100;
            Car['invicibleToOil'] = 200;
            Car['oiled'] = false;
            Oil['hasBeenOiled'] = false;
            getPneuSound.play();
        }
    }
}

function testInvincibleToOil(){
    if(Car['invicibleToOil']){
        Car['invicibleToOil'] = Car['invicibleToOil']-1;
    }
}

function updateSocre(){
    if(scoreNb<0) scoreNb = 0;
    if(!(n%5)){
        scoreNb++;
    }

    context.textAlign = "left";
    context.font = "30px arial";
    context.fillStyle = "#cc3c1a";
    context.fillText(scoreNb,11,51);
    context.fillStyle = "#ccaa1a";
    context.fillText(scoreNb,10,50);
}

function endGame(){  
    var sent0;

    if(Car['crashedByGas']){
        sent0 = "On a oublié de faire le plein ?";
    } else if(Car['crashedByOpp']){
        sent0 = "On regardait pas la route ?";
    } else{
        sent0 = "Pourquoi abandonner en si bon chemin ?";
    }

    var sent1 = "Ton score est de "+scoreNb+" points";
    if(cheatedRun){
        sent1+=" (mais tu as triché)";
    }
    var sent2 = "Appuie sur R pour rejouer";

    context.textAlign = "center";

    context.font = "30px arial";
    context.fillStyle = "#cc3c1a";
    context.fillText(sent0,500,155);
    context.fillStyle = "#ccaa1a";
    context.fillText(sent0,502,156);

    context.font = "45px arial";

    context.fillStyle = "#cc3c1a";
    context.fillText(sent1,500,225);
    context.fillStyle = "#ccaa1a";
    context.fillText(sent1,502,227);

    context.fillStyle = "#cc3c1a";
    context.fillText(sent2,500,275);
    context.fillStyle = "#ccaa1a";
    context.fillText(sent2,502,277);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

var canvas = document.getElementById("jeu");
var context = canvas.getContext("2d");
var dashCanvas = document.getElementById("dashboard");
var dashboard = dashCanvas.getContext("2d");
var middle = canvas.height / 2 + 2;
var n;
var scoreNb;
var lenLine = 30;
var posX = {
    0: 89,
    1: 174,
    2: 265,
    3: 350
};
var Car;
var Opp;
var Gas;
var Oil;
var Pneu;
var tickTime;
var appOpp;
var appGas;
var appOil;
var appPneu;
var accel;
var accelApp;
var debug = false;
var Ecuries;
var EcuriePlayer;
var EcuriesOpp;
var dashWidth = 1000;
var dashHeight = 300;
var cheatedRun;

var oilRunSound = new sound("oilRunSound.wav");
var crashSound = new sound("crashSound.wav");
var getGasSound = new sound("getGasSound.wav");
var getPneuSound = new sound("getPneuSound.wav");
var gasEmpty = new sound("gasEmpty.wav");

initGame();

/*initEcuries(7);
initPlan();

Opp['init'] = true;
Opp['posX'] = 2;
Opp['posY'] = 1050;

Opp['ecurie'] = EcuriesOpp[5];

Car['posX'] = 2;

drawOppC();
drawCarC();*/