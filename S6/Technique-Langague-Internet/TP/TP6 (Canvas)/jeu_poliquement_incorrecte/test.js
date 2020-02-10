var Ferrari = {
    princ: "#db360f",
    sec: "#b54024",
    logo: "#e0e01c",
    name: "Ferrari"
}
var Honda = {
    princ: "#7915dd",
    sec: "#59189a",
    logo: "#b54024",
    name: "Honda"
}
var Renault = {
    princ: "#0a4390",
    sec: "#092750",
    logo: "#e0e01c",
    name: "Renault"
}
var Lotus = {
    princ: "#21860e",
    sec: "#1b6a0c",
    logo: "#e0e01c",
    name: "Lotus"
}
var Toyota = {
    princ: "#f4f4f4",
    sec: "#b54024",
    logo: "#b54024",
    name: "Toyota"
}
var McLaren = {
    princ: "#e0e01c",
    sec: "#b2be31",
    logo: "#575757",
    name: "McLaren"
}
var Mercedes = {
    princ: "#4e4e4e",
    sec: "#383838",
    logo: "#c4c4c4",
    name: "Mercedes"
}
var AlfaRomeo = {
    princ: "#f4f4f4",
    sec: "#e6e6e6",
    logo: "#092750",
    name: "Alfa Romeo"
}

var Ecurie = [Ferrari,Honda,Renault,Lotus,Toyota,McLaren,Mercedes,AlfaRomeo];
var 

width = 1000;
height = 300;


function displayEcuries(){

    Ecurie.forEach(function(element){
        content.appendChild(displayEcurie(element));
    })

}

function displayEcurie(element){

    var link = document.createElement("a");
    link.setAttribute("href","#");
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width",width);
    canvas.setAttribute("height",height);

    var context = canvas.getContext("2d");

    drawEcurie(element,context)

    link.appendChild(canvas);
    return link;
}

/*function displayEcurie(element){

    var link = document.createElement("a");
    link.setAttribute("href","#");
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width",width);
    canvas.setAttribute("height",height);

    var context = canvas.getContext("2d");

    drawEcurie(element,context)

    link.appendChild(canvas);
    content.appendChild(link);
}*/

function drawEcurie(ecurie,ctx){

    speed = 7;

    drawFond(ctx);

    drawPareBrise(ctx);
    drawCoque(ecurie,ctx);
    drawBoard(ecurie,ctx);

    drawGasGauge(380,170,ecurie,ctx);
    drawRPMGauge(620,170,ecurie,ctx);
    drawGearSpeed(ctx,speed);
    drawVolant(ecurie,ctx);
}

function drawFond(ctx){

    len = 10;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle =  "#295814";
    ctx.fillStyle =  "#295814";
    ctx.rect(0, height/7, width, height-height/7);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle =  "#4b4b4b";
    ctx.fillStyle =  "#4b4b4b";
    ctx.moveTo(0,height);
    ctx.lineTo(width/3,height/7);
    ctx.lineTo(width-width/3,height/7);
    ctx.lineTo(width,height);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle =  "#e5e5e5";
    ctx.moveTo(0,height);
    ctx.lineTo(width/3,height/7);
    ctx.moveTo(width-width/3,height/7);
    ctx.lineTo(width,height);
    ctx.stroke();
    for(i=0;i<=((height-height/7)/len);i++){
        if(i%3){
            ctx.beginPath();
            ctx.lineWidth = 40-i;
            ctx.moveTo(width/2,height-i*len);
            ctx.lineTo(width/2,height-(i+1)*len);
            ctx.stroke();
        }
    }

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle =  "#99d7ef";
    ctx.fillStyle =  "#99d7ef";
    ctx.rect(0, 0, width, height/7);
    ctx.fill();
    ctx.stroke();
}

function drawPareBrise(ctx){
    
    ctx.strokeStyle = "rgba(20, 145, 195, 0.67)";
    ctx.fillStyle = "rgba(20, 145, 195, 0.67)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100,150);
    ctx.bezierCurveTo(200, -20, width-200, -20, width-100, 150);
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
    ctx.moveTo(-150,height);
    ctx.bezierCurveTo(20, 20, width-20, 20, width+150, height);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "#2e2e2e";
    ctx.lineWidth = 3;

    sep = 50;

    for(i=0;i<5;i++){
        ctx.beginPath();
        ctx.moveTo(-150+i*sep,height+i*sep);
        ctx.bezierCurveTo(20, 20+i*sep, width-20, 20+i*sep, width+150-i*sep, height+i*sep);
        ctx.stroke();
    }
}

function drawBoard(ecurie,ctx){
    ctx.beginPath();
    ctx.strokeStyle = ecurie['sec'];
    ctx.fillStyle = ecurie['sec'];

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(320,height);
    ctx.bezierCurveTo(300, height, 300, height-200, 320, height-200);
    ctx.bezierCurveTo(320, height-215, 680, height-215, 680, height-200);
    ctx.bezierCurveTo(700, height-200, 700, height, 680, height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#2e2e2e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(320,height);
    ctx.bezierCurveTo(300, height, 300, height-200, 320, height-200);
    ctx.bezierCurveTo(320, height-215, 680, height-215, 680, height-200);
    ctx.bezierCurveTo(700, height-200, 700, height, 680, height);
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
    gas = 25;
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

function drawGasHand(ctx, pos, length, width) {
    ctx.strokeStyle = "#ededed";
    ctx.beginPath();
    ctx.lineWidth = width;
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
    rpm = 1;
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

function drawRPMHand(ctx, pos, length, width) {
    ctx.strokeStyle = "#ededed";
    ctx.beginPath();
    ctx.lineWidth = width;
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

function drawVolantTurn(ecurie,ctx,b){
    
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
    
    if(b){
        ctx.rotate(0.15*Math.PI);
    }  else {
        ctx.rotate(-0.15*Math.PI);
    }
    
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

var content = document.getElementById("content");
displayEcuries();

//displayEcurie(Ferrari);

