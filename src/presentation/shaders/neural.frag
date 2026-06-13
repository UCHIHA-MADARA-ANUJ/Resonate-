varying vec3 vColor;
varying float vAlpha;

void main() {
  // Circular soft particle
  float d = distance(gl_PointCoord, vec2(0.5));
  if (d > 0.5) discard;
  
  float strength = smoothstep(0.5, 0.1, d);
  gl_FragColor = vec4(vColor, vAlpha * strength);
}
