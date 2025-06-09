import React, { useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ modelPath }) => {
    const modelRef = useRef();
    const gltf = useLoader(GLTFLoader, modelPath);

    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y = Math.PI; // Rotate model for better view
        }
    }, [gltf]);

    return (
        <primitive
            ref={modelRef}
            object={gltf.scene}
            dispose={null}
        />
    );
};

export default Model;