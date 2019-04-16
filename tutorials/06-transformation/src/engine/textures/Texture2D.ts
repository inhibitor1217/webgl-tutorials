import Texture from 'engine/textures/Texture';

export default class Texture2D extends Texture {

    constructor(gl: WebGL2RenderingContext) {
        super(gl);
        this._textureType = this._gl.TEXTURE_2D;
    }

}