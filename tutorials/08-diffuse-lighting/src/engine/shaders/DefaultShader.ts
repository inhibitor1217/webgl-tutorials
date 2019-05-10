import Program from 'engine/shaders/Program';

const vertexShaderSource = 
`#version 300 es

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;

uniform mat4 transformation;
uniform mat4 inverseCameraTransformation;
uniform mat4 projection;

out vec2 pass_uv;
out vec3 world_normal;

void main() {
    gl_Position = projection * inverseCameraTransformation * transformation * vec4(position, 1);
    pass_uv = uv;
    world_normal = vec3(transformation * vec4(normal, 0));
}
`

const fragmentShaderSource = 
`#version 300 es

precision mediump float;

in vec2 pass_uv;
in vec3 world_normal;

uniform float use_texture;
uniform sampler2D sampler;
uniform vec3 color;

const float light_intensity = 1.0;
const vec3  light_direction = vec3(0, 0, 1);

out vec4 out_color;

void main() {
    vec3 surface_color = mix(vec4(color, 1), texture(sampler, pass_uv), use_texture).xyz;
    float diffuse_factor = clamp( dot(world_normal, light_direction), 0.0, 1.0 );
    out_color = vec4(diffuse_factor * light_intensity * surface_color, 1);
}
`

export default class DefaultShader extends Program {

    constructor() {
        super(vertexShaderSource, fragmentShaderSource);
    }

}