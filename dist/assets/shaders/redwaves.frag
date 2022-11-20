#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

void main(){
	vec2 coord = (gl_FragCoord.xy / resolution.xy / 2.5);
	float color = 1.0;

	color += sin(coord.y * 50.0 + cos(time + coord.y * 10.0 + sin(coord.x * 50.0 + time * 2.0))) * 2.0;
	color += cos(coord.y * 500.0 + sin(time + coord.y * 10.0 + cos(coord.x * 50.0 + time * 2.0))) * 2.0;

	gl_FragColor = vec4(vec3(0.1 * color, 0, 0), 1.0);
}