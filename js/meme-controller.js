'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme;
var gCurrLineIdx = 0;
var gClearTxtFrame = false;
var prevLine;
var prevPrevLine;
var currLine;
var activeLine = 1;

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
    var currImg = imges[gCurrMeme.selectedImgId - 1].url;

    switch (activeLine) {
        case 1:
            currLine = gCurrMeme.lines[0];
            drawImg(currImg, currLine);
            break;
        case 2:
            if (gCurrLineIdx === 0) {
                currLine = gCurrMeme.lines[0];
                prevLine = gCurrMeme.lines[1];
            }
            else if (gCurrLineIdx === 1) {
                currLine = gCurrMeme.lines[1];
                prevLine = gCurrMeme.lines[0];
            }
            drawImg(currImg, currLine, prevLine);
            break;
        case 3:
            if (gCurrLineIdx === 0) {
                currLine = gCurrMeme.lines[0];
                prevLine = gCurrMeme.lines[2];
                prevPrevLine = gCurrMeme.lines[1];
            }
            else if (gCurrLineIdx === 1) {
                currLine = gCurrMeme.lines[1];
                prevLine = gCurrMeme.lines[0];
                prevPrevLine = gCurrMeme.lines[2];
            }
            else if (gCurrLineIdx === 2) {
                currLine = gCurrMeme.lines[2];
                prevLine = gCurrMeme.lines[1];
                prevPrevLine = gCurrMeme.lines[0];
            }
            drawImg(currImg, currLine, prevLine, prevPrevLine);
            break;
    }
}

function drawImg(img, currLine, prevLine, prevPrevLine) {

    var elImg = new Image();
    elImg.src = img;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
        if (!gClearTxtFrame) {
            drawRect(0, currLine.lineY - 90);
        }

        if (!prevLine && !prevPrevLine) {
            drawText(currLine.txt, currLine.lineX, currLine.lineY, currLine.size, currLine.font, currLine.color, currLine.sColor, currLine.align);
        }
        else if (!prevPrevLine) {
            drawText(prevLine.txt, prevLine.lineX, prevLine.lineY, prevLine.size, prevLine.font, prevLine.color, prevLine.sColor, prevLine.align);
            drawText(currLine.txt, currLine.lineX, currLine.lineY, currLine.size, currLine.font, currLine.color, currLine.sColor, currLine.align);

        }
        else {
            drawText(prevLine.txt, prevLine.lineX, prevLine.lineY, prevLine.size, prevLine.font, prevLine.color, prevLine.sColor, prevLine.align);
            drawText(currLine.txt, currLine.lineX, currLine.lineY, currLine.size, currLine.font, currLine.color, currLine.sColor, currLine.align);
            drawText(prevPrevLine.txt, prevPrevLine.lineX, prevPrevLine.lineY, prevPrevLine.size, prevPrevLine.font, prevPrevLine.color, prevPrevLine.sColor, prevPrevLine.align);
        }
    }
}

function drawText(text, x, y, size, font, color, sColor, align) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = sColor;
    gCtx.fillStyle = color;
    gCtx.font = size + 'px ' + font;
    gCtx.textAlign = align;
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

function onChangeSize(elBtn) {
    setLineSize(elBtn.id);
    renderMeme();
}


function onLineMove(elBtn) {
    setLinePos(elBtn.id)
    renderMeme();
}

function onSwitchLine() {
    if (activeLine === 1) {
        return;
    }
    else if (activeLine === 2) {
        switchLine();
        document.querySelector('#meme-txt').value = '';
        gCurrLineIdx === 0 ? gCurrLineIdx = 1 : gCurrLineIdx = 0;
        renderMeme();
    }
    else if (activeLine === 3) {
        switchLine();
        document.querySelector('#meme-txt').value = '';
        switch (gCurrLineIdx) {
            case 0:
                gCurrLineIdx = 1;
                document.querySelector('#meme-txt').value = '';
                renderMeme();
                break;
            case 1:
                gCurrLineIdx = 2;
                document.querySelector('#meme-txt').value = '';
                renderMeme();
                break;
            case 2:
                gCurrLineIdx = 0;
                document.querySelector('#meme-txt').value = '';
                renderMeme();
                break;
        }

    }

}

function onSetFont(val) {
    var font = val.toString();
    SetFont(font);
    renderMeme();
}


function onChangeColor(elBtn) {
    setColor(elBtn)
    renderMeme();
}

function onChangeAlign(elBtn) {
    setAlign(elBtn.id)
    renderMeme();
}

function onRemoveLine() {
    removeLine()
    document.querySelector('#meme-txt').value = '';
    renderMeme();
}

function onAddLine() {
    if (activeLine < 3) {
        activeLine++;
        renderMeme();
    }
}

function removeFrame() {
    gClearTxtFrame = true;
    renderMeme();
}

function onDownloadCanvas(elLink) {
    gClearTxtFrame = true;
    renderMeme();
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my_img';
}