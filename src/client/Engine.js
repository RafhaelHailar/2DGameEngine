class Engine {
    static MODE={
        DEV:"dev",
        PREVIEW:"preview"
    }
    _mode=Engine.MODE.DEV;
    constructor(canvas) {
        this.canvas=canvas;
        this.context=canvas.get2DContext();
        window.addEventListener("keydown", async () => {
            await fetch("/event/keydown");
        });
        this.updateMainDisplay();
    }
    setMode(mode) {
        this._mode = mode;
        this.updateMainDisplay();
    }
    updateMainDisplay(){
        //TODO: draw tool kits for devs
        if (this._mode === Engine.MODE.DEV) {
            this.context.fillRect(0, 0, 150, 150);
        }
    }
}

export function createEngine(canvas) {
    return new Engine(canvas);
}