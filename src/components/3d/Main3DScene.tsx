'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Sphere, 
  TorusKnot, 
  Float,
  Sparkles,
  Text,
  Html,
  Line,
  Points,
  PointMaterial
} from '@react-three/drei';
import * as THREE from 'three';

const HOVER_SOUND = '/assets/sounds/hover.mp3';

const floatingProjects = [
  {
    title: 'Project Alpha',
    url: '#',
    position: [-4, 1.5, -2] as [number, number, number],
    color: '#8C52FF',
    description: 'Next.js + Three.js',
  },
  {
    title: 'Project Beta',
    url: '#',
    position: [3.5, 2.2, 1.5] as [number, number, number],
    color: '#FF6B6B',
    description: 'React Native + Firebase',
  },
  {
    title: 'Project Gamma',
    url: '#',
    position: [0, -2.5, 3.5] as [number, number, number],
    color: '#00F5D4',
    description: 'E-commerce 3D',
  },
  {
    title: 'Project Delta',
    url: '#',
    position: [-2.5, 0.5, 4] as [number, number, number],
    color: '#FFD600',
    description: 'AI + IoT',
  },
  {
    title: 'Project Omega',
    url: '#',
    position: [2.5, -2, -3.5] as [number, number, number],
    color: '#E0E0E0',
    description: 'Open Source',
  },
];

// Add preview images for each project (replace with your own images in public/assets/images/projects/)
const projectPreviews: Record<string, string> = {
  'Project Alpha': '/assets/images/projects/alpha-preview.png',
  'Project Beta': '/assets/images/projects/beta-preview.png',
  'Project Gamma': '/assets/images/projects/gamma-preview.png',
  'Project Delta': '/assets/images/projects/delta-preview.png',
  'Project Omega': '/assets/images/projects/omega-preview.png',
};

// Accept audioRef as a prop
interface Main3DSceneProps {
  audioRef?: React.RefObject<HTMLAudioElement>;
}

const Main3DScene: React.FC<Main3DSceneProps> = ({ audioRef }) => {
  const [hovered, setHovered] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const torusKnotRef = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const { viewport } = useThree();
  
  // Play sound on project hover
  useEffect(() => {
    if (hoveredProject && audioRef && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [hoveredProject, audioRef]);

  // Create a field of points for the background
  const particleCount = 500;
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 25;
      positions[i3 + 1] = (Math.random() - 0.5) * 25;
      positions[i3 + 2] = (Math.random() - 0.5) * 25;
    }
    
    return positions;
  }, [particleCount]);

  // Generate animated cosmic particles
  const cosmicParticleCount = 400;
  const cosmicParticlesPosition = useMemo(() => {
    const arr = new Float32Array(cosmicParticleCount * 3);
    for (let i = 0; i < cosmicParticleCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, []);

  // Mouse movement effect
  useFrame(({ mouse, viewport, clock }) => {
    const time = clock.getElapsedTime();
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    
    // Spherical hover effect
    if (sphereRef.current) {
      // Base rotation
      sphereRef.current.rotation.x += 0.01;
      sphereRef.current.rotation.y += 0.015;
      
      // Pulsating effect
      const scale = 1 + 0.1 * Math.sin(time * 2);
      sphereRef.current.scale.set(scale, scale, scale);
      
      // Subtle movement based on mouse
      sphereRef.current.position.x = -1.5 + x * 0.05;
      sphereRef.current.position.y = 0.5 + y * 0.05;
    }
    
    // Torus knot animation
    if (torusKnotRef.current) {
      torusKnotRef.current.rotation.x = time * 0.3;
      torusKnotRef.current.rotation.y = time * 0.2;
      torusKnotRef.current.rotation.z += 0.01;
      
      // Subtle movement based on mouse (opposite direction to sphere)
      torusKnotRef.current.position.x = 1.5 - x * 0.03;
      torusKnotRef.current.position.y = y * 0.03;
    }
    
    // Animate the point cloud
    if (pointsRef.current) {
      pointsRef.current.rotation.x = time * 0.05;
      pointsRef.current.rotation.y = time * 0.04;
    }
  });

  // Draw animated lines between floating projects
  const projectLinePairs = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], // Loop
    [0, 2], [1, 3], [2, 4], [3, 0], [4, 1] // Criss-cross
  ];

  // Particle trail state
  const [mouseTrail, setMouseTrail] = useState<{ x: number; y: number; z: number }[]>([]);
  const maxTrail = 30;

  // Mouse move handler for trail
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Convert screen coords to NDC and then to scene coords
      const { width, height } = viewport;
      const x = ((e.clientX / window.innerWidth) * 2 - 1) * width / 2;
      const y = -((e.clientY / window.innerHeight) * 2 - 1) * height / 2;
      setMouseTrail((trail) => {
        const next = [...trail, { x, y, z: 0 }];
        return next.length > maxTrail ? next.slice(-maxTrail) : next;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [viewport]);

  // Project orbiting comet trail state
  const [cometAngles, setCometAngles] = useState<number[]>(() => floatingProjects.map(() => Math.random() * Math.PI * 2));

  // Animate comet angles
  useFrame((state, delta) => {
    setCometAngles((prev) => prev.map((a, i) => a + 0.7 * delta + i * 0.03));
  });

  return (
    <>
      {/* Environment & Lighting */}
      <color attach="background" args={["#0D0D0D"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -5, -10]} intensity={0.8} color="#8C52FF" /> {/* Electric Violet */}
      <pointLight position={[0, 5, -10]} intensity={0.6} color="#FF6B6B" /> {/* Coral Red */}
      
      {/* Background Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.05} 
          color="#00F5D4" 
          sizeAttenuation 
          transparent={true}
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Animated cosmic particles */}
      <Points positions={cosmicParticlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8C52FF"
          size={0.13}
          sizeAttenuation
          depthWrite={false}
          opacity={0.45}
        />
      </Points>
      <Points positions={cosmicParticlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00F5D4"
          size={0.09}
          sizeAttenuation
          depthWrite={false}
          opacity={0.25}
        />
      </Points>
      
      {/* Animated sparkles for a magical effect */}
      <Sparkles 
        count={100}
        scale={[15, 10, 15]}
        size={1}
        speed={0.4}
        opacity={0.2}
        color={"#8C52FF"}
      />
      
      <Sparkles 
        count={50}
        scale={[12, 8, 10]}
        size={2}
        speed={0.1}
        opacity={0.3}
        color={"#FF6B6B"}
        position={[-2, -2, -2]}
      />
      
      {/* Main objects with interaction */}
      <Float
        speed={2} // Animation speed
        rotationIntensity={0.5} // Rotation intensity
        floatIntensity={0.5} // Float intensity
      >
        {/* Floating text */}
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="#8C52FF"
          anchorX="center"
          anchorY="middle"
          font="/assets/fonts/Inter-Bold.woff" // Replace with your actual path
        >
          PORTFOLIO
        </Text>
      </Float>
      
      {/* Interactive sphere with wireframe */}
      <mesh 
        ref={sphereRef} 
        position={[-1.5, 0.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          color="#00F5D4"
          emissive="#8C52FF"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </mesh>

      {/* Interactive torus knot */}
      <mesh 
        ref={torusKnotRef} 
        position={[1.5, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <meshStandardMaterial
          color={hovered ? "#FF6B6B" : "#FF6B6B"}
          emissive={hovered ? "#FF6B6B" : "#FF6B6B"}
          emissiveIntensity={hovered ? 0.7 : 0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Animated lines between floating projects */}
      {projectLinePairs.map(([a, b], idx) => {
        const start = floatingProjects[a].position;
        const end = floatingProjects[b].position;
        // Animate line color based on time and index
        const color = floatingProjects[a].color;
        return (
          <Line
            key={`line-${a}-${b}`}
            points={[start, end]}
            color={color}
            lineWidth={1.5}
            dashed={true}
            dashSize={0.25 + (idx % 3) * 0.1}
            gapSize={0.15 + (idx % 2) * 0.1}
            transparent
            opacity={0.45}
          />
        );
      })}
      
      {/* Cosmic Particle Trail following mouse */}
      {mouseTrail.length > 1 && (
        <Line
          points={mouseTrail.map((p) => [p.x, p.y, p.z])}
          color="#8C52FF"
          lineWidth={2}
          transparent
          opacity={0.5}
          dashed={false}
        />
      )}
      
      {/* Floating project links in cosmic space */}
      {floatingProjects.map((proj, i) => {
        // Comet trail orbiting each project
        const cometRadius = 0.8;
        const cometAngle = cometAngles[i] || 0;
        const cometPos = [
          proj.position[0] + Math.cos(cometAngle) * cometRadius,
          proj.position[1] + Math.sin(cometAngle) * cometRadius,
          proj.position[2] + Math.sin(cometAngle * 0.7) * 0.3,
        ];
        return (
          <Float
            key={proj.title}
            speed={1.2 + i * 0.2}
            rotationIntensity={0.7}
            floatIntensity={0.8}
          >
            <mesh
              position={proj.position}
              onPointerOver={() => setHoveredProject(proj.title)}
              onPointerOut={() => setHoveredProject(null)}
              scale={hoveredProject === proj.title ? 1.25 : 1}
              castShadow
              receiveShadow
            >
              <sphereGeometry args={[0.45, 32, 32]} />
              <meshStandardMaterial
                color={proj.color}
                emissive={proj.color}
                emissiveIntensity={hoveredProject === proj.title ? 1 : 0.5}
                wireframe={false}
                transparent
                opacity={hoveredProject === proj.title ? 1 : 0.85}
                metalness={0.7}
                roughness={0.2}
              />
              {/* 3D Project Preview: spinning cube with screenshot texture */}
              {hoveredProject === proj.title && (
                (() => {
                  let imgPath = projectPreviews[proj.title];
                  // Defensive: If imgPath is undefined or not a string, use fallback
                  if (typeof imgPath !== 'string' || !imgPath.endsWith('.png')) {
                    imgPath = "/assets/images/projects/alpha-preview.png";
                  }
                  let texture;
                  try {
                    texture = new THREE.TextureLoader().load(imgPath);
                  } catch (e) {
                    texture = undefined;
                  }
                  return (
                    <mesh position={[0, 1.1, 0]} rotation={[0.5, 0.5, 0]}>
                      <planeGeometry args={[1.2, 0.75]} />
                      <meshStandardMaterial
                        map={texture}
                        emissive={proj.color}
                        emissiveIntensity={0.25}
                        opacity={0.98}
                        transparent={true}
                      />
                      {/* Add a subtle glowing border using another slightly larger plane */}
                      <mesh position={[0, 0, -0.01]}>
                        <planeGeometry args={[1.28, 0.83]} />
                        <meshBasicMaterial color={proj.color} transparent opacity={0.18} />
                      </mesh>
                    </mesh>
                  );
                })()
              )}
              <Html
                center
                distanceFactor={8}
                style={{
                  pointerEvents: 'auto',
                  textAlign: 'center',
                  fontWeight: 700,
                  color: proj.color,
                  textShadow: `0 2px 8px #000, 0 0 8px ${proj.color}`,
                  fontSize: hoveredProject === proj.title ? '1.2rem' : '1.05rem',
                  letterSpacing: '0.04em',
                  filter: `drop-shadow(0 0 8px ${proj.color})`,
                  borderRadius: '0.7em',
                  background: hoveredProject === proj.title ? 'rgba(13,13,13,0.92)' : 'rgba(13,13,13,0.7)',
                  padding: '0.5em 1.2em',
                  border: `2px solid ${proj.color}`,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  minWidth: '120px',
                  boxShadow: `0 0 16px ${proj.color}55`,
                  zIndex: 10,
                }}
              >
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: proj.color }}
                  tabIndex={0}
                  aria-label={`Open ${proj.title} project link in a new tab`}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      window.open(proj.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  onFocus={() => setHoveredProject(proj.title)}
                  onBlur={() => setHoveredProject(null)}
                >
                  <span style={{ display: 'block', fontWeight: 800, fontSize: '1.1em', marginBottom: 2 }}>{proj.title}</span>
                  <span style={{ fontWeight: 400, fontSize: '0.95em', opacity: 0.8 }}>{proj.description}</span>
                </a>
                {hoveredProject === proj.title && (
                  <span
                    style={{
                      display: 'block',
                      marginTop: 6,
                      fontSize: '0.85em',
                      color: '#fff',
                      opacity: 0.7,
                      textShadow: '0 0 8px #000',
                    }}
                  >
                    {/* Placeholder for tooltip or more info */}
                    Cosmic Project Link
                  </span>
                )}
              </Html>
              {/* 3D icon or sparkle effect on hover */}
              {hoveredProject === proj.title && (
                <mesh position={[0, 0.7, 0]}>
                  <torusGeometry args={[0.18, 0.06, 16, 32]} />
                  <meshStandardMaterial color={proj.color} emissive={proj.color} emissiveIntensity={1} wireframe opacity={0.7} transparent />
                </mesh>
              )}
              {/* Comet particle (glow) */}
              <mesh position={cometPos}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color={proj.color} emissive={proj.color} emissiveIntensity={1.5} opacity={0.7} transparent />
              </mesh>
              {/* Comet trail (short fading line) */}
              <Line
                points={[
                  [proj.position[0], proj.position[1], proj.position[2]],
                  cometPos,
                ]}
                color={proj.color}
                lineWidth={2}
                transparent
                opacity={0.7}
                dashed={false}
              />
            </mesh>
          </Float>
        );
      })}
    </>
  );
};

export default Main3DScene;
