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
            lineX: 200,
            lineY: 120
        },
        {
            txt: '',
            size: 80,
            align: 'left',
            color: 'red',
            lineX: 200,
            lineY: 450
        }
    ]
}

function setMemeTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
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

function incraseMemeSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++;
}

function decraseMemeSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--;
}

function setLineUp(){
    gMeme.lines[gMeme.selectedLineIdx].lineY--;
}

function setLineDown(){
    gMeme.lines[gMeme.selectedLineIdx].lineY++;
}


function switchLine(){
    gMeme.selectedLineIdx === 1 ? gMeme.selectedLineIdx = 0 : gMeme.selectedLineIdx = 1;
    console.log(gMeme.selectedLineIdx);
    
}