import Program from 'engine/shaders/Program';

export default class Material {

    _program: Program;

    constructor(program: Program) {
        this._program = program;
        this._program.generate();
    }

    /* void Material::release()
     * This method is a clean-up method when the material is no longer 
     * needed in the application.
     * Frees the shaders and program attached to the mesh. */
    release() {
        this._program.release();
    }

    getProgram(): Program { return this._program; }

}