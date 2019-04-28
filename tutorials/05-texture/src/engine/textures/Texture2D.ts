import global from 'global';

export default class Texture2D {

    _gl: WebGL2RenderingContext;
    _texture: WebGLTexture;
    _image: HTMLImageElement;
    _deleted: boolean;

    constructor() {
        
        this._gl = global.get('gl');
        this._texture = this._gl.createTexture();

        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, 
            1, 1, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 255, 255]));
        this._gl.bindTexture(this._gl.TEXTURE_2D, null);

    }

    loadFromImage(imageSrc: string): void {
        if (!this._deleted) {
            this._image = new Image();
            this._image.onload = () => {
                this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
                this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._image);
                this._gl.generateMipmap(this._gl.TEXTURE_2D);
                this._gl.bindTexture(this._gl.TEXTURE_2D, null);
            };
            this._image.src = imageSrc;
        }
    }

    bind(textureUnit: GLenum): void {
        if (!this._deleted) {
            this._gl.activeTexture(textureUnit);
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        }
    }

    unbind(textureUnit: GLenum): void {
        if (!this._deleted) {
            this._gl.activeTexture(textureUnit);
            this._gl.bindTexture(this._gl.TEXTURE_2D, null);
        }
    }

    delete(): void {
        if (!this._deleted) {
            this._gl.deleteTexture(this._texture);
            this._deleted = true;
        }
    }

    getTexture(): WebGLTexture { return this._texture; }
    getImage(): HTMLImageElement { return this._image; }

}