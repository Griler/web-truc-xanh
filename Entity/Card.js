import {Node} from "./Node.js";

class Card extends Node {
    constructor(color, index) {
        super();
        this.elm.classList.add("tile");
        this.elm.style.textAlign = 'center';
        this.elm.style.zIndex = `${index}`;
        this.elm.setAttribute("data-color", color);
        this.elm.setAttribute("data-revealed", "false");
        this.elm.style.position = "fixed"
        this.elm.style.width = "100px";
        this.elm.style.height = "100px";
        this.elm.style.background = "url(./imgCard.png)";
        this.elm.style.backgroundSize = "cover"
        this.elm.style.cursor = "pointer"
        this.elm.style.border = "2px solid #444444"
        this.elm.style.top = '30%'
        this.elm.style.left = '46%'
        return this;
    }

}

export default Card;