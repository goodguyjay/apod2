import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function SolarSystemViewer() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = 400;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 10, 25);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.innerHTML = "";
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin("anonymous");

        // 🌞 Sol
        const sunGeometry = new THREE.SphereGeometry(2, 64, 64);
        const sunMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load("https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/sun/sunmap.jpg")
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // 💡 Luz do sol
        const sunlight = new THREE.PointLight(0xffffff, 3, 100);
        sunlight.position.set(0, 0, 0);
        scene.add(sunlight);

        // 💡 Luz ambiente
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        // 🪐 Dados dos planetas
        const planetsData = [
            { name: "Mercúrio", size: 0.4, distance: 4, speed: 0.02, texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/mercury/mercurymap.jpg" },
            { name: "Vênus", size: 0.6, distance: 6, speed: 0.015, texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/venus/venusmap.jpg" },
            { name: "Terra", size: 0.7, distance: 8, speed: 0.01, texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/earth/earthmap1k.jpg" },
            { name: "Marte", size: 0.5, distance: 10, speed: 0.008, texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/mars/mars_1k_color.jpg" },
            { name: "Júpiter", size: 1.5, distance: 13, speed: 0.006, texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/jupiter/jupitermap.jpg" },
            { name: "Saturno", size: 1.2, distance: 16, speed: 0.004, texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/saturn/saturnmap.jpg" },
            { name: "Urano", size: 1.0, distance: 19, speed: 0.003, texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/uranus/uranusmap.jpg" },
            { name: "Netuno", size: 0.9, distance: 22, speed: 0.002, texture: "https://cdn.jsdelivr.net/npm/solar-system@0.1.46/demo/img/neptune/neptunemap.jpg" },
        ];

        const planetGroups: { group: THREE.Group; speed: number }[] = [];

        planetsData.forEach(({ size, distance, texture, speed }) => {
            const geometry = new THREE.SphereGeometry(size, 32, 32);
            const material = new THREE.MeshStandardMaterial({
                map: textureLoader.load(texture),
                emissive: new THREE.Color(0x111111)
            });
            const mesh = new THREE.Mesh(geometry, material);

            const orbitGroup = new THREE.Group();
            mesh.position.x = distance;
            orbitGroup.add(mesh);
            scene.add(orbitGroup);
            planetGroups.push({ group: orbitGroup, speed });

            // 🌀 Órbita visual (anel)
            const orbitGeometry = new THREE.RingGeometry(distance - 0.02, distance + 0.02, 64);
            const orbitMaterial = new THREE.MeshBasicMaterial({
                color: 0xaaaaaa,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.3,
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            scene.add(orbit);
        });

        // 🔁 Animação
        let frameId: number;
        const animate = () => {
            planetGroups.forEach(({ group, speed }) => {
                group.rotation.y += speed;
            });
            controls.update();
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        const onResize = () => {
            const w = container.clientWidth;
            const h = 400;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            scene.clear();
        };
    }, []);

    return (
        <div className="d-flex flex-column align-items-center my-4">
            <div
                ref={mountRef}
                className="rounded shadow border border-primary w-100"
                style={{ height: "400px" }}
            />
            <span className="text-primary small mt-2">
                Simulação 3D: Sistema Solar (Three.js)
            </span>
        </div>
    );
}
