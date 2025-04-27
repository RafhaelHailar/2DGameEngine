class GameCanvas {
    #canvas;
    size;
    constructor (name) {
        this.name = name;
        this.#canvas = document.createElement("canvas");
        this.#canvas.setAttribute("id", name);
    }
    setSize(width,height) {
        this.#canvas.width = width;
        this.#canvas.height = height;        
    }
    mount() {
        document.body.appendChild(this.#canvas);
        window.addEventListener("keydown", async () => {
            await fetch("/event/keydown");
        });
    }
}

export function createCanvas(name) {
    const canvas = new GameCanvas(name);
    canvas.mount();
    return canvas;
}