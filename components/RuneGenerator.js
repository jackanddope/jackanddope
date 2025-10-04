// components/RuneGenerator.js
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

const RuneGenerator = forwardRef(function RuneGenerator({ duration = 5000 }, ref) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const analyserRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerBurstVisual: () => {
      if (particlesRef.current) {
        particlesRef.current.material.uniforms.uBurst.value = 1.0;
        setTimeout(() => {
          if (particlesRef.current)
            particlesRef.current.material.uniforms.uBurst.value = 0.0;
        }, 500);
      }
    },
  }));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    sceneRef.current = scene;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Geometry + Shader
    const geometry = new THREE.BufferGeometry();
    const numParticles = 5000;
    const positions = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 4;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0.0 },
        uBurst: { value: 0.0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uBurst;
        varying float vAlpha;
        void main() {
          vec3 pos = position;
          pos.x += sin(uTime + position.y) * 0.02;
          pos.y += cos(uTime + position.x) * 0.02;
          vAlpha = 0.6 + 0.4 * sin(uTime + position.x * 5.0);
          pos *= (1.0 + uBurst * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 2.0;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          gl_FragColor = vec4(0.5, 1.0, 1.0, vAlpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    particlesRef.current = points;

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      if (material.uniforms) material.uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-50" />;
});

export default RuneGenerator;
