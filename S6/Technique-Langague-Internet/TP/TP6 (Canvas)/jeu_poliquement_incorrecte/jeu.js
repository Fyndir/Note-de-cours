//Graphics
function initPlan() {
    context.fillStyle = "#4b4b4b";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#295814";
    context.fillRect(0, 0, canvas.width, 70);
    context.fillRect(0, canvas.height-70, canvas.width, 70);

    context.fillStyle = "#e5e5e5";
    context.fillRect(0, 70, canvas.width, 5);
    context.fillRect(0, canvas.height-70, canvas.width, 5);
}

function remakePlan() {
    context.fillStyle = "#4b4b4b";
    context.fillRect(0, 75, canvas.width, 177);
    context.fillRect(0, 257, canvas.width, 170);
}

function initLine(){

    context.lineWidth = 10;
    context.fillStyle = "#4b4b4b";
    context.fillRect(0, middle, canvas.width, 5);
    context.stroke();

    context.beginPath();
    context.fillStyle = "#e5e5e5";
    nbOfLine = (canvas.width / len) + 10;

    u = (n%10)*25

    for(i=0;i<nbOfLine;i++){
        if(i%2){
            context.fillRect(i*len-u, middle, len, 5);
        }
    }

    context.stroke();
}

function drawCar() {  
    x=250;
    y=posX[Car['posX']];

    // Axes pour les roues
    context.lineWidth = 5;
    context.beginPath();
    context.strokeStyle =  "#f2eeed";
    context.moveTo(x+10,y);
    context.lineTo(x+10,y+20);
    context.moveTo(x+10,y+70)
    context.lineTo(x+10,y+50);
    context.moveTo(x+120,y);
    context.lineTo(x+120,y+20);
    context.moveTo(x+120,y+70)
    context.lineTo(x+120,y+50);
    context.stroke();

    // Carrosserie
    context.lineWidth = 10;
    context.strokeStyle =  "#db360f";
    context.fillStyle =  "#db360f";
    context.beginPath();
    context.rect(x, y+20, 120, 30);
    context.fill();
    context.moveTo(x+120,y+20);
    context.quadraticCurveTo(x+150, y+35, x+120, y+50);
    context.fill();
    context.stroke();

    // Intérieur
    context.lineWidth = 10;
    context.strokeStyle =  "#b54024";
    context.fillStyle =  "#b54024";
    context.beginPath();
    context.rect(x+50, y+25, 40, 20);
    context.fill();
    context.moveTo(x+90,y+25);
    context.quadraticCurveTo(x+120, y+35, x+90, y+45);
    context.fill();
    context.stroke();

    // Volant
    context.lineWidth = 2;
    context.strokeStyle =  "#363431";
    context.beginPath();
    context.moveTo(x+90,y+25)
    context.lineTo(x+90, y+45);
    context.moveTo(x+90,y+35)
    context.lineTo(x+110,y+35);
    context.lineTo(x+90,y+30);
    context.moveTo(x+110,y+35);
    context.lineTo(x+90,y+40);
    context.stroke();

    // Moteur
    context.beginPath();
    context.fillStyle =  "#363431";
    context.rect(x, y+20, 35, 30);
    context.rect(x-15, y+22, 15, 5);
    context.rect(x-15, y+43, 15, 5);
    context.fill();
    context.stroke();

    // Roues
    context.lineWidth = 15;
    context.strokeStyle =  "#363431";
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x+20,y);
    context.moveTo(x,y+70);
    context.lineTo(x+20,y+70);
    context.moveTo(x+110,y);
    context.lineTo(x+130,y);
    context.moveTo(x+110,y+70);
    context.lineTo(x+130,y+70);
    context.stroke();

    // Roues lignes
    context.lineWidth = 2;
    context.strokeStyle =  "#403e3b";
    context.beginPath();

    r = n%5;
    if(r==4){
        context.moveTo(x,y-8);
        context.lineTo(x,y+8);
        context.moveTo(x+8,y-8);
        context.lineTo(x+8,y+8);
        context.moveTo(x+18,y-8);
        context.lineTo(x+18,y+8);
        
        context.moveTo(x+110,y-8);
        context.lineTo(x+110,y+8);
        context.moveTo(x+118,y-8);
        context.lineTo(x+118,y+8);
        context.moveTo(x+128,y-8);
        context.lineTo(x+128,y+8);
        
        context.moveTo(x,y+62);
        context.lineTo(x,y+78);
        context.moveTo(x+8,y+62);
        context.lineTo(x+8,y+78);
        context.moveTo(x+18,y+62);
        context.lineTo(x+18,y+78);
        
        context.moveTo(x+110,y+62);
        context.lineTo(x+110,y+78);
        context.moveTo(x+118,y+62);
        context.lineTo(x+118,y+78);
        context.moveTo(x+128,y+62);
        context.lineTo(x+128,y+78);
    } else if(r==3) {
        context.moveTo(x+6,y-8);
        context.lineTo(x+6,y+8);
        context.moveTo(x+16,y-8);
        context.lineTo(x+16,y+8);
        
        context.moveTo(x+116,y-8);
        context.lineTo(x+116,y+8);
        context.moveTo(x+126,y-8);
        context.lineTo(x+126,y+8);
        
        context.moveTo(x+6,y+62);
        context.lineTo(x+6,y+78);
        context.moveTo(x+16,y+62);
        context.lineTo(x+16,y+78);
        
        context.moveTo(x+116,y+62);
        context.lineTo(x+116,y+78);
        context.moveTo(x+126,y+62);
        context.lineTo(x+126,y+78);
    } else if(r==2){
        context.moveTo(x+4,y-8);
        context.lineTo(x+4,y+8);
        context.moveTo(x+14,y-8);
        context.lineTo(x+14,y+8);
        
        context.moveTo(x+114,y-8);
        context.lineTo(x+114,y+8);
        context.moveTo(x+124,y-8);
        context.lineTo(x+124,y+8);
        
        context.moveTo(x+4,y+62);
        context.lineTo(x+4,y+78);
        context.moveTo(x+14,y+62);
        context.lineTo(x+14,y+78);
        
        context.moveTo(x+114,y+62);
        context.lineTo(x+114,y+78);
        context.moveTo(x+124,y+62);
        context.lineTo(x+124,y+78);
    } else if(r==1){
        context.moveTo(x+2,y-8);
        context.lineTo(x+2,y+8);
        context.moveTo(x+12,y-8);
        context.lineTo(x+12,y+8);
        
        context.moveTo(x+112,y-8);
        context.lineTo(x+112,y+8);
        context.moveTo(x+122,y-8);
        context.lineTo(x+122,y+8);
        
        context.moveTo(x+2,y+62);
        context.lineTo(x+2,y+78);
        context.moveTo(x+12,y+62);
        context.lineTo(x+12,y+78);
        
        context.moveTo(x+112,y+62);
        context.lineTo(x+112,y+78);
        context.moveTo(x+122,y+62);
        context.lineTo(x+122,y+78);
    } else{
        context.moveTo(x+110,y-8);
        context.lineTo(x+110,y+8);
        context.moveTo(x+120,y-8);
        context.lineTo(x+120,y+8);
        context.moveTo(x+128,y-8);
        context.lineTo(x+128,y+8);
        
        context.moveTo(x+110,y-8);
        context.lineTo(x+110,y+8);
        context.moveTo(x+120,y-8);
        context.lineTo(x+120,y+8);
        context.moveTo(x+128,y-8);
        context.lineTo(x+128,y+8);
        
        context.moveTo(x+110,y+62);
        context.lineTo(x+110,y+78);
        context.moveTo(x+120,y+62);
        context.lineTo(x+120,y+78);
        context.moveTo(x+128,y+62);
        context.lineTo(x+128,y+78);
        
        context.moveTo(x+110,y+62);
        context.lineTo(x+110,y+78);
        context.moveTo(x+120,y+62);
        context.lineTo(x+120,y+78);
        context.moveTo(x+128,y+62);
        context.lineTo(x+128,y+78);
    }
    
    context.stroke();

    if(debug){
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle =  "#1fb1d6";
        context.rect(x-16,y-8,157,85);
        context.stroke();
    }

}

function drawCrashedCar() {
    x=130;
    y=posX[Car['posX']]+90;

    context.rotate(-20 * Math.PI / 180);

    // Axes pour les roues
    context.lineWidth = 5;
    context.beginPath();
    context.strokeStyle =  "#f2eeed";
    context.moveTo(x+10,y);
    context.lineTo(x+10,y+20);
    context.moveTo(x+120,y)
    context.lineTo(x+120,y+20);
    context.moveTo(x+120,y+50);
    context.lineTo(x+120,y+70);

    context.moveTo(x+10,y+50);
    context.lineTo(x+15,y+70)

    context.stroke();

    // Carrosserie
    context.lineWidth = 10;
    context.strokeStyle =  "#db360f";
    context.fillStyle =  "#db360f";
    context.beginPath();
    context.rect(x, y+20, 120, 30);
    context.fill();
    context.moveTo(x+125,y+17);
    context.quadraticCurveTo(x+115, y+20+15, x+125, y+23+30);
    context.fill();
    context.stroke();

    // Intérieur
    context.lineWidth = 10;
    context.strokeStyle =  "#b54024";
    context.fillStyle =  "#b54024";
    context.beginPath();
    context.rect(x+50, y+25, 40, 20);
    context.fill();
    context.moveTo(x+90,y+25);
    context.quadraticCurveTo(x+120, y+35, x+90, y+45);
    context.fill();
    context.stroke();

    // Volant
    context.lineWidth = 2;
    context.strokeStyle =  "#363431";
    context.beginPath();
    context.moveTo(x+90,y+25);
    context.lineTo(x+90, y+45);
    context.moveTo(x+90,y+35);
    context.lineTo(x+110,y+35);
    context.lineTo(x+90,y+30);
    context.moveTo(x+110,y+35);
    context.lineTo(x+90,y+40);
    context.stroke();

    // Moteur
    context.beginPath();
    context.fillStyle =  "#363431";
    context.rect(x, y+20, 35, 30);
    context.rect(x-15, y+22, 15, 5);
    context.rect(x-15, y+43, 15, 5);
    context.fill();
    context.stroke();

    // Roues
    context.lineWidth = 15;
    context.strokeStyle =  "#363431";
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x+20,y);
    context.moveTo(x+110,y+70);
    context.lineTo(x+130,y+70);

    context.moveTo(x+4,y+70)
    context.lineTo(x+24,y+67);

    context.stroke();

    // Roue cassée
    context.beginPath();
    context.lineWidth = 6;
    context.arc(x+100, y, 8, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(x+100,y-10);
    context.lineTo(x+100,y+10);
    context.moveTo(x+95,y-5);
    context.lineTo(x+105,y+5);
    context.moveTo(x+95,y+5);
    context.lineTo(x+105,y-5);
    context.stroke();

    context.rotate(20 * Math.PI / 180);
}

function drawOpp() {  
    x=Opp['posY'];
    y=posX[Opp['posX']];

    // Axes pour les roues
    context.lineWidth = 5;
    context.beginPath();
    context.strokeStyle =  "#f2eeed";
    context.moveTo(x+10,y);
    context.lineTo(x+10,y+20);
    context.moveTo(x+10,y+70)
    context.lineTo(x+10,y+50);
    context.moveTo(x+120,y);
    context.lineTo(x+120,y+20);
    context.moveTo(x+120,y+70)
    context.lineTo(x+120,y+50);
    context.stroke();

    // Carrosserie
    context.lineWidth = 10;
    context.strokeStyle =  Opp['color']['ext'];
    context.fillStyle =  Opp['color']['ext'];
    context.beginPath();
    context.rect(x, y+20, 120, 30);
    context.fill();
    context.moveTo(x+120,y+20);
    context.quadraticCurveTo(x+150, y+35, x+120, y+50);
    context.fill();
    context.stroke();

    // Intérieur
    context.lineWidth = 10;
    context.strokeStyle =  Opp['color']['int'];
    context.fillStyle =  Opp['color']['int'];
    context.beginPath();
    context.rect(x+50, y+25, 40, 20);
    context.fill();
    context.moveTo(x+90,y+25);
    context.quadraticCurveTo(x+120, y+35, x+90, y+45);
    context.fill();
    context.stroke();

    // Volant
    context.lineWidth = 2;
    context.strokeStyle =  "#363431";
    context.beginPath();
    context.moveTo(x+90,y+25);
    context.lineTo(x+90, y+45);
    context.moveTo(x+90,y+35);
    context.lineTo(x+110,y+35);
    context.lineTo(x+90,y+30);
    context.moveTo(x+110,y+35);
    context.lineTo(x+90,y+40);
    context.stroke();

    // Moteur
    context.beginPath();
    context.fillStyle =  "#363431";
    context.rect(x, y+20, 35, 30);
    context.rect(x-15, y+22, 15, 5);
    context.rect(x-15, y+43, 15, 5);
    context.fill();
    context.stroke();

    // Roues
    context.lineWidth = 15;
    context.strokeStyle =  "#363431";
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x+20,y);
    context.moveTo(x,y+70);
    context.lineTo(x+20,y+70);
    context.moveTo(x+110,y);
    context.lineTo(x+130,y);
    context.moveTo(x+110,y+70);
    context.lineTo(x+130,y+70);
    context.stroke();
    
    // Roues lignes
    context.lineWidth = 2;
    context.strokeStyle =  "#403e3b";
    context.beginPath();

    r = n%5;
    if(r==4){
        context.moveTo(x,y-8);
        context.lineTo(x,y+8);
        context.moveTo(x+8,y-8);
        context.lineTo(x+8,y+8);
        context.moveTo(x+18,y-8);
        context.lineTo(x+18,y+8);
        
        context.moveTo(x+110,y-8);
        context.lineTo(x+110,y+8);
        context.moveTo(x+118,y-8);
        context.lineTo(x+118,y+8);
        context.moveTo(x+128,y-8);
        context.lineTo(x+128,y+8);
        
        context.moveTo(x,y+62);
        context.lineTo(x,y+78);
        context.moveTo(x+8,y+62);
        context.lineTo(x+8,y+78);
        context.moveTo(x+18,y+62);
        context.lineTo(x+18,y+78);
        
        context.moveTo(x+110,y+62);
        context.lineTo(x+110,y+78);
        context.moveTo(x+118,y+62);
        context.lineTo(x+118,y+78);
        context.moveTo(x+128,y+62);
        context.lineTo(x+128,y+78);
    } else if(r==3) {
        context.moveTo(x+6,y-8);
        context.lineTo(x+6,y+8);
        context.moveTo(x+16,y-8);
        context.lineTo(x+16,y+8);
        
        context.moveTo(x+116,y-8);
        context.lineTo(x+116,y+8);
        context.moveTo(x+126,y-8);
        context.lineTo(x+126,y+8);
        
        context.moveTo(x+6,y+62);
        context.lineTo(x+6,y+78);
        context.moveTo(x+16,y+62);
        context.lineTo(x+16,y+78);
        
        context.moveTo(x+116,y+62);
        context.lineTo(x+116,y+78);
        context.moveTo(x+126,y+62);
        context.lineTo(x+126,y+78);
    } else if(r==2){
        context.moveTo(x+4,y-8);
        context.lineTo(x+4,y+8);
        context.moveTo(x+14,y-8);
        context.lineTo(x+14,y+8);
        
        context.moveTo(x+114,y-8);
        context.lineTo(x+114,y+8);
        context.moveTo(x+124,y-8);
        context.lineTo(x+124,y+8);
        
        context.moveTo(x+4,y+62);
        context.lineTo(x+4,y+78);
        context.moveTo(x+14,y+62);
        context.lineTo(x+14,y+78);
        
        context.moveTo(x+114,y+62);
        context.lineTo(x+114,y+78);
        context.moveTo(x+124,y+62);
        context.lineTo(x+124,y+78);
    } else if(r==1){
        context.moveTo(x+2,y-8);
        context.lineTo(x+2,y+8);
        context.moveTo(x+12,y-8);
        context.lineTo(x+12,y+8);
        
        context.moveTo(x+112,y-8);
        context.lineTo(x+112,y+8);
        context.moveTo(x+122,y-8);
        context.lineTo(x+122,y+8);
        
        context.moveTo(x+2,y+62);
        context.lineTo(x+2,y+78);
        context.moveTo(x+12,y+62);
        context.lineTo(x+12,y+78);
        
        context.moveTo(x+112,y+62);
        context.lineTo(x+112,y+78);
        context.moveTo(x+122,y+62);
        context.lineTo(x+122,y+78);
    } else{
        context.moveTo(x+110,y-8);
        context.lineTo(x+110,y+8);
        context.moveTo(x+120,y-8);
        context.lineTo(x+120,y+8);
        context.moveTo(x+128,y-8);
        context.lineTo(x+128,y+8);
        
        context.moveTo(x+110,y-8);
        context.lineTo(x+110,y+8);
        context.moveTo(x+120,y-8);
        context.lineTo(x+120,y+8);
        context.moveTo(x+128,y-8);
        context.lineTo(x+128,y+8);
        
        context.moveTo(x+110,y+62);
        context.lineTo(x+110,y+78);
        context.moveTo(x+120,y+62);
        context.lineTo(x+120,y+78);
        context.moveTo(x+128,y+62);
        context.lineTo(x+128,y+78);
        
        context.moveTo(x+110,y+62);
        context.lineTo(x+110,y+78);
        context.moveTo(x+120,y+62);
        context.lineTo(x+120,y+78);
        context.moveTo(x+128,y+62);
        context.lineTo(x+128,y+78);
    }
    
    context.stroke();

    if(debug){
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle =  "#1fb1d6";
        context.rect(x-16,y-8,157,85);
        context.stroke();
    }
}

function drawCat(){
    x=Cat['posY'];
    y=posX[Cat['posX']];

    context.lineWidth = 5;
    context.strokeStyle =  Cat['color'];
    context.fillStyle =  Cat['color'];
    context.beginPath();
    context.rect(x, y+25, 45, 20);
    context.rect(x-25, y+22, 25, 25);
    context.moveTo(x+45,y+35);
    context.lineTo(x+65,y+35);
    context.moveTo(x+65,y+33);
    context.lineTo(x+75,y+33);
    context.moveTo(x-27,y+28);
    context.lineTo(x-27,y+40);
    context.fill();
    context.stroke();

    if(debug){
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle =  "#1fb1d6";
        context.rect(x-30,y+19,106,31);
        context.stroke();
    }
}

function drawBlood(){
    x=Cat['posY'];
    y=posX[Cat['posX']];

    context.lineWidth = 5;
    context.beginPath();
    context.strokeStyle =  "#e52b23";
    context.fillStyle =  "#e52b23";
    context.ellipse(x+17, y+34, 75, 40, 0, 0, 2 * Math.PI);
    context.rect(x+50, y, 45, 5);
    context.rect(x+50, y+65, 45, 5);
    context.fill();
    context.stroke();

    context.lineWidth = 5;
    context.strokeStyle =  Cat['color'];
    context.fillStyle =  Cat['color'];
    context.beginPath();
    context.rect(x, y+25, 45, 20);
    context.rect(x-25, y+22, 25, 25);
    context.moveTo(x+45,y+35);
    context.lineTo(x+65,y+35);
    context.moveTo(x+65,y+33);
    context.lineTo(x+75,y+33);
    context.moveTo(x-27,y+28);
    context.lineTo(x-27,y+40);
    context.moveTo(x+12,y+10);
    context.lineTo(x+12,y+25);
    context.moveTo(x+40,y+10);
    context.lineTo(x+40,y+25);
    context.moveTo(x+12,y+45);
    context.lineTo(x+12,y+60);
    context.moveTo(x+40,y+45);
    context.lineTo(x+40,y+60);
    context.fill();
    context.stroke();

    context.lineWidth = 1;
    context.beginPath();
    context.strokeStyle =  "#000000";
    context.moveTo(x-28,y+22);
    context.lineTo(x-20,y+30);
    context.moveTo(x-20,y+22);
    context.lineTo(x-28,y+30);
    context.moveTo(x-28,y+38);
    context.lineTo(x-20,y+46);
    context.moveTo(x-20,y+38);
    context.lineTo(x-28,y+46);
    context.stroke();

    if(debug){
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle =  "#1fb1d6";
        context.rect(x-30,y+10,106,49);
        context.stroke();
    }
}

function drawGiletJaune(){
    x=GJ['posY'];
    y=posX[GJ['posX']];

    context.lineWidth = 5;
    context.strokeStyle =  "#f7f74e";
    context.fillStyle =  "#f7f74e";
    context.beginPath();
    context.rect(x-25, y+22, 25, 25);
    context.rect(x-18, y+18, 11, 33);
    context.fill();
    context.stroke();

    context.strokeStyle =  "#cbcbc4";
    context.fillStyle =  "#cbcbc4";
    context.beginPath();
    context.moveTo(x-27,y+26);
    context.lineTo(x+2,y+26);
    context.moveTo(x-27,y+42);
    context.lineTo(x+2,y+42);
    context.fill();
    context.stroke();

    context.lineWidth = 5;
    context.strokeStyle =  GJ['color'];
    context.fillStyle =  GJ['color'];
    context.beginPath();
    context.rect(x-22, y+25, 19, 19);
    context.moveTo(x-23,y+28);
    context.lineTo(x-23,y+40);
    context.fill();
    context.stroke();

    if(debug){
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle =  "#1fb1d6";
        context.rect(x-29,y+15,32,39);
        context.stroke();
    }
}

function drawJusticeBienServie(){
    x=GJ['posY'];
    y=posX[GJ['posX']];

    //Flaque sang
    context.lineWidth = 5;
    context.beginPath();
    context.strokeStyle =  "#e52b23";
    context.fillStyle =  "#e52b23";
    context.ellipse(x-10, y+34, 75, 40, 0, 0, 2 * Math.PI); 
    if(!Car['crashed']){
        context.rect(x+23, y, 45, 5);
        context.rect(x+23, y+65, 45, 5);
    }
    context.fill();
    context.stroke();

    //Pantalon
    context.lineWidth = 9;
    context.strokeStyle =  "#5c7ca7";
    context.fillStyle =  "#5c7ca7";
    context.beginPath();
    context.moveTo(x-25,y+26);
    context.lineTo(x-60,y+20);
    context.moveTo(x-25,y+42);
    context.lineTo(x-65,y+42);
    context.fill();
    context.stroke();

    //Chaussure
    context.lineWidth = 9;
    context.strokeStyle =  "#7b571f";
    context.fillStyle =  "#7b571f";
    context.beginPath();
    context.moveTo(x-58,y+26);
    context.lineTo(x-54,y+12);
    context.moveTo(x-62,y+37);
    context.lineTo(x-62,y+52);
    context.fill();
    context.stroke();

    // Bras
    context.lineWidth = 5;
    context.strokeStyle =  "#f2c47c";
    context.fillStyle =  "#f2c47c";
    context.beginPath();
    context.rect(x-18, y+19, 14, 31);
    context.fill();
    context.stroke();

    //Tête
    context.beginPath();
    context.rect(x+15, y+25, 17, 19);
    context.fill();
    context.stroke();

    //Gilet Jaune (le jaune)
    context.strokeStyle =  "#f7f74e";
    context.fillStyle =  "#f7f74e";
    context.beginPath();
    context.rect(x-25, y+22, 36, 25);
    context.rect(x+11, y+27, 3, 15);
    context.rect(x, y+18, 11, 33);
    context.fill();
    context.stroke();

    //Gilet Jaune (les bandes)
    context.strokeStyle =  "#cbcbc4";
    context.fillStyle =  "#cbcbc4";
    context.beginPath();
    context.moveTo(x-7,y+26);
    context.lineTo(x+17,y+26);
    context.moveTo(x-7,y+42);
    context.lineTo(x+17,y+42);
    context.moveTo(x-18,y+20);
    context.lineTo(x-18,y+49);
    context.moveTo(x-5,y+20);
    context.lineTo(x-5,y+49);
    context.fill();
    context.stroke();

    //Cheuveux
    context.lineWidth = 7;
    context.strokeStyle =  GJ['color'];
    context.beginPath();
    context.moveTo(x+30,y+20);
    context.bezierCurveTo(x+36, y+25, x+36, y+44, x+30, y+49);
    context.stroke();

    //Yeux
    context.lineWidth = 1;
    context.beginPath();
    context.strokeStyle =  "#000000";
    context.moveTo(x+28,y+25);
    context.lineTo(x+20,y+33);
    context.moveTo(x+20,y+25);
    context.lineTo(x+28,y+33);
    context.moveTo(x+28,y+36);
    context.lineTo(x+20,y+44);
    context.moveTo(x+20,y+36);
    context.lineTo(x+28,y+44);
    context.stroke();

    //Sang
    context.lineWidth = 5;
    context.beginPath();
    context.strokeStyle =  "#e52b23";
    context.fillStyle =  "#e52b23";
    context.ellipse(x-10, y+34, 10, 2, 3, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.ellipse(x, y+40, 7, 1, -6, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.ellipse(x-10, y+24, 5, 1, 19, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    if(debug){
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle =  "#1fb1d6";
        context.rect(x-68,y+11,106,43);
        context.stroke();
    }
}

function drawMacron(){
    x=Macron['posY'];
    y=posX[Macron['posX']];

    context.drawImage(imgMacron, x, y+17);
    
    /*context.lineWidth = 5;
    context.strokeStyle =  Cat['color'];
    context.fillStyle =  Cat['color'];
    context.beginPath();
    context.rect(x, y+25, 45, 20);
    context.rect(x-25, y+22, 25, 25);
    context.moveTo(x+45,y+35);
    context.lineTo(x+65,y+35);
    context.moveTo(x+65,y+33);
    context.lineTo(x+75,y+33);
    context.moveTo(x-27,y+28);
    context.lineTo(x-27,y+40);
    context.fill();
    context.stroke();*/

    if(debug){
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle =  "#1fb1d6";
        context.rect(x-1,y+15,31,36);
        context.stroke();
    }
}

//Draw

function drawCarC(){
    if(Car['crashed']){
        drawCrashedCar();
    } else {
        drawCar();
    }
}

function drawOppC(){

    if(Opp['init']){
        drawOpp();
    }

}

function drawCatC(){
    if(Cat['init']){
        if(Cat['dead']){
            drawBlood();
        } else {
            drawCat();
        }
    }
}

function drawGJC(){
    if(GJ['init']){
        if(GJ['dead']){
            drawJusticeBienServie();
        } else {
            drawGiletJaune();
        }
    }
}

function drawMacronC(){
    if(Macron['init']){
        drawMacron();
    }
}

//Controls

document.onkeydown = function(event) {
    event = event || window.event;
    event.preventDefault();

    switch(event.keyCode){
        case 38:
            updateCar("up");
            break;
        case 40:
            updateCar("down");
            break;
        case 74:
            Car['crashedByOpp'] = true;
    }
}

function updateCar(dir){

    if(!Car['crashed']){

        if(dir == "up" && Car['posX'] > 0){
            Car['posX']--;
            drawCar();
        } else if(dir == "down" && Car['posX'] < 3){
            Car['posX']++;
            drawCar();
        }
    }

}

// Game

function initGame(){

    initPlan();

    tick();
}

function tick(){

    n++;
    updateSocre();

    initOpp();
    initCat();
    initGJ();
    initMacron();

    initLine();
    remakePlan();

    testCrashCar();
    testDeadCat();
    testGJ();
    testMacron();
    testInvincible();

    drawCatC();
    drawGJC();
    drawMacronC();
    drawOppC();
    drawCarC();

    if(!(n%20)){
        if(tickTime>10) tickTime--;
        else if(accel<20) accel++;
    }
    
    if(!(n%50)){
        if(accelApp<5){
            accelApp++;
        }
    }


    if(!Car['crashed']){
        setTimeout(tick, tickTime);
    }
}

function initOpp(){

    if(!Opp['init']){
        r = Math.floor(Math.random() * (appOpp-accelApp));
        if(!r){
            do{
                pos = Math.floor(Math.random() * 4);
            } while((Macron['init'] && pos==Macron['posX'])||(Cat['init'] && pos==Cat['posX'])||(GJ['init'] && pos==GJ['posX']));

            c = Math.floor(Math.random() * 3);
            Opp['init'] = true;
            Opp['posX'] = pos;
            Opp['posY'] = 1000;
            Opp['color'] = Color[c];
        }

    } else {
        if(Opp['posY'] < -500){
            Opp['init'] = false;
        } else {
            Opp['posY'] -= (10+accel);
        }
    }

}

function initCat(){

    if(!Cat['init']){
        r = Math.floor(Math.random() * (appCat-accelApp));
        if(!r){
            do{
                pos = Math.floor(Math.random() * 4);
            } while((Opp['init'] && pos==Opp['posX'])||(Macron['init'] && pos==Macron['posX'])||(GJ['init'] && pos==GJ['posX']));

            c = Math.floor(Math.random() * 3);
            Cat['init'] = true;
            Cat['posX'] = pos;
            Cat['posY'] = 1000;
            Cat['color'] = ColorCat[c];
            Cat['dead'] = false;
        }

    } else {
        if(Cat['posY'] < -50){
            Cat['init'] = false;
            if(!Cat['dead']) scoreNb-=50;
        } else {
            Cat['posY'] -= (50+accel);
        }
    }

}

function initGJ(){

    if(!GJ['init']){
        r = Math.floor(Math.random() * (appGJ-accelApp));
        if(!r){
            do{
                pos = Math.floor(Math.random() * 4);
            } while((Opp['init'] && pos==Opp['posX'])||(Cat['init'] && pos==Cat['posX'])||(Macron['init'] && pos==Macron['posX']));

            c = Math.floor(Math.random() * 3);
            GJ['init'] = true;
            GJ['posX'] = pos;
            GJ['posY'] = 1000;
            GJ['color'] = ColorGJ[c];
            GJ['dead'] = false;
        }

    } else {
        if(GJ['posY'] < -200){
            GJ['init'] = false;
        } else {
            GJ['posY'] -= (50+accel);
        }
    }

}

function initMacron(){

    if(!Macron['init'] && timeInvicible==0){
        r = Math.floor(Math.random() * (appGJ-accelApp));
        if(!r){ 
            do{
                pos = Math.floor(Math.random() * 4);
            } while((Opp['init'] && pos==Opp['posX'])||(Cat['init'] && pos==Cat['posX'])||(GJ['init'] && pos==GJ['posX']));

            Macron['init'] = true;
            Macron['posX'] = pos;
            Macron['posY'] = 1000;
        }

    } else {
        if(Macron['posY'] < -200){
            Macron['init'] = false;
        } else {
            Macron['posY'] -= (50+accel);
        }
    }

}

function testCrashCar(){
    if(Opp['init']){
        if(Opp['posX'] == Car['posX'] && Opp['posY'] > 110 && Opp['posY'] < 400){
            Car['crashedByOpp'] = true;
            Car['crashed'] = true;
        }
    }
}

function testDeadCat(){
    if(Cat['init'] && !Cat['dead']){
        if(Cat['posX'] == Car['posX'] && Cat['posY'] > 180 && Cat['posY'] < 410){
            Cat['dead'] = true;
        }
    }
}

function testGJ(){
    if(GJ['init'] && !GJ['dead']){
        if(GJ['posX'] == Car['posX'] && GJ['posY'] > 240 && GJ['posY'] < 410){
            GJ['dead'] = true;
            if(!Car['invicibleToGiletJaune']){
                Car['crashedByGiletJaune'] = true;
                Car['crashed'] = true;
            } else {
                scoreNb+=75;
            }
        }
    }
}

function testMacron(){
    if(Macron['init']){
        if(Macron['posX'] == Car['posX'] && Macron['posY'] > 210 && Macron['posY'] < 380){
            Macron['init'] = false;
            scoreNb+=100;
            Car['invicibleToGiletJaune'] = true;
            timeInvicible = 200;
        }
    }
}

function testInvincible(){
    if(timeInvicible>0){
        timeInvicible--;
        if(timeInvicible==0){
            Car['invicibleToGiletJaune'] = false;
        }
    }
}

function updateSocre(){
    if(scoreNb<0) scoreNb = 0;
    if(!(n%10)){
        scoreNb++;
    }
    score.innerHTML = scoreNb;
    invincible.innerHTML = timeInvicible;
}

var canvas = document.getElementById("jeu");
var context = canvas.getContext("2d");
var score = document.getElementById("score");
var imgMacron = document.getElementById("mcr");
var invincible = document.getElementById("invincible");
var middle = canvas.height / 2 + 2;
var n = 0;
var scoreNb = 0;
var len = 30;
var blue = {
    ext: "#0f3edb",
    int: "#2435b5"
}
var green = {
    ext: "#22a703",
    int: "#039009"
}
var yellow = {
    ext: "#e8e817",
    int: "#a7b135"
}
var Color = {
    0: blue,
    1: green,
    2: yellow
}
var ColorCat = {
    0: "#ffb33c",
    1: "#202529",
    2: "#c0cdd6"
}
var ColorGJ = {
    0: "#4b3f16",
    1: "#d6d64c",
    2: "#d47f52"
}
var posX = {
    0: 89,
    1: 174,
    2: 265,
    3: 350
};
var Car = {
    posX: 2,
    crashed: false,
    crashedByOpp: false,
    crashedByGiletJaune: false,
    invicibleToGiletJaune: false
}
var Opp = {
    init: false,
    posX: 1,
    posY: 1,
    color: blue
}
var Cat = {
    init: false,
    posX: 1,
    posY: 1,
    dead: false,
    color: ""
}
var GJ = {
    init: false,
    posX: 1,
    posY: 1,
    dead: false,
    color: ""
}
var Macron = {
    init: false,
    posX: 1,
    posY: 1
}
var tickTime = 100;
var appOpp = 10;
var appCat = 50;
var appGJ = 50;
var appMacron = 100;
var accel = 0;
var accelApp = 0;
var timeInvicible = 0;
var debug = false;

initGame();