export class Node { // entity

    constructor() {
        this._x = 100;
        this._y = 100;
        this._width = 100;
        this._height = 100;
        this._scaleX = 1;
        this.elm = this._createElement();
        this.children = [];
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
        this.elm.style.left = this._x + "px";
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
        this.elm.style.top = this._y + "px";
    }

    set scaleX(value) {
        this._scaleX = value;
        this.elm.style.transform = `scale(${value},1)`
    }

    get scaleX() {
        return this._scaleX;
    }

    _createElement() {
        let tile = document.createElement("div");
        return tile;
    }

    addChild(entity) {
        entity.parent = this;
        this.children.push(entity);
        this.elm.appendChild(entity);
    }

    removeChild(node) {
        // todo
    }
}
export default Node