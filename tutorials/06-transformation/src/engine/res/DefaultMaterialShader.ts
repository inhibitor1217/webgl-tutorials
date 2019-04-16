
export const vertexShader =
`#version 300 es

in vec3 position;
in vec2 uv;

out vec2 pass_uv;

uniform mat4 transformation;

void main() {
    gl_Position = transformation * vec4(position, 1);
    pass_uv = uv;
}

`

export const fragmentShader =
`#version 300 es

precision mediump float;

in vec2 pass_uv;

out vec4 out_color;

uniform sampler2D sampler;

void main() {
    out_color = texture(sampler, pass_uv);
}

`