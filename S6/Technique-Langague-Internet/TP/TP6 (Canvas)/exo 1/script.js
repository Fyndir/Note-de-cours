0function ligne() {
    var id = document.getElementById("ligne");
    var context = id.getContext("2d");
    context.strokeStyle =  "#a31a69";
    context.lineWidth = 10;
    context.moveTo(0,0);
    context.lineTo(300,400);
    context.moveTo(300,0);
    context.lineTo(0,400);
    context.stroke();
}

function cercle() {
    var id = document.getElementById("cercle");
    var context = id.getContext("2d");
    context.strokeStyle =  "#5a1aa3";
    context.lineWidth = 10;
    context.beginPath();
    context.arc(150, 150, 30, 0, 2 * Math.PI);
    context.stroke();
}

function arc() {
    var id = document.getElementById("arc");
    var context = id.getContext("2d");
    context.strokeStyle =  "#5a1aa3";
    context.lineWidth = 10;
    context.beginPath();
    context.arc(200, 150, 100, Math.PI, 1.5 * Math.PI);
    context.stroke();
}

function rectangle() {
    var id = document.getElementById("rectangle");
    var context = id.getContext("2d");
    context.strokeStyle =  "#5a1aa3";
    context.lineWidth = 10;
    context.beginPath();
    context.rect(100, 150, 150, 100);
    context.stroke();
}

function courbequadratique() {
    var id = document.getElementById("courbequadratique");
    var context = id.getContext("2d");
    context.strokeStyle =  "#5a1aa3";
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(10,20);
    context.quadraticCurveTo(100, 150, 210, 20);
    context.stroke();
}

function courbebezier() {
    var id = document.getElementById("courbebezier");
    var context = id.getContext("2d");
    context.strokeStyle =  "#5a1aa3";
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(10,20);
    context.bezierCurveTo(10, 150, 210, 150, 210, 20);
    context.stroke();
}

function courbebezier2() {
    var id = document.getElementById("courbebezier2");
    var context = id.getContext("2d");
    context.strokeStyle =  "#5a1aa3";
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(10,20);
    context.bezierCurveTo(30, 150, 210, 180, 210, 20);
    context.stroke();
}

function elipse() {
    var id = document.getElementById("elipse");
    var context = id.getContext("2d");
    context.strokeStyle =  "#5a1aa3";
    context.lineWidth = 10;
    context.beginPath();
    context.ellipse(150, 150, 100, 50, 0, 0, 2 * Math.PI);
    context.stroke();
}

function elipse_s_f() {
    var id = document.getElementById("elipse_s_f");
    var context = id.getContext("2d");
    context.strokeStyle =  "#5a1aa3";
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(10,220);
    context.bezierCurveTo(10, 400, 210, 400, 210, 220);
    context.bezierCurveTo(210, 40, 10, 40, 10, 220);
    context.stroke();
}

ligne();
arc();
cercle();
rectangle();
courbequadratique();
courbebezier();
courbebezier2();
elipse();
elipse_s_f();