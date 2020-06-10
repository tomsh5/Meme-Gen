'use strict';

var gElCanvas;
var gCtx;

function init(){
gElCanvas = document.getElementById('meme-canvas');
gCtx = gElCanvas.getContext('2d');

gElCanvas.width = 800;
gElCanvas.height = 550;
gCtx.fillStyle = 'red';
// gCtx.fillRect(0,0, 50, 50);

drawImg(gImgs[0].url);

}


function drawImg(img, txt) {
    var elImg = new Image();
    elImg.src = img;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
        if (txt) drawText(txt, 200, 120);
    }
}

function drawText(text, x, y) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '80px IMPACT';
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


var text = document.querySelector('#meme-txt').value;
console.log(text);

function onAddText(txt){
    drawImg(gImgs[0].url, txt);
}
