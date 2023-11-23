import Node from './Node.js';
import Card from './Card.js';

class GameBoard extends Node {
    constructor() {
        super();
    }
    render() {
        this.elm.style.margin = '10px auto';
        this.elm.style.width = 'max-content'
        this.elm.style.height = '650px'
        this.elm.style.display = 'grid';
        this.elm.style.gap = '16px';
        this.elm.style.boxSizing = 'border-box';
    }
    buildBoardGame(tileCount,colorsPicklist) {
        this.render();
        for (let i = 0; i < tileCount; i++) {
            const color = colorsPicklist[i];
            const card = new Card(color, i);
            this.addChild(card.elm);
        }
        document.body.appendChild(this.elm)
    }
}

export default GameBoard;