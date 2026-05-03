// ============================================================================
// FROGULA KEYHOUSE - ADVANCED 3D SCENE
// WebGL Shader-based Neural Network with Post-Processing
// ============================================================================

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Custom shader for flowing neural connections
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScrollProgress;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.3;
    
    // Create flowing noise field
    float noise1 = snoise(vec3(uv * 3.0, time * 0.5));
    float noise2 = snoise(vec3(uv * 5.0 + 100.0, time * 0.3));
    float noise3 = snoise(vec3(uv * 8.0 + 200.0, time * 0.2));
    
    float combinedNoise = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
    
    // Mouse influence
    float mouseDistance = distance(uv, uMouse);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance) * 0.3;
    
    // Scroll influence - intensify as user scrolls
    float scrollInfluence = uScrollProgress * 0.5;
    
    // Color palette - cyberpunk purple/blue/cyan
    vec3 color1 = vec3(0.4, 0.2, 0.9);  // Deep purple
    vec3 color2 = vec3(0.1, 0.4, 0.9);  // Electric blue
    vec3 color3 = vec3(0.0, 0.8, 0.9);  // Cyan
    vec3 darkColor = vec3(0.02, 0.02, 0.08); // Deep slate
    
    // Mix colors based on noise
    vec3 finalColor = mix(darkColor, color1, smoothstep(-0.2, 0.3, combinedNoise));
    finalColor = mix(finalColor, color2, smoothstep(0.1, 0.5, combinedNoise + mouseInfluence));
    finalColor = mix(finalColor, color3, smoothstep(0.3, 0.8, combinedNoise + scrollInfluence));
    
    // Add "neural pulse" effect along noise ridges
    float pulse = sin(combinedNoise * 10.0 + time * 3.0) * 0.5 + 0.5;
    finalColor += color3 * pulse * 0.15 * (1.0 + uScrollProgress);
    
    // Vignette
    vec2 center = uv - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.8;
    finalColor *= vignette;
    
    // Grid overlay effect
    float gridX = smoothstep(0.98, 1.0, abs(sin(uv.x * 50.0)));
    float gridY = smoothstep(0.98, 1.0, abs(sin(uv.y * 50.0)));
    float grid = max(gridX, gridY) * 0.03;
    finalColor += vec3(grid) * color2;
    
    gl_FragColor = vec4(finalColor, 0.9);
  }
`;

// Particle system for "data nodes"
const particleVertexShader = `
  attribute float size;
  attribute vec3 customColor;
  attribute float phase;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  uniform float uTime;
  uniform float uScrollProgress;
  
  void main() {
    vColor = customColor;
    
    vec3 pos = position;
    
    // Orbital motion
    float angle = uTime * 0.2 + phase * 6.28;
    float radius = 15.0 + sin(phase * 10.0 + uTime) * 3.0;
    
    pos.x = cos(angle) * radius + sin(uTime * 0.5 + phase) * 2.0;
    pos.y = sin(angle * 0.7) * radius * 0.6 + cos(uTime * 0.3 + phase) * 2.0;
    pos.z = sin(angle) * radius * 0.4;
    
    // Scroll influence - particles spread out as we scroll
    pos *= 1.0 + uScrollProgress * 0.5;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size attenuation
    gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + sin(uTime + phase * 10.0) * 0.3);
    
    // Alpha based on depth
    vAlpha = smoothstep(0.0, 30.0, -mvPosition.z) * (0.6 + uScrollProgress * 0.4);
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Soft glow effect
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 2.0);
    
    gl_FragColor = vec4(vColor, vAlpha * glow);
  }
`;

export const Scene3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ========== SHADER PLANE (Background) ==========
    const planeGeometry = new THREE.PlaneGeometry(100, 60, 1, 1);
    const planeMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uScrollProgress: { value: 0 }
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = -20;
    scene.add(plane);

    // ========== PARTICLE SYSTEM ==========
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xe879f9), // Pink
    ];

    for (let i = 0; i < particleCount; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 15 + 5;
      phases[i] = Math.random();
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ========== CONNECTION LINES ==========
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });

    // ========== MOUSE HANDLING ==========
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight
      };
    };

    // ========== SCROLL HANDLING ==========
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = window.scrollY / maxScroll;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========== ANIMATION LOOP ==========
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Update uniforms
      planeMaterial.uniforms.uTime.value = elapsedTime;
      planeMaterial.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      planeMaterial.uniforms.uScrollProgress.value = scrollRef.current;
      
      particleMaterial.uniforms.uTime.value = elapsedTime;
      particleMaterial.uniforms.uScrollProgress.value = scrollRef.current;

      // Gentle camera movement based on mouse
      camera.position.x += (mouseRef.current.x - 0.5) * 0.5 - camera.position.x * 0.02;
      camera.position.y += (mouseRef.current.y - 0.5) * 0.5 - camera.position.y * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ========== RESIZE HANDLING ==========
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // ========== CLEANUP ==========
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      planeGeometry.dispose();
      planeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center, #0f0c29 0%, #0a0a1a 50%, #000000 100%)' }}
    />
  );
};

export default Scene3D;
