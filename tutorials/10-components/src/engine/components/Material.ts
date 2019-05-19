import global from 'global';
import Texture2D from 'engine/textures/Texture2D';
import ShaderMaster from 'engine/shaders/ShaderMaster';
import Component from 'engine/components/Component';

export default class Material extends Component {
    
    _gl: WebGL2RenderingContext;
    _color: Array<number>;
    _texture2D: Texture2D;

    constructor() {
        super();
        this._gl = global.get('gl');
    }

    start(): void {
        const program = ShaderMaster.get(this.getGameObject().getShader());
        program.setUniform1f('use_texture', this._texture2D ? 1 : 0);
        if (this._texture2D) {
            this._texture2D.bind(this._gl.TEXTURE0);
            program.setUniform1i('sampler', 0);
        } else {
            program.setUniform3f('color', this._color[0], this._color[1], this._color[2]);
        }
    }

    update(deltatTime: number) : void { }

    stop(): void {
        if (this._texture2D) {
            this._texture2D.unbind(this._gl.TEXTURE0);
        }
    }

    getColor(): Array<number> { return this._color; }
    setColor(r: number, g: number, b: number): void { this._color = [r, g, b]; }

    getTexture(): Texture2D { return this._texture2D; }
    setTexture(texture2D: Texture2D): void { this._texture2D = texture2D; }

}