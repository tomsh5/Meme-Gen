'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme;

function init() {
    gElCanvas = document.getElementById('meme-canvas');
    gCtx = gElCanvas.getContext('2d');

    gElCanvas.width = 500;
    gElCanvas.height = 500;
    gCtx.fillStyle = 'red';
    renderGallery()
}

function renderGallery() {
    var imges = getImges();
    var strHTML = '';
    var newImeges = imges.map(img =>
        `<img src=${img.url} id =${img.id} onclick="onUpdateMeme(this)">`);
    strHTML = newImeges.join('');
    document.querySelector('.gallery-container').innerHTML = strHTML;
}

function renderMeme() {
    var imges = getImges();

    drawImg(imges[gCurrMeme.selectedImgId - 1].url, gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt,
         gCurrMeme.lines[gCurrMeme.selectedLineIdx].size, gCurrMeme.lines[gCurrMeme.selectedLineIdx].lineX,
          gCurrMeme.lines[gCurrMeme.selectedLineIdx].lineY);
}

function drawImg(img, txt, txtSize, x, y) {
    var elImg = new Image();
    elImg.src = img;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
        if (txt) drawText(txt, x, y, txtSize);
    }
}

function drawText(text, x, y, size) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = size + 'px IMPACT';
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onAddText(txt) {
    setMemeTxt(txt);
    renderMeme();
}

function onUpdateMeme(elImg) {
    setMeme(elImg.id);
    setMemeTxt('');
    var meme = getMeme();
    gCurrMeme = meme;
    renderMeme();
}

function onIncrase() {
    incraseMemeSize();
    renderMeme();
}

function onDecrase() {
    decraseMemeSize();
    renderMeme();
}
//Todo: one func for incrase/decrase

function onLineUp(){
    setLineUp();
    renderMeme();
}


function onLineDown(){
    setLineDown();
    renderMeme();
}
//Todo: one func for up/down

function onSwitchLine(){
    switchLine();
    renderMeme();
}