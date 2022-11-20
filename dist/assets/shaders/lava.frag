#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

const int AMOUNT = 20;

void main(){
	vec2 coord = 20.0 * (gl_FragCoord.xy - resolution / 2.0) / min(resolution.y, resolution.x);
	float len;
	for (int i = 0; i < AMOUNT; i++){
		len = length(vec2(coord.x, coord.y));
		coord.x = coord.x - cos(coord.y + sin(len)) + cos(time / 9.0);
		coord.y = coord.y + sin(coord.x + cos(len)) + sin(time / 12.0);
	}
	gl_FragColor = vec4(cos(len * .5), cos(len * 0.1), cos(len * 0.1), 1.0);
}