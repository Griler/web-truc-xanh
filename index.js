let lastTime;

function gameLoop(timeStamp) {
    lastTime = lastTime || timeStamp;
    let dt = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;
    update(dt);
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

import {Node} from './Node.js'
import {Tween} from "./tween.js";

const anamtionController = new Tween();
const card = new Node();
document.body.style.background = "url(./img-1.webp)"
document.body.style.backgroundSize = "cover"
document.body.style.margin = "0"
const tilesContainer = document.querySelector(".tiles");
const styleContainer = document.getElementById("tiles");

function drawStyleContainer() {
    //styleContainer.style.position = "static";
    styleContainer.style.margin = '10px auto';
    styleContainer.style.width = 'max-content'
    styleContainer.style.height = '650px'
    styleContainer.style.display = 'grid';
    styleContainer.style.gap = '16px';
    styleContainer.style.boxSizing = 'border-box';
}

drawStyleContainer();

const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal", "red", "white"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;
let coins = 10000;
// Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;
const coinsElement = document.getElementById("coins")

function coinDraw() {
    coinsElement.style.color = "yellow";
    coinsElement.innerHTML = `coins: ${coins}`
    coinsElement.style.fontSize = '25px'
    coinsElement.style.alignContent = 'center'
    coinsElement.style.justifyContent = 'center'
    coinsElement.style.display = 'grid'
}
coinDraw()
function btnDraw(){
    const btnElement = document.getElementById("button");
    btnElement.style.background = '#ffffff';
    btnElement.style.borderRadius = '8px';
    btnElement.style.borderWidth = '0px';
    btnElement.style.color = '#d53333';
    btnElement.style.fontSize = '14px';
    btnElement.style.fontWeight = '500';
    btnElement.style.fontFamily = '"Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif';
    //tableElement.appendChild(btnElement)
}
btnDraw()
const tableElement = document.getElementById("table");
function tableDraw() {
     tableElement.style.display = "grid";
     tableElement.style.width = '200px';
     tableElement.style.height ='100px'
     tableElement.style.gridTemplateAreas = "a1 b1"
     tableElement.style.gridGap = "2px"
     tableElement.style.textAlign = "center"
    tableElement.style.margin = "auto"
}
tableDraw()
let isUpdating = new Array(20).fill(false);
let duration = 0.2;
let timer = 0;
let isFinished = new Array(20).fill(true);
let state = new Array(20).fill("scaleDown");

//const element = card._createElement();
function buildTile(color, idx) {
    const element = card._createElement();
    element.classList.add("tile");
    element.style.transform = `scale(${card.scaleX},1)`
    element.style.textAlign = 'center'
    element.style.zIndex = `${idx}`
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");
    /*    element.addEventListener("click", () => {
                click(element, color);
            });*/
    return element;
}

let i = 0;

function buildGrid() {
    for (i; i < tileCount ; i++) {
        //const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
        const color = colorsPicklist[i];
        const tile = buildTile(color, i);
       // colorsPicklist.splice(randomIndex, 1);
        tilesContainer.appendChild(tile);
    }
}

function click(element, color) {
    anamtionController.flip(element, color, duration);
    const revealed = element.getAttribute("data-revealed");
    if (
        awaitingEndOfMove
        || revealed === "true"
        || element == activeTile
    ) {
        return;
    }
    if (!activeTile) {
        activeTile = element;
        return;
    }
    const colorToMatch = activeTile.getAttribute("data-color");
    if (colorToMatch === color) {
        setTimeout(() => {
            anamtionController.zoomOut(element,activeTile)
            element.setAttribute("data-revealed", "true");
            activeTile.setAttribute("data-revealed", "true");
            coins += 1000;
            coinsElement.innerHTML = `coins: ${coins}`
            activeTile = null;
            awaitingEndOfMove = false;
            revealedCount += 2;
        }, 1000);
        if (revealedCount === tileCount) {
            alert("You win! Refresh to start again.");
            window.location.reload()
        }
        return;
    }
    awaitingEndOfMove = true;
    coins -= 500;
    coinsElement.innerHTML = `coins: ${coins}`
    console.log(coins)
    setTimeout(() => {
        element.style.background = "url(./imgCard.png)";
        element.style.backgroundSize = "cover";
        activeTile.style.background = "url(./imgCard.png)";
        activeTile.style.backgroundSize = "cover"
        awaitingEndOfMove = false;
        activeTile = null;
        if (coins <= 0) {
            alert("You lose! Refresh to start again.");
            window.location.reload()
        }
    }, 1000);
}

function resetButton() {
    let rs = window.confirm('Do you want reset game !')
    if (rs) {
        window.location.reload();
    } else {
        return 0;
    }
}

let btnRs = document.getElementById("button")
const element = document.getElementsByClassName('tile')
let index;
let pos1, pos2;
let j = 0, k = 1;
let positionLeft = [215, 331, 447, 563, 99, 215, 331, 447, 563, 99, 215, 331, 447, 563, 99, 215, 331, 447, 563, 99];
let positionTop = [10, 10, 10, 10, 10, 136, 136, 136, 136, 136, 262, 262, 262, 262, 262, 388, 388, 388, 388, 388];

function takePosition(j) {
    pos1 = element[j].offsetLeft;
    pos2 = element[j].offsetTop;
    positionLeft.push(pos1)
    positionTop.push(pos2)
}

function update(dt) {
    buildGrid()
    if (k === 1) {
        anamtionController.dealerCard(positionTop, positionLeft, colorsPicklist)
        k++;
    }
    for (let j = 0; j < element.length; j++) {
        element[j].onclick = function () {
            {
                takePosition(j)
                index = j;
                click(element[j], element[j].getAttribute("data-color"))
            }
        }
    }
    btnRs.onclick = function () {
        resetButton()
    };
}