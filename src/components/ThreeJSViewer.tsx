import {useEffect, useRef} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default function ThreeJSViewer() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mountNode = mountRef.current;
        if (!mountNode) return;
        const width = mountNode.clientWidth || 320;
        const height = mountNode.clientHeight || 300;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 10, 20);

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin("anonymous");

        const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({
            map: loader.load("https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/sun/sunmap.jpg")
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        const planetData = [
            {
                size: 0.5,
                distance: 5,
                texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/mercury/mercurymap.jpg",
                speed: 0.02
            },
            {
                size: 0.7,
                distance: 7,
                texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/venus/venusmap.jpg",
                speed: 0.015
            },
            {
                size: 0.8,
                distance: 9,
                texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/earth/earthmap1k.jpg",
                speed: 0.01
            },
            {
                size: 0.6,
                distance: 11,
                texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/mars/mars_1k_color.jpg",
                speed: 0.008
            }
        ];

        const planets: {group: THREE.Group; speed: number}[] = [];
        planetData.forEach(p => {
            const geometry = new THREE.SphereGeometry(p.size, 32, 32);
            const material = new THREE.MeshStandardMaterial({map: loader.load(p.texture)});
            const mesh = new THREE.Mesh(geometry, material);
            const orbitGroup = new THREE.Group();
            mesh.position.x = p.distance;
            orbitGroup.add(mesh);
            scene.add(orbitGroup);
            planets.push({group: orbitGroup, speed: p.speed});
        });

        const light = new THREE.PointLight(0xffffff, 1.5);
        scene.add(light);

        mountNode.innerHTML = "";
        mountNode.appendChild(renderer.domElement);

        let frameId: number;
        const animate = () => {
            planets.forEach(p => {
                p.group.rotation.y += p.speed;
            });
            controls.update();
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        const onResize = () => {
            const w = mountNode.clientWidth;
            const h = mountNode.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            sunGeometry.dispose();
            sunMaterial.dispose();
            planets.forEach(p => {
                p.group.children.forEach(obj => {
                    const mesh = obj as THREE.Mesh;
                    mesh.geometry.dispose();
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach(m => m.dispose());
                    } else {
                        mesh.material.dispose();
                    }
                });
            });
            mountNode.innerHTML = "";
        };
    }, []);

    return (
        <div className="d-flex flex-column align-items-center my-4">
            <div
                ref={mountRef}
                className="rounded shadow border border-primary w-100"
                style={{height: "300px"}}
            />
            <span className="text-secondary small mt-2">Demo 3D: Sistema Solar</span>
        </div>
    );
}
