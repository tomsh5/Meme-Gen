'use strict';
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: './img/1.jpg', keywords: ['happy'] }, { id: 2, url: './img/2.jpg', keywords: ['sad'] }];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: '',
            size: 80,
            align: 'left',
            color: 'red',
            font: 'IMPACT',
            lineX: 200,
            lineY: 120
        },
        {
            txt: '',
            size: 80,
            align: 'left',
            color: 'red',
            font: 'IMPACT',
            lineX: 200,
            lineY: 450
        }
    ]
}

function setMemeTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}


function CleanMemesTxt(){
    gMeme.lines[0].txt = '';
    gMeme.lines[1].txt = '';
}

function getImges() {
    var imges = gImgs;
    return imges;
}

function setMeme(id) {
    gMeme.selectedImgId = id;
}

function getMeme() {
    return gMeme;
}

function setLineSize(id){
    if (id === 'incrase-font-size'){
        gMeme.lines[gMeme.selectedLineIdx].size++;
    }
    else if(id === 'decrase-font-size'){
        gMeme.lines[gMeme.selectedLineIdx].size--;
    }
}

function setLinePos(id){
    if (id === 'line-up'){
        gMeme.lines[gMeme.selectedLineIdx].lineY--;
    }
    else if(id === 'line-down'){
        gMeme.lines[gMeme.selectedLineIdx].lineY++;
    }
}

function switchLine(){
    gMeme.selectedLineIdx === 1 ? gMeme.selectedLineIdx = 0 : gMeme.selectedLineIdx = 1;
}

function SetFont(font){
    gMeme.lines[gMeme.selectedLineIdx].font = font;

}