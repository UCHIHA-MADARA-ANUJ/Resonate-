uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseVelocity;

attribute float aSize;
attribute float aSpeed;
attribute float aAngle;
attribute vec3 aRandom;

varying vec3 vColor;
varying float vAlpha;

// Advanced Simplex / Curl Noise
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

void main() {
  vec3 pos = position;
  float time = uTime * aSpeed * 0.2;

  // 1. Orbital Mechanics (The Singularity)
  // Calculate distance to the center
  float distToCenter = length(pos.xy);
  
  // The closer to the center, the faster the rotation (Black hole accretion disk)
  float orbitalSpeed = (20.0 / (distToCenter + 0.1)) * time;
  
  float c = cos(orbitalSpeed + aAngle);
  float s = sin(orbitalSpeed + aAngle);
  mat2 rot = mat2(c, -s, s, c);
  pos.xy *= rot;

  // 2. The Gravitational Pull (Mouse Interaction)
  // Map mouse from screen space (-1 to 1) to world space approx
  vec3 mousePos = vec3(uMouse.x * 25.0, uMouse.y * 15.0, 0.0);
  float distToMouse = distance(pos.xy, mousePos.xy);
  
  // Extreme gravitational pull when the mouse moves fast
  float pullRadius = 8.0 + (uMouseVelocity * 10.0);
  float pullForce = smoothstep(pullRadius, 0.0, distToMouse);
  
  // Rip particles toward the cursor, but add a violent chaotic spin
  vec3 dirToMouse = normalize(mousePos - pos);
  vec3 tangent = vec3(-dirToMouse.y, dirToMouse.x, 0.0); // Perpendicular force
  
  // The "Rip" effect
  pos += dirToMouse * pullForce * (5.0 + uMouseVelocity * 10.0);
  pos += tangent * pullForce * 15.0 * aRandom.x;
  pos.z += pullForce * 10.0 * (aRandom.y - 0.5); // Pull them out of the screen Z-plane

  // 3. Volumetric Depth & Color
  vec3 colorVoid = vec3(0.04, 0.0, 0.1);   // Deep Space Purple
  vec3 colorCyan = vec3(0.0, 0.94, 1.0);   // #00F0FF Resonance
  vec3 colorMagenta = vec3(1.0, 0.0, 0.33); // #FF0055 Shock
  vec3 colorWhite = vec3(1.0, 1.0, 1.0);    // Core heat

  // Color mapping based on velocity/pull and depth
  float heat = smoothstep(0.0, 1.0, pullForce) + smoothstep(0.0, 5.0, 5.0 / (distToCenter + 0.1));
  
  vec3 finalColor = mix(colorVoid, colorCyan, aRandom.z);
  finalColor = mix(finalColor, colorMagenta, smoothstep(0.3, 0.7, heat));
  finalColor = mix(finalColor, colorWhite, smoothstep(0.8, 1.2, heat)); // Pure white hot core

  vColor = finalColor;
  
  // Alpha fading
  vAlpha = smoothstep(25.0, 10.0, distToCenter) * (0.3 + aRandom.y * 0.7);
  vAlpha += pullForce; // Brighten when ripped by mouse
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  
  // Scale particles based on heat/velocity
  float pSize = aSize * (1.0 + heat * 5.0);
  gl_PointSize = pSize * (20.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
