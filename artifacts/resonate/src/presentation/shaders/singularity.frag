varying vec3 vColor;
varying float vAlpha;

void main() {
  // Ultra-soft cinematic particle
  float d = distance(gl_PointCoord, vec2(0.5));
  if (d > 0.5) discard;
  
  // Exponential falloff for a glowing orb effect rather than a flat circle
  float strength = exp(-d * 6.0);
  
  gl_FragColor = vec4(vColor, vAlpha * strength);
}
