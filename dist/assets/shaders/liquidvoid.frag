#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535;

uniform vec2 resolution;
uniform float time;

void main(){
    vec2 position = 6.0 * gl_FragCoord.xy / resolution;
    vec3 color = vec3(0.0);
    for (int n = 1; n < 100; n++){
        float i = float(n);
        position += vec2(0.7 / i * sin(i * position.y + time / 5.0 + 0.3 * i) + 0.1, 5.0 / i * sin(position.x + time / 5.0 + 0.3 * i) + 1.6);
    }
    color += vec3(0.1 * sin(position.x) + 0.1, .1 * sin(position.y) + 0.1, sin(position.x + position.y));
    gl_FragColor = vec4(color, 1.0);
}