import Program from 'engine/shaders/Program';

export default class Material {

    _program: Program;

    constructor(program: Program) {
        this._program = program;
    }

    /* void Material::release()
     * This method is a clean-up method when the material is no longer 
     * needed in the application. */
    release(): void {
        this._program = null;
    }

    /* void Material::start()
     * This method is called before the application needs to render
     * using this material.
     * Binds WebGL context to the program in this material. */
    start(): void {
        this._program.start();
    }

    /* void Material::stop()
     * This method is used when the application finished rendering
     * using this material.
     * Unbinds WebGL context to the program in this material. */
    stop(): void {
        this._program.stop();
    }

    setProgram(program: Program) { this._program = program; }

    getProgram(): Program { return this._program; }

}