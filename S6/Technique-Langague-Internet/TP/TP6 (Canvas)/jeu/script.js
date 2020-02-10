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

var Ecuries = [Ferrari,Honda,Renault,Lotus,Toyota,McLaren,Mercedes,AlfaRomeo];

width = 400;
height = 200;
widthDash = 1000;
heightDash = 300;
var content = document.getElementById("content");

var content1;
var content2;
var race;
var view;
var all;
var opp;
var oil;
var pneu;
var gas;
var dash;

var Ecurie;
var Ecurie2;
var speed;
var rpm;
var gas;


function displayEcuries(){

    Ecuries.forEach(function(element){
        content.appendChild(displayEcurie(element));
    })

}

function displayEcurie(element){

    var link = document.createElement("a");
    link.setAttribute("href","jeu.html?id="+element['id']);
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width",width);
    canvas.setAttribute("height",height);
    canvas.setAttribute("class","carDisplay");

    var context = canvas.getContext("2d");

    drawEcurie(element,context)

    link.appendChild(canvas);
    return link;
}

function drawEcurie(ecurie,ctx){
    drawFond(ctx);
    drawCar(14,130,ecurie,ctx);
}

function drawFond(ctx){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle =  "#99d7ef";
    ctx.fillStyle =  "#99d7ef";
    ctx.rect(0, 0, width, height);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle =  "#4b4b4b";
    ctx.fillStyle =  "#4b4b4b";
    ctx.rect(0, 195, width, 10);
    ctx.fill();
    ctx.stroke();
}

function drawCar(x,y,ecurie,ctx){

    drawEngine(x,y,ctx);
    drawCockpit(x+21,y+20,ecurie,ctx);
    drawCoque(x+21,y+20,ecurie,ctx);

    drawLogo(x+280,y+28,10,ecurie,ctx);
    drawRoue(x+63,y+37,24,ecurie,ctx);
    drawRoue(x+245,y+39,21,ecurie,ctx);
}

function drawCockpit(x,y,ecurie,ctx){

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(x+176, y-10);
    ctx.lineTo(x+210, y);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle =  "#363431";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x+175, y-15);
    ctx.lineTo(x+177, y);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle =  "rgba(20, 145, 195, 0.67)";
    ctx.fillStyle =  "rgba(20, 145, 195, 0.67)";
    ctx.beginPath();
    ctx.moveTo(x+230,y+5);
    ctx.bezierCurveTo(x+220, y+5, x+210, y-10, x+165, y-22);
    ctx.bezierCurveTo(x+165, y-22, x+175, y+5, x+165, y+5);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}

function drawCoque(x,y,ecurie,ctx){

    /*grd = ctx.createLinearGradient(18.000, 0.000, 282.000, 200.000);

    grd.addColorStop(0.000, ecurie['princ']);
    grd.addColorStop(0.500, ecurie['princ']);
    grd.addColorStop(0.501, ecurie['logo']);
    grd.addColorStop(0.550, ecurie['logo']);
    grd.addColorStop(0.551, ecurie['princ']);
    grd.addColorStop(1.000, ecurie['princ']);*/
    
    grd = ctx.createRadialGradient(222.000, 150.000, 0.000, 150.000, 150.000, 150.000);
      
      // Add colors
      grd.addColorStop(0.000, ecurie['princ']);
      grd.addColorStop(0.420, ecurie['princ']);
      grd.addColorStop(0.430, ecurie['logo']);
      grd.addColorStop(0.500, ecurie['logo']);
      grd.addColorStop(0.510, ecurie['princ']);
      grd.addColorStop(1.000, ecurie['princ']);

    ctx.fillStyle =  grd;
    ctx.strokeStyle =  ecurie['logo'];
    ctx.lineWidth = 2;


    ctx.beginPath();
    ctx.moveTo(x+179,y+24);
    ctx.lineTo(x-4,y+24);
    ctx.lineTo(x-4,y-4);
    ctx.lineTo(x+30,y-4);
    ctx.bezierCurveTo(x+35, y-15, x+40, y-17, x+120, y-27);
    ctx.bezierCurveTo(x+115, y-27, x+115, y-4, x+120, y-4);
    ctx.lineTo(x+178,y-4);
    ctx.bezierCurveTo(x+185, y-4, x+275, y, x+295, y+10);
    ctx.bezierCurveTo(x+298, y+12, x+298, y+20, x+295, y+22);
    ctx.bezierCurveTo(x+295, y+22, x+290, y+24, x+179, y+24);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}

function drawEngine(x,y,ctx){

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle =  "#dedede";
    ctx.moveTo(x+16,y+20);
    ctx.lineTo(x+9,y+8);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle =  "#585754";
    ctx.fillStyle =  "#585754";
    ctx.lineWidth = 6;
    ctx.rect(x+26, y+10, 75, 15);
    ctx.rect(x+33, y+4, 61, 10);
    ctx.fill();
    ctx.moveTo(x+30,y+11);
    ctx.lineTo(x+1,y+5);
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle =  "#767574";
    ctx.fillStyle =  "#989898";
    for(i=0;i<4;i++){
        ctx.beginPath();
        ctx.arc(x+42+i*14, y+10, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    } 
}

function drawLogo(x,y,t,ecurie,ctx){
    ctx.beginPath();
    ctx.strokeStyle =  ecurie['logo'];
    ctx.fillStyle =  ecurie['logo'];
    ctx.lineWidth = 1;
    ctx.rect(x, y, t, t);
    ctx.moveTo(x,y+t);
    ctx.quadraticCurveTo(x+t/2, y+t*1.5, x+t, y+t);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.font = "22px 'f1'";

    ctx.fillStyle =  "rgba(0, 0, 0, 0.72)";
    ctx.fillText(ecurie['name'],171,166);

    ctx.fillStyle =  ecurie['logo'];
    ctx.fillText(ecurie['name'],172,167);

    ctx.strokeStyle =  ecurie['sec'];
    ctx.fillStyle =  ecurie['sec'];
    ctx.beginPath();
    ctx.arc(x+t/2, y+t/2, t/2-2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function drawRoue(x,y,r,ecurie,ctx){
    ctx.beginPath();
    ctx.strokeStyle =  "#363431";
    ctx.fillStyle =  "#363431";
    ctx.lineWidth = 12;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(x,y-r-5);
    ctx.lineTo(x,y+r+5);
    ctx.moveTo(x-r-5,y);
    ctx.lineTo(x+r+5,y);
    ctx.moveTo(x-r+5,y-r+7);
    ctx.lineTo(x+r-5,y+r-7);
    ctx.moveTo(x+r-5,y-r+7);
    ctx.lineTo(x-r+5,y+r-7);
    ctx.stroke();

    c = Math.floor(Math.random() * 100)* Math.PI;
    offset = ((r/21)+2)*2+c;

    ctx.beginPath();
    ctx.strokeStyle =  ecurie['logo'];
    ctx.lineWidth = 2;
    ctx.arc(x, y, r, (offset+0.2) * Math.PI, (offset+0.9) * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, r, (offset+1.2) * Math.PI, (offset+1.9) * Math.PI);
    ctx.stroke();
}

function drawCarGame(x,y,plan,ecurie) {  
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
    plan.strokeStyle =  ecurie['princ'];
    plan.fillStyle =  ecurie['princ'];
    plan.beginPath();
    plan.rect(x, y+20, 120, 30);
    plan.fill();
    plan.moveTo(x+120,y+20);
    plan.quadraticCurveTo(x+150, y+35, x+120, y+50);
    plan.fill();
    plan.stroke();

    // Intérieur
    plan.lineWidth = 10;
    plan.strokeStyle =  ecurie['sec'];
    plan.fillStyle =  ecurie['sec'];
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
}

function drawCrashedCar(x,y,plan,ecurie) {

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
    plan.strokeStyle =  ecurie['princ'];
    plan.fillStyle =  ecurie['princ'];
    plan.beginPath();
    plan.rect(x, y+20, 120, 30);
    plan.fill();
    plan.moveTo(x+125,y+17);
    plan.quadraticCurveTo(x+115, y+20+15, x+125, y+23+30);
    plan.fill();
    plan.stroke();

    // Intérieur
    plan.lineWidth = 10;
    plan.strokeStyle =  ecurie['sec'];
    plan.fillStyle =  ecurie['sec'];
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

    plan.beginPath();
    plan.lineWidth = 10;
    plan.moveTo(x,y);
    plan.lineTo(x+250,y);
    plan.moveTo(x,y+70);
    plan.lineTo(x+250,y+70);
    plan.stroke();
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
}

function drawEcurieDash(ecurie,ctx){

    speed = 3;
    rpm = 5.6;
    gas = 13;

    drawFond2(ctx);

    drawPareBrise(ctx);
    drawCoque2(ecurie,ctx);
    drawBoard(ecurie,ctx);

    drawGasGauge(380,170,ecurie,ctx);
    drawRPMGauge(620,170,ecurie,ctx);
    drawGearSpeed(ctx,speed);
    drawVolant(ecurie,ctx);
}

function drawFond2(ctx){

    len = 10;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle =  "#295814";
    ctx.fillStyle =  "#295814";
    ctx.rect(0, heightDash/7, widthDash, heightDash-heightDash/7);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle =  "#4b4b4b";
    ctx.fillStyle =  "#4b4b4b";
    ctx.moveTo(0,heightDash);
    ctx.lineTo(widthDash/3,heightDash/7);
    ctx.lineTo(widthDash-widthDash/3,heightDash/7);
    ctx.lineTo(widthDash,heightDash);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle =  "#e5e5e5";
    ctx.moveTo(0,heightDash);
    ctx.lineTo(widthDash/3,heightDash/7);
    ctx.moveTo(widthDash-widthDash/3,heightDash/7);
    ctx.lineTo(widthDash,heightDash);
    ctx.stroke();
    for(i=0;i<=((heightDash-heightDash/7)/len);i++){
        if(i%3){
            ctx.beginPath();
            ctx.lineWidth = 40-i;
            ctx.moveTo(widthDash/2,heightDash-i*len);
            ctx.lineTo(widthDash/2,heightDash-(i+1)*len);
            ctx.stroke();
        }
    }

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle =  "#99d7ef";
    ctx.fillStyle =  "#99d7ef";
    ctx.rect(0, 0, widthDash, heightDash/7);
    ctx.fill();
    ctx.stroke();
}

function drawPareBrise(ctx){

    ctx.strokeStyle = "rgba(20, 145, 195, 0.67)";
    ctx.fillStyle = "rgba(20, 145, 195, 0.67)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100,150);
    ctx.bezierCurveTo(200, -20, widthDash-200, -20, widthDash-100, 150);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}

function drawCoque2(ecurie,ctx){
    ctx.beginPath();
    ctx.strokeStyle = ecurie['princ'];
    ctx.fillStyle = ecurie['princ'];

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-150,heightDash);
    ctx.bezierCurveTo(20, 20, widthDash-20, 20, widthDash+150, heightDash);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "#2e2e2e";
    ctx.lineWidth = 3;

    sep = 50;

    for(i=0;i<5;i++){
        ctx.beginPath();
        ctx.moveTo(-150+i*sep,heightDash+i*sep);
        ctx.bezierCurveTo(20, 20+i*sep, widthDash-20, 20+i*sep, widthDash+150-i*sep, heightDash+i*sep);
        ctx.stroke();
    }
}

function drawBoard(ecurie,ctx){
    ctx.beginPath();
    ctx.strokeStyle = ecurie['sec'];
    ctx.fillStyle = ecurie['sec'];

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(320,heightDash);
    ctx.bezierCurveTo(300, heightDash, 300, heightDash-200, 320, heightDash-200);
    ctx.bezierCurveTo(320, heightDash-215, 680, heightDash-215, 680, heightDash-200);
    ctx.bezierCurveTo(700, heightDash-200, 700, heightDash, 680, heightDash);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#2e2e2e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(320,heightDash);
    ctx.bezierCurveTo(300, heightDash, 300, heightDash-200, 320, heightDash-200);
    ctx.bezierCurveTo(320, heightDash-215, 680, heightDash-215, 680, heightDash-200);
    ctx.bezierCurveTo(700, heightDash-200, 700, heightDash, 680, heightDash);
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
    pos = translateToGas(gas);
    drawGasHand(ctx, pos, radius*0.52, radius*0.03);
    ctx.restore();
}

function translateToGas(gas){
    u = gas/50;
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

function drawGasHand(ctx, pos, length, widthDash) {
    ctx.strokeStyle = "#ededed";
    ctx.beginPath();
    ctx.lineWidth = widthDash;
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
    pos = translateToRPM(rpm);
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

function drawRPMHand(ctx, pos, length, widthDash) {
    ctx.strokeStyle = "#ededed";
    ctx.beginPath();
    ctx.lineWidth = widthDash;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawGearSpeed(ctx,speed){
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
    ctx.fillText(speed,484,154);
    ctx.stroke();
}

function drawVolant(ecurie,ctx){
    ctx.beginPath();
    ctx.strokeStyle = "#2e2e2e";
    ctx.lineWidth = 30;
    ctx.arc(500, 295, 120, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(390,270);
    ctx.lineTo(610,270);
    ctx.moveTo(500,270);
    ctx.lineTo(500,300);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = ecurie['logo'];
    ctx.lineWidth = 5;
    ctx.arc(500, 270, 18, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function initPlan(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#4b4b4b";
    ctx.fillRect(0, 0, content1.width, content1.height);
    ctx.fillStyle = "#295814";
    ctx.fillRect(0, 0, content1.width, 70);
    ctx.fillRect(0, content1.height-70, content1.width, 70);

    ctx.fillStyle = "#e5e5e5";
    ctx.fillRect(0, 70, content1.width, 5);
    ctx.fillRect(0, content1.height-70, content1.width, 5);
    ctx.stroke();
}

function drawFondPresentation(ctx){
    ctx.beginPath();
    ctx.fillStyle = "#4b4b4b";
    ctx.fillRect(0, 0, content2.width, content2.height);
    ctx.fillStyle = "#295814";
    ctx.fillRect(0, 0, content2.width, 25);

    ctx.fillStyle = "#e5e5e5";
    ctx.fillRect(0, 25, content2.width, 5);
    ctx.stroke();
}

function initLine(ctx){

    lenLine = 30;
    middle = content1.height / 2 + 2;

    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.fillStyle = "#4b4b4b";
    ctx.fillRect(0, middle, content1.width, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#e5e5e5";
    nbOfLine = (content1.width / lenLine) + 10;

    for(i=0;i<nbOfLine;i++){
        if(i%2){
            ctx.fillRect(i*lenLine, middle, lenLine, 5);
        }
    }

    ctx.stroke();
}

function initRules(){
    displayEcuries();

    content1 = document.getElementById("race");
    content2 = document.getElementById("view");
    var content3 = document.getElementById("opp");
    var content4 = document.getElementById("oil");
    var content5 = document.getElementById("pneu");
    var content6 = document.getElementById("gas");
    var content7 = document.getElementById("dash");

    race = content1.getContext("2d");
    view = content2.getContext("2d");
    opp = content3.getContext("2d");
    oil = content4.getContext("2d");
    pneu = content5.getContext("2d");
    gas = content6.getContext("2d");
    dash = content7.getContext("2d");

    r = Math.floor(Math.random() * 8);
    Ecurie = Ecuries[r];
    Ecurie2 = Ecuries[(r+2)%8];

    drawRules();
}

function drawRules(){
    initPlan(race);
    drawFondPresentation(view);
    drawFondPresentation(opp);
    drawFondPresentation(oil);
    drawFondPresentation(pneu);
    drawFondPresentation(gas);

    initLine(race);
    drawCarGame(270,100,race,Ecurie);
    drawCarGame(220,230,race,Ecurie2);

    drawCarGame(70,44,view,Ecurie);

    drawCrashedCar(-25,95,opp,Ecurie);
    drawCarGame(150,40,opp,Ecurie2);

    drawOil(20,44,oil);
    drawCarGame(155,44,oil,Ecurie);

    drawPneu(150,46,pneu);

    drawGas(146,46,gas);

    drawEcurieDash(Ecurie,dash);
}