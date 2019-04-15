import Program from '../shaders/Program';

export default class Material {

    _program: Program;

    constructor(program: Program) {
        this._program = program;
    }

    setProgram(program: Program) { this._program = program; }

    getProgram(): Program { return this._program; }

}