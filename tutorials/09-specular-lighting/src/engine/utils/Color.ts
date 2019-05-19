export default class Color {

    r: number;
    g: number;
    b: number;

    constructor(r: number, g?: number, b?: number) {
        if (g && b) { this.r = r; this.g = g; this.b = b; }
        else {
            this.r = ((r & 0xFF0000) >> 16) / 255.0;
            this.g = ((r &   0xFF00) >>  8) / 255.0;
            this.b =  (r &     0xFF)        / 255.0;
        }
    }

    setHex(hex: number) {
        this.r = ((hex & 0xFF0000) >> 16) / 255.0;
        this.g = ((hex &   0xFF00) >>  8) / 255.0;
        this.b = ((hex &     0xFF)      ) / 255.0;
    }

    setRGB(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

}