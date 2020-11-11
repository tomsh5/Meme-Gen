'use strict';
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: './img/1.jpg', keywords: ['happy'] },
    { id: 2, url: './img/2.jpg', keywords: ['sad'] },
    { id: 3, url: './img/3.jpg', keywords: ['sad'] },
    { id: 4, url: './img/4.jpg', keywords: ['sad'] },
    { id: 5, url: './img/5.jpg', keywords: ['sad'] },
    { id: 6, url: './img/6.jpg', keywords: ['sad'] },
    { id: 7, url: './img/7.jpg', keywords: ['sad'] },
    { id: 8, url: './img/8.jpg', keywords: ['sad'] },
    { id: 9, url: './img/9.jpg', keywords: ['sad'] },
    { id: 10, url: './img/10.jpg', keywords: ['sad'] },
    { id: 11, url: './img/11.jpg', keywords: ['sad'] },
    { id: 12, url: './img/12.jpg', keywords: ['sad'] },
    { id: 13, url: './img/13.jpg', keywords: ['sad'] },
    { id: 14, url: './img/14.jpg', keywords: ['sad'] },
    { id: 15, url: './img/15.jpg', keywords: ['sad'] },
    { id: 16, url: './img/16.jpg', keywords: ['sad'] },
    { id: 17, url: './img/17.jpg', keywords: ['sad'] },
    { id: 18, url: './img/18.jpg', keywords: ['sad'] },
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: '',
            size: 80,
            align: 'center',
            color: 'white',
            sColor: 'black',
            font: 'IMPACT',
            lineX: 200,
            lineY: 90
        },
        {
            txt: '',
            size: 80,
            align: 'center',
            color: 'white',
            sColor: 'black',
            font: 'IMPACT',
            lineX: 200,
            lineY: 480
        },
        {
            txt: '',
            size: 80,
            align: 'center',
            color: 'white',
            sColor: 'black',
            font: 'IMPACT',
            lineX: 200,
            lineY: 270
        }
    ]
}

function setMemeTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}


function CleanMemesTxt() {
    gMeme.lines[0].txt = '';
    gMeme.lines[1].txt = '';
    gMeme.lines[2].txt = '';
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

function setLineSize(id) {
    if (id === 'incrase-font-size') {
        gMeme.lines[gMeme.selectedLineIdx].size++;
    }
    else if (id === 'decrase-font-size') {
        gMeme.lines[gMeme.selectedLineIdx].size--;
    }
}

function setLinePos(id) {
    if (id === 'line-up') {
        gMeme.lines[gMeme.selectedLineIdx].lineY--;
    }
    else if (id === 'line-down') {
        gMeme.lines[gMeme.selectedLineIdx].lineY++;
    }
}

function switchLine() {

    switch (gMeme.selectedLineIdx) {
        case 0:
            gMeme.selectedLineIdx = 1;
            break;
        case 1:
            gMeme.selectedLineIdx = 2;
            break;
        case 2:
            gMeme.selectedLineIdx = 0;
            break;
    }
}

function SetFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function setColor(color) {
    if (color.id === 'color') {
        gMeme.lines[gMeme.selectedLineIdx].color = color.value;
    }
    else if (color.id === 's-color') {
        gMeme.lines[gMeme.selectedLineIdx].sColor = color.value;
    }
}

function setFillColor(color) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.color.fill = color;
}

function setAlign(id) {
    if (id === 'align-left') {
        gMeme.lines[gMeme.selectedLineIdx].align = 'left';
        gMeme.lines[gMeme.selectedLineIdx].lineX = 10;
    }
    else if (id === 'align-center') {
        gMeme.lines[gMeme.selectedLineIdx].align = 'center';
        gMeme.lines[gMeme.selectedLineIdx].lineX = 260;
    }
    else if (id === 'align-right') {
        gMeme.lines[gMeme.selectedLineIdx].align = 'right';
        gMeme.lines[gMeme.selectedLineIdx].lineX = 490;
    }
}

function removeLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
}