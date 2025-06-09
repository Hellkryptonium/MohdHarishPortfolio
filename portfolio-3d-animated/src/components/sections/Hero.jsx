import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AnimatedText from '../ui/AnimatedText';
import Model from '../3d/Model';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} />
                <Model />
                <OrbitControls />
            </Canvas>
            <div className="absolute text-center">
                <AnimatedText text="Welcome to My 3D Portfolio!" />
                <p className="mt-4 text-lg text-gray-700">Explore my work and creativity.</p>
            </div>
        </section>
    );
};

export default Hero;