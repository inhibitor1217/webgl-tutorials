import Program from 'engine/shaders/Program';

export default (
    () => {

        const _programs: {[key: string]: Program} = {};
        const _programNames = [ 'DefaultShader' ];

        return {

            init(): void {
                _programNames.forEach(
                    async (name) => {
                        await import(/* webpackMode: "eager" */`engine/shaders/${name}`)
                            .then(programClass => {
                                const programInstance = Object.create(programClass.default.prototype);
                                programInstance.constructor.apply(programInstance);
                                _programs[name] = programInstance;
                            });
                    }
                );
            },

            get(name: string): Program {
                const program = _programs[name];
                if (!program)
                    throw 'Requested shader program does not exist.';
                return program;
            },

            delete(): void {
                Object.keys(_programs).forEach(
                    (name) => {
                        _programs[name].delete();
                    }
                );
            }

        };

    }
)();