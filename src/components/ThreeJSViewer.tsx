import {useEffect, useRef} from "react";
import * as THREE from "three";

export default function ThreeJSViewer() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mountNode = mountRef.current;

        const width = 320;
        const height = 240;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({color: 0x7f7fff});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(2, 2, 2).normalize();
        scene.add(light);

        camera.position.z = 3;

        let frameId: number;
        const animate = () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };

        if (mountNode) {
            mountNode.innerHTML = "";
            mountNode.appendChild(renderer.domElement);
        }
        animate();

        // cleanup
        return () => {
            cancelAnimationFrame(frameId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            if (mountNode) {
                mountNode.innerHTML = "";
            }
        };
    }, []);

    return (
        <div className="d-flex flex-column align-items-center my-4">
            <div ref={mountRef} className="rounded shadow border border-primary" />
            <span className="text-secondary small mt-2">Demo 3D: Cubo (Three.js)</span>
        </div>
    )
}