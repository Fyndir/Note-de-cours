function image() {
  var id = document.getElementById("image");
  var context = id.getContext("2d");
  var img = new Image();
  img.src = "800px-Detailaufnahme_Weihnachtsstern_-_groß.bmp";
  img.onload = function() {
    context.drawImage(img, 0, 0, id.width, id.height);
  }
}

function imageRotate() {
  var id = document.getElementById("imageRotate");
  var context = id.getContext("2d");
  var img = new Image();
  img.src = "800px-Detailaufnahme_Weihnachtsstern_-_groß.bmp";
  img.onload = function() {
    context.rotate(10*Math.PI/180);
    context.drawImage(img, 200, 0, id.width, id.height);
  }
}

function imageScale() {
  var id = document.getElementById("imageScale");
  var context = id.getContext("2d");
  var img = new Image();
  img.src = "800px-Detailaufnahme_Weihnachtsstern_-_groß.bmp";
  img.onload = function() {
    context.scale(0.5, 0.5);
    context.drawImage(img, 200, 0, id.width, id.height);
  }
}

function imageTranslate() {
  var id = document.getElementById("imageTranslate");
  var context = id.getContext("2d");
  var img = new Image();
  img.src = "800px-Detailaufnahme_Weihnachtsstern_-_groß.bmp";
  img.onload = function() {
    context.drawImage(img, 0, 0, id.width, id.height);
    context.translate(200, 200);
    context.drawImage(img, 0, 0, id.width, id.height);
  }
}

function imageTransform() {
  var id = document.getElementById("imageTransform");
  var context = id.getContext("2d");
  var img = new Image();
  img.src = "800px-Detailaufnahme_Weihnachtsstern_-_groß.bmp";
  img.onload = function() {
    context.drawImage(img, 0, 0, 400, 600);
    context.transform(0.5, 0.5, -0.5, 0.5, 300,10);
    context.drawImage(img, 0, 0, id.width, id.height);
  }
}

image();
imageRotate();
imageScale();
imageTranslate();
imageTransform();