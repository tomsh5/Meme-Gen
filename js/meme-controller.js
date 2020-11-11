'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme;
var gCurrLineIdx = 0;
var gClearTxtFrame = true;
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
    document.querySelector('.image-gallery').innerHTML = strHTML;
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
            drawText(currLine);
        }
        else if (!prevPrevLine) {
            drawText(prevLine);
            drawText(currLine);

        }
        else {
            drawText(prevLine);
            drawText(currLine);
            drawText(prevPrevLine);
        }
    }
}

function drawText(line) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = line.sColor;
    gCtx.fillStyle = line.color;
    gCtx.font = line.size + 'px ' + line.font;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.lineX, line.lineY);
    gCtx.strokeText(line.txt, line.lineX, line.lineY);
}

function drawRect(x, y) {
    gCtx.beginPath();
    gCtx.rect(x, y, 500, 100);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function onAddText(txt) {
    setMemeTxt(txt);
    renderMeme();
}

function onUpdateMeme(elImg) {
    document.querySelector('#meme-txt').value = '';
    setMeme(elImg.id);
    CleanMemesTxt();
    var meme = getMeme();
    gCurrMeme = meme;
    gCurrLineIdx = 0;
    meme.selectedLineIdx = 0;
    document.querySelector('.meme-editor').toggleAttribute("hidden");
    document.querySelector('.gallery').toggleAttribute("hidden");
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

function onSetFillColor(color) {
    setFillColor(color);
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
        switchLine()
        renderMeme();
    }
}

function removeFrame() {
    gClearTxtFrame = true;
    renderMeme();
}



function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    removeFrame()
    elLink.download = 'my-meme';
}

function onGallery() {
    document.querySelector('.meme-editor').toggleAttribute("hidden");
    document.querySelector('.gallery').toggleAttribute("hidden");
}