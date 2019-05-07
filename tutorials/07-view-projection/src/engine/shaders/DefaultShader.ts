import Program from 'engine/shaders/Program';

const vertexShaderSource = 
`#version 300 es

layout(location = 0) in vec3 position;
layout(location = 1) in vec2 uv;

uniform mat4 transformation;

out vec2 pass_uv;

void main() {
    gl_Position = transformation * vec4(position, 1);
    pass_uv = uv;
}
`

const fragmentShaderSource = 
`#version 300 es

precision mediump float;

in vec2 pass_uv;

uniform float use_texture;
uniform sampler2D sampler;
uniform vec3 color;

out vec4 out_color;

void main() {
    out_color = mix(vec4(color, 1), texture(sampler, pass_uv), use_texture);
}
`

export default class DefaultShader extends Program {

    constructor() {
        super(vertexShaderSource, fragmentShaderSource);
    }

}