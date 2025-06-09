import { useEffect, useState } from 'react';
import * as THREE from 'three';

const use3DModel = (modelPath) => {
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loader = new THREE.GLTFLoader();

        loader.load(
            modelPath,
            (gltf) => {
                setModel(gltf.scene);
                setLoading(false);
            },
            undefined,
            (err) => {
                setError(err);
                setLoading(false);
            }
        );

        return () => {
            setModel(null);
            setLoading(true);
            setError(null);
        };
    }, [modelPath]);

    return { model, loading, error };
};

export default use3DModel;