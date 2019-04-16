
export const vertexShader =
`#version 300 es

layout(location = 0) in vec2 position;
layout(location = 1) in vec2 uv;

out vec2 pass_uv;

void main() {
    gl_Position = vec4(position, 0, 1);
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