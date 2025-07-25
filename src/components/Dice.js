import React, { useRef, useEffect, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Defini les rotations pour chaque valeur de dé
const faceRotations = {
    1: [0, 0, 0],                        // top = 1
    2: [Math.PI / 2, 0, 0],              // top = 2
    3: [0, 0, -Math.PI / 2],             // top = 3
    4: [0, 0, Math.PI / 2],              // top = 4
    5: [-Math.PI / 2, 0, 0],             // top = 5
    6: [Math.PI, 0, 0],                  // top = 6
};

const Dice = ({ value }) => {
    const meshRef = useRef();
    const [targetRotation, setTargetRotation] = useState([0, 0, 0]);

    const textures = useLoader(THREE.TextureLoader, [
        '/textures/dice1.png', // 0 → RIGHT (+X)
        '/textures/dice2.png', // 1 → LEFT (−X)
        '/textures/dice3.png', // 2 → TOP (+Y)
        '/textures/dice4.png', // 3 → BOTTOM (−Y)
        '/textures/dice5.png', // 4 → FRONT (+Z)
        '/textures/dice6.png', // 5 → BACK (−Z)
    ]);

    useEffect(() => {
        if (value) {
            const [x, y, z] = faceRotations[value];
            // Ajout de rotations supplémentaires pour que le dé tourne "plus"
            setTargetRotation([
                x + Math.PI * 4,
                y + Math.PI * 4,
                z + Math.PI * 4,
            ]);
        }
    }, [value]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += (targetRotation[0] - meshRef.current.rotation.x) * 0.1;
            meshRef.current.rotation.y += (targetRotation[1] - meshRef.current.rotation.y) * 0.1;
            meshRef.current.rotation.z += (targetRotation[2] - meshRef.current.rotation.z) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2, 2, 2]} />
            {textures.map((texture, index) => (
                <meshBasicMaterial
                    key={index}
                    attach={`material-${index}`}
                    map={texture}
                />
            ))}
        </mesh>
    );
};

export default Dice;