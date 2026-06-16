uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

// Simple chromatic aberration & iridescence approximation
void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  
  // Fresnel effect for edge glow
  float fresnel = dot(viewDir, normal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 3.0);

  // Time-based shifting
  float t = uTime * 0.5;
  
  // Fake chromatic iridescence mapped to normals
  vec3 color = vec3(
    sin(normal.x * 5.0 + t) * 0.5 + 0.5,
    sin(normal.y * 5.0 + t + 2.0) * 0.5 + 0.5,
    sin(normal.z * 5.0 + t + 4.0) * 0.5 + 0.5
  );

  // Mix with base Cyan/Magenta theme
  vec3 baseColor = mix(vec3(0.0, 0.94, 1.0), vec3(1.0, 0.0, 0.33), fresnel);
  
  vec3 finalColor = mix(baseColor, color, 0.4) + (fresnel * 1.5);
  
  gl_FragColor = vec4(finalColor, fresnel * 0.8 + 0.2);
}
