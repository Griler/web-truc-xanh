import {Tween} from "./Tween.js";
import GameBoard from "./Entity/GameBoard.js";

let duration = 0.2;
var isAnimating = 0;
const anamtionController = new Tween();
const img = ["./asset/Ahri.png", "./asset/Akali.png",
    "./asset/Aphelios.png", "./asset/Jhin.png", "./asset/Kaisa.png",
    "./asset/Kayn.png", "./asset/Lux.png", "./asset/Sona.png", "./asset/Viego.png", "./asset/Yasuo.png"];
const imgPicklist = [...img, ...img];
const tileCount = imgPicklist.length;
let coins = 10000;
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;
let positionLeft = [215, 331, 447, 563, 99, 215, 331, 447, 563, 99, 215, 331, 447, 563, 99, 215, 331, 447, 563, 99];
let positionTop = [10, 10, 10, 10, 10, 136, 136, 136, 136, 136, 262, 262, 262, 262, 262, 388, 388, 388, 388, 388];
const coinsElement = document.createElement("div")

function backGround() {
    document.body.style.background = "url(./img-1.webp)"
    document.body.style.backgroundSize = "cover"
    document.body.style.margin = "0"
}

function coinDraw() {
    coinsElement.style.color = "yellow";
    coinsElement.innerHTML = `coins: ${coins}`
    coinsElement.style.fontSize = '25px'
    coinsElement.style.alignContent = 'center'
    coinsElement.style.justifyContent = 'center'
    coinsElement.style.display = 'grid'
    return coinsElement;
}

function btnDraw() {
    const btnElement = document.createElement("button");
    btnElement.style.background = '#ffffff';
    btnElement.style.borderRadius = '8px';
    btnElement.style.borderWidth = '0px';
    btnElement.style.color = '#d53333';
    btnElement.style.fontSize = '14px';
    btnElement.style.fontWeight = '500';
    btnElement.innerHTML = "RESET"
    btnElement.style.fontFamily = '"Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif';
    btnElement.onclick = function () {
        resetButton()
    };
    return btnElement;
}

function tableDraw() {
    const tableElement = document.createElement("table");
    tableElement.style.display = "grid";
    tableElement.style.width = '200px';
    tableElement.style.height = '100px'
    tableElement.style.gridTemplateAreas = "a1 b1"
    tableElement.style.gridGap = "2px"
    tableElement.style.textAlign = "center"
    tableElement.style.margin = "auto"
    tableElement.appendChild(btnDraw())
    tableElement.appendChild(coinDraw())
    document.body.appendChild(tableElement);
}

function eventClickCard(element, color) {
    if (isAnimating === 2) {
        return;
    }
    anamtionController.flip(element, color, duration);
    isAnimating += 1;
    const revealed = element.getAttribute("data-revealed");
    if (awaitingEndOfMove
        || revealed === "true"
        || element == activeTile
    ) {
        isAnimating = 1;
        return;
    }
    if (!activeTile) {
        activeTile = element;
        return;
    }
    const colorToMatch = activeTile.getAttribute("data-color");
    if (colorToMatch === color) {
        setTimeout(() => {
            anamtionController.zoomOut(element, activeTile, duration)
            element.setAttribute("data-revealed", "true");
            activeTile.setAttribute("data-revealed", "true");
            coins += 1000;
            coinsElement.innerHTML = `coins: ${coins}`
            activeTile = null;
            awaitingEndOfMove = false;
            revealedCount += 2;
            setTimeout(() => isAnimating = 0, 1000);
        }, 1000);
        setTimeout(() => {
            if (revealedCount === tileCount) {
                alert("You win! Refresh to start again.");
                window.location.reload()
            }
        }, 2200)
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
        isAnimating = 0;
        setTimeout(() => {
            if (coins <= 0) {
                alert("You lose! Refresh to start again.");
                window.location.reload()
            }
        }, 1000);
    }, 1200);
}

function resetButton() {
    let rs = window.confirm('Do you want reset game !')
    if (rs) {
        window.location.reload();
    } else {
        return 0;
    }
}

function gameStart() {
    backGround();
    let gameBoard = new GameBoard();
    gameBoard.buildBoardGame(tileCount, imgPicklist)
    anamtionController.dealerCard(positionTop, positionLeft)
    setTimeout(() => {
        gameBoard.children.forEach((child, index) => child.addEventListener('click',
            () => eventClickCard(child, imgPicklist[index])))
    }, 2000);
    tableDraw()
}

export {gameStart}