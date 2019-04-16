import Material from 'engine/components/materials/Material';
import Program from 'engine/shaders/Program';
import { vertexShader, fragmentShader } from 'engine/res/DefaultMaterialShader';
import Texture from 'engine/textures/Texture';

export default class DefaultMaterial extends Material {

    _texture: Texture;    /* Texture to be sampled from this material. */
    _textureUnit: GLenum; /* Texture unit to bind the texture. */

    constructor(gl: WebGL2RenderingContext) {
        super(new Program(gl, vertexShader, fragmentShader));
        this._textureUnit = gl.TEXTURE0;
    }

    /* void DefaultMaterial::start() override
     * Binds the texture to texture unit TEXTURE0
     * and set sampler in the shader program to the texture unit. */
    start(): void {
        super.start();
        this._texture.bind(this._textureUnit);
        this._program.setUniform1i('sampler', 0);
    }

    /* void DefaultMaterial::stop() override
     * Unbinds the texture from texture unit TEXTURE0. */
    stop(): void {
        super.stop();
        this._texture.unbind(this._textureUnit);
    }

    setTexture(texture: Texture): void { this._texture = texture; }

    getTexture(): Texture { return this._texture; }

}