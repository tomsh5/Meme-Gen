'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme;
var gCurrLineIdx = 0;
var gClearTxtFrame = false;
var prevLine;
var currLine;

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
    if (gCurrLineIdx === 0) {
        currLine = gCurrMeme.lines[0]
        prevLine = gCurrMeme.lines[1]
    }
    else if (gCurrLineIdx === 1) {
        prevLine = gCurrMeme.lines[0]
        currLine = gCurrMeme.lines[1]
    }

    var currImg = imges[gCurrMeme.selectedImgId - 1].url;
    drawImg(currImg, currLine, prevLine);
}

function drawImg(img, currLine, prevLine) {

    var elImg = new Image();
    elImg.src = img;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText(currLine.txt, currLine.lineX, currLine.lineY, currLine.size, currLine.font);
        drawText(prevLine.txt, prevLine.lineX, prevLine.lineY, prevLine.size, prevLine.font);
        if (!gClearTxtFrame){
        drawRect(currLine.lineX - 200, currLine.lineY-90);
        }
    }
}

function drawText(text, x, y, size, font) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = size + 'px ' + font;
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function drawRect(x, y) {
    gCtx.beginPath();
    gCtx.rect(x, y, 500, 100);
    // gCtx.rect(x-75, y-75, 150, 150);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function onAddText(txt) {
    setMemeTxt(txt);
    renderMeme();
}

function onUpdateMeme(elImg) {

    document.querySelector('.gallery-container').style.visibility = 'hidden';
    document.querySelector('.canvas-container').style.visibility = 'visible';
    document.querySelector('#meme-txt').value = '';
    setMeme(elImg.id);
    CleanMemesTxt();
    var meme = getMeme();
    gCurrMeme = meme;
    gCurrLineIdx = 0;
    meme.selectedLineIdx = 0;
    renderMeme();
}

function onChangeSize(elBtn){
    setLineSize(elBtn.id);
    renderMeme();
}


function onLineMove(elBtn) {
    setLinePos(elBtn.id)
    renderMeme();
}

function onSwitchLine() {
    switchLine();
    document.querySelector('#meme-txt').value = '';
    gCurrLineIdx === 0 ? gCurrLineIdx = 1 : gCurrLineIdx = 0;
    renderMeme();
}

function onSetFont(val){
    var font = val.toString();
    console.log(font);
    SetFont(font);
    renderMeme();
}