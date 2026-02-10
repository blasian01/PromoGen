"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── iPhone Model ─── */
function IPhone({ index, total }: { index: number; total: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const offset = (index / total) * Math.PI * 2;

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime() * 0.3 + offset;
        const radius = 2.2;

        groupRef.current.position.x = Math.cos(t) * radius;
        groupRef.current.position.z = Math.sin(t) * radius;
        groupRef.current.position.y = Math.sin(t * 1.5) * 0.3;

        // Phones face outward and tilt slightly
        groupRef.current.rotation.y = -t + Math.PI / 2;
        groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.08;
        groupRef.current.rotation.z = Math.cos(t * 0.6) * 0.05;
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
                {/* Phone body */}
                <RoundedBox args={[1.1, 2.2, 0.1]} radius={0.12} smoothness={8}>
                    <meshPhysicalMaterial
                        color="#1a1a1a"
                        metalness={0.8}
                        roughness={0.15}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </RoundedBox>

                {/* Screen */}
                <RoundedBox
                    args={[0.95, 2.0, 0.005]}
                    radius={0.08}
                    smoothness={4}
                    position={[0, 0, 0.053]}
                >
                    <meshStandardMaterial
                        color="#000000"
                        emissive="#0a1628"
                        emissiveIntensity={0.4}
                        metalness={0.2}
                        roughness={0.1}
                    />
                </RoundedBox>

                {/* Screen content glow */}
                <RoundedBox
                    args={[0.85, 1.8, 0.001]}
                    radius={0.06}
                    smoothness={4}
                    position={[0, 0, 0.057]}
                >
                    <meshStandardMaterial
                        color="#111827"
                        emissive="#7DD3FC"
                        emissiveIntensity={0.08}
                        transparent
                        opacity={0.6}
                    />
                </RoundedBox>

                {/* Dynamic island */}
                <RoundedBox
                    args={[0.35, 0.1, 0.002]}
                    radius={0.05}
                    smoothness={4}
                    position={[0, 0.85, 0.056]}
                >
                    <meshStandardMaterial color="#000000" />
                </RoundedBox>

                {/* Camera bump */}
                <group position={[-0.25, 0.85, -0.055]}>
                    <mesh>
                        <cylinderGeometry args={[0.12, 0.12, 0.03, 16]} />
                        <meshPhysicalMaterial
                            color="#222"
                            metalness={0.9}
                            roughness={0.1}
                        />
                    </mesh>
                    <mesh position={[0, 0, 0]}>
                        <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
                        <meshStandardMaterial
                            color="#0a0a0a"
                            emissive="#1a1a3a"
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                </group>

                {/* Side button */}
                <mesh position={[0.56, 0.3, 0]}>
                    <boxGeometry args={[0.02, 0.25, 0.04]} />
                    <meshPhysicalMaterial
                        color="#2a2a2a"
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>
            </Float>
        </group>
    );
}

/* ─── Social Icon Particle ─── */
const SOCIAL_COLORS = [
    "#E1306C", // Instagram
    "#000000", // TikTok (will use white for visibility)
    "#FF0000", // YouTube
    "#1DA1F2", // Twitter
    "#0A66C2", // LinkedIn
    "#1877F2", // Facebook
    "#7DD3FC", // PromoGen accent
];

const SOCIAL_SYMBOLS = ["◆", "▲", "●", "■", "◇", "▼"];

function SocialParticle({ index, total }: { index: number; total: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const speed = useMemo(() => 0.4 + Math.random() * 0.6, []);
    const xOffset = useMemo(() => (Math.random() - 0.5) * 3, []);
    const zOffset = useMemo(() => (Math.random() - 0.5) * 2, []);
    const delay = useMemo(() => (index / total) * 8, [index, total]);
    const colorIdx = useMemo(() => index % SOCIAL_COLORS.length, [index]);
    const scale = useMemo(() => 0.04 + Math.random() * 0.06, []);
    const wobbleSpeed = useMemo(() => 1 + Math.random() * 2, []);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const t = clock.getElapsedTime() * speed + delay;
        const cycle = ((t % 8) / 8); // 0 to 1 cycle

        meshRef.current.position.x = xOffset + Math.sin(t * wobbleSpeed) * 0.3;
        meshRef.current.position.y = -4 + cycle * 10; // flow from -4 to +6
        meshRef.current.position.z = zOffset + Math.cos(t * wobbleSpeed * 0.7) * 0.2;

        // Fade in/out at edges
        const mat = meshRef.current.material as THREE.MeshStandardMaterial;
        const fade = Math.sin(cycle * Math.PI);
        mat.opacity = fade * 0.7;
        mat.emissiveIntensity = fade * 0.5;

        meshRef.current.rotation.z = t * 0.5;
        meshRef.current.rotation.y = t * 0.3;
    });

    const color = SOCIAL_COLORS[colorIdx];

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[scale, 0]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                transparent
                opacity={0.5}
            />
        </mesh>
    );
}

/* ─── Social Icon Rings — orbit around the stream ─── */
function SocialRing({
    index,
    total,
}: {
    index: number;
    total: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    const offset = (index / total) * Math.PI * 2;
    const yBase = useMemo(() => -2 + (index / total) * 6, [index, total]);
    const color = SOCIAL_COLORS[index % SOCIAL_COLORS.length];
    const radius = useMemo(() => 0.8 + Math.random() * 0.6, []);
    const speed = useMemo(() => 0.5 + Math.random() * 0.5, []);
    const size = useMemo(() => 0.06 + Math.random() * 0.04, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime() * speed + offset;
        ref.current.position.x = Math.cos(t) * radius;
        ref.current.position.z = Math.sin(t) * radius;
        ref.current.position.y = yBase + Math.sin(t * 2) * 0.3;
        ref.current.rotation.x = t;
        ref.current.rotation.z = t * 0.5;
    });

    return (
        <mesh ref={ref}>
            <octahedronGeometry args={[size, 0]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
                transparent
                opacity={0.8}
            />
        </mesh>
    );
}

/* ─── Glow beam — vertical light shaft ─── */
function DataBeam() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const mat = ref.current.material as THREE.MeshStandardMaterial;
        mat.opacity = 0.03 + Math.sin(clock.getElapsedTime() * 0.5) * 0.015;
    });

    return (
        <mesh ref={ref} position={[0, 1, 0]}>
            <cylinderGeometry args={[0.15, 0.6, 10, 16, 1, true]} />
            <meshStandardMaterial
                color="#7DD3FC"
                emissive="#7DD3FC"
                emissiveIntensity={0.3}
                transparent
                opacity={0.04}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

/* ─── Main Scene ─── */
function Scene() {
    const particleCount = 40;
    const ringCount = 18;

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.15} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
            <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#7DD3FC" />
            <pointLight position={[0, -3, 0]} intensity={0.5} color="#7DD3FC" distance={8} />
            <pointLight position={[0, 4, 0]} intensity={0.3} color="#38BDF8" distance={6} />

            {/* iPhones */}
            <group position={[0, 0.5, 0]}>
                {[0, 1, 2].map((i) => (
                    <IPhone key={i} index={i} total={3} />
                ))}
            </group>

            {/* Data stream beam */}
            <DataBeam />

            {/* Flowing particles */}
            {Array.from({ length: particleCount }).map((_, i) => (
                <SocialParticle key={`p-${i}`} index={i} total={particleCount} />
            ))}

            {/* Orbiting icon shapes */}
            {Array.from({ length: ringCount }).map((_, i) => (
                <SocialRing key={`r-${i}`} index={i} total={ringCount} />
            ))}
        </>
    );
}

/* ─── Export ─── */
export default function PhoneScene() {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 5,
            }}
        >
            <Canvas
                camera={{ position: [0, 1, 6], fov: 45 }}
                style={{ background: "transparent" }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
