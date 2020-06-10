'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme;

function init(){
gElCanvas = document.getElementById('meme-canvas');
gCtx = gElCanvas.getContext('2d');

gElCanvas.width = 500;
gElCanvas.height = 500;
gCtx.fillStyle = 'red';
renderGallery()
}

function renderGallery(){
    var imges = getImges();
    var strHTML = '';
    var newImeges = imges.map(img=>
    `<img src=${img.url} id =${img.id} onclick="onUpdateMeme(this)">`);
    strHTML= newImeges.join('');
    document.querySelector('.gallery-container').innerHTML = strHTML;
}

function renderMeme(){
    var imges = getImges();

    drawImg(imges[gCurrMeme.selectedImgId -1].url, gCurrMeme.lines[0].txt);
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

function onAddText(txt){
    setMemeTxt(txt);
    renderMeme();
}

function onUpdateMeme(elImg){
    setMeme(elImg.id);
    var meme = getMeme();
    gCurrMeme = meme;
    renderMeme();
}
