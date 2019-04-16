
export default class Texture {

    _gl: WebGL2RenderingContext; /* Reference to WebGL context. */
    _texture: WebGLTexture;      /* WebGLTexture wrapped by this object. */ 
    _textureType: GLenum;        /* Type of the texture; specified in subclasses. */

    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl;
    }

    /* void Texture::generate()
     * Loads a new HTMLImageElement from given source,
     * and copies image data to GPU using texImage2D when the image is loaded.
     * This method should not be used frequently;
     * for dynamically changing textures, look for FBOs instead. */
    generate(imageSource: string): void {
        /* Create a WebGLTexture if not created. */
        if (!this._texture)
            this._texture = this._gl.createTexture();
        
        /* Bind the texture to WebGL context .*/
        this._gl.bindTexture(this._textureType, this._texture);

        /* Load temporary 1x1 data to texture. */
        this._gl.texImage2D(this._textureType, 0, this._gl.RGBA, 
            1, 1, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 255, 255]));

        /* Set the texture paramters to default values. */
        /* TEXTURE_MAG_FILTER; sampling algorithm for magnified textures on the scene. */
        this._gl.texParameteri(this._textureType, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR);
        /* TEXTURE_MIN_FILTER; sampling algorithm for minified textures on the scene. */
        this._gl.texParameteri(this._textureType, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR_MIPMAP_LINEAR);
        /* TEXTURE_WRAP_S; sampling algorithm for extrapolation on horizontal axis. */
        this._gl.texParameteri(this._textureType, this._gl.TEXTURE_WRAP_S, this._gl.REPEAT);
        /* TEXTURE_WRAP_T; sampling algorithm for extrapolation on vertical axis. */
        this._gl.texParameteri(this._textureType, this._gl.TEXTURE_WRAP_T, this._gl.REPEAT);
        
        /* Unbind the texture from WebGL context. */
        this._gl.bindTexture(this._textureType, null);

        /* Create a HTMLImageElement for loading texture image. */
        const image = new Image();

        /* Load actual image data to texture by callback. */
        image.onload = () => {
            /* Bind the texture to WebGL context .*/
            this._gl.bindTexture(this._textureType, this._texture);

            /* Copies the image data into GPU.
            * The paramters should be adjusted by the format of image,
            * but this is just fine for PNG images. */
            this._gl.texImage2D(
                this._textureType,      /* Texture type. */
                0,                      /* Mipmap level. */
                this._gl.RGBA,          /* Format of pixel data stored in GPU. */
                this._gl.RGBA,          /* Format of pixel data of the given image. */
                this._gl.UNSIGNED_BYTE, /* Type of the data of the given image. */
                image                   /* Pixel data to transfer. */
            );

            /* Generate mipmap for this texture. */
            this._gl.generateMipmap(this._textureType);

            /* Unbind the texture from WebGL context. */
            this._gl.bindTexture(this._textureType, null);
        };

        image.src = imageSource;

    }

    /* void Texture::release()
     * This method is a clean-up method when the texture is no longer 
     * needed in the application.
     * Frees texture attached to the mesh. */
    release(): void {
        if (this._texture) {
            this._gl.deleteTexture(this._texture);
            this._texture = null;
        }
    }

    /* void Texture::bind(GLenum)
     * Binds this texture to given texture unit. */
    bind(textureUnit: GLenum): void {
        this._gl.activeTexture(textureUnit);
        this._gl.bindTexture(this._textureType, this._texture);
    }

    /* void Texture::unbind(GLenum)
     * Unbinds this texture from given texture unit. */
    unbind(textureUnit: GLenum): void {
        this._gl.activeTexture(textureUnit);
        this._gl.bindTexture(this._textureType, null);
    }

    /* void Texture::setTextureParamter(GLenum, GLenum)
     * This method wraps texParameteri method for this texture. */
    setTextureParamter(param: GLenum, value: GLenum): void {
        if (!this._texture)
            throw "Texture::setTextureParamter failed: texture not available";
        
        this._gl.bindTexture(this._textureType, this._texture);
        this._gl.texParameteri(this._textureType, param, value);
        this._gl.bindTexture(this._textureType, null);
    }

}