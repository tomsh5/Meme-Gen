'use strict';
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: './img/1.jpg', keywords: ['happy'] }, { id: 2, url: './img/2.jpg', keywords: ['sad'] }];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function setMemeTxt(text){
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function getImges() {
    var imges = gImgs;
    return imges;
}

function setMeme(id){
gMeme.selectedImgId = id;
}

function getMeme(){
return gMeme;
}

