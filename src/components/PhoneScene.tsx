"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

/* ─── Social media icon SVG paths (drawn to canvas) ─── */
type SocialPlatform = {
    name: string;
    color: string;
    draw: (ctx: CanvasRenderingContext2D, size: number) => void;
};

const SOCIALS: SocialPlatform[] = [
    {
        name: "Instagram",
        color: "#E1306C",
        draw: (ctx, s) => {
            const p = s * 0.2;
            const w = s - p * 2;
            const r = w * 0.25;
            ctx.beginPath();
            ctx.moveTo(p + r, p);
            ctx.lineTo(p + w - r, p);
            ctx.quadraticCurveTo(p + w, p, p + w, p + r);
            ctx.lineTo(p + w, p + w - r);
            ctx.quadraticCurveTo(p + w, p + w, p + w - r, p + w);
            ctx.lineTo(p + r, p + w);
            ctx.quadraticCurveTo(p, p + w, p, p + w - r);
            ctx.lineTo(p, p + r);
            ctx.quadraticCurveTo(p, p, p + r, p);
            ctx.closePath();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = s * 0.06;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(s / 2, s / 2, w * 0.26, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(p + w * 0.75, p + w * 0.25, s * 0.04, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
        },
    },
    {
        name: "TikTok",
        color: "#00f2ea",
        draw: (ctx, s) => {
            ctx.fillStyle = "#fff";
            ctx.font = `bold ${s * 0.55}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("♪", s / 2, s / 2);
            ctx.fillStyle = "rgba(255,0,80,0.5)";
            ctx.fillText("♪", s / 2 + s * 0.03, s / 2 - s * 0.02);
        },
    },
    {
        name: "YouTube",
        color: "#FF0000",
        draw: (ctx, s) => {
            const cx = s / 2, cy = s / 2;
            const w = s * 0.56, h = s * 0.38;
            const r = h * 0.3;
            ctx.beginPath();
            ctx.moveTo(cx - w / 2 + r, cy - h / 2);
            ctx.lineTo(cx + w / 2 - r, cy - h / 2);
            ctx.quadraticCurveTo(cx + w / 2, cy - h / 2, cx + w / 2, cy - h / 2 + r);
            ctx.lineTo(cx + w / 2, cy + h / 2 - r);
            ctx.quadraticCurveTo(cx + w / 2, cy + h / 2, cx + w / 2 - r, cy + h / 2);
            ctx.lineTo(cx - w / 2 + r, cy + h / 2);
            ctx.quadraticCurveTo(cx - w / 2, cy + h / 2, cx - w / 2, cy + h / 2 - r);
            ctx.lineTo(cx - w / 2, cy - h / 2 + r);
            ctx.quadraticCurveTo(cx - w / 2, cy - h / 2, cx - w / 2 + r, cy - h / 2);
            ctx.closePath();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = s * 0.04;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.07, cy - s * 0.1);
            ctx.lineTo(cx + s * 0.12, cy);
            ctx.lineTo(cx - s * 0.07, cy + s * 0.1);
            ctx.closePath();
            ctx.fillStyle = "#fff";
            ctx.fill();
        },
    },
    {
        name: "X",
        color: "#ffffff",
        draw: (ctx, s) => {
            ctx.fillStyle = "#fff";
            ctx.font = `bold ${s * 0.5}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("𝕏", s / 2, s / 2);
        },
    },
    {
        name: "LinkedIn",
        color: "#0A66C2",
        draw: (ctx, s) => {
            const p = s * 0.22;
            const w = s - p * 2;
            const r = w * 0.15;
            ctx.beginPath();
            ctx.moveTo(p + r, p);
            ctx.lineTo(p + w - r, p);
            ctx.quadraticCurveTo(p + w, p, p + w, p + r);
            ctx.lineTo(p + w, p + w - r);
            ctx.quadraticCurveTo(p + w, p + w, p + w - r, p + w);
            ctx.lineTo(p + r, p + w);
            ctx.quadraticCurveTo(p, p + w, p, p + w - r);
            ctx.lineTo(p, p + r);
            ctx.quadraticCurveTo(p, p, p + r, p);
            ctx.closePath();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = s * 0.04;
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.font = `bold ${s * 0.32}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("in", s / 2, s / 2 + s * 0.02);
        },
    },
    {
        name: "Facebook",
        color: "#1877F2",
        draw: (ctx, s) => {
            ctx.beginPath();
            ctx.arc(s / 2, s / 2, s * 0.32, 0, Math.PI * 2);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = s * 0.04;
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.font = `bold ${s * 0.4}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("f", s / 2, s / 2 + s * 0.02);
        },
    },
];

/* ─── Create icon texture from canvas ─── */
function createIconTexture(social: SocialPlatform): THREE.CanvasTexture {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    social.draw(ctx, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

/* ─── iPhone 17 Pro Max (STL model with titanium finish) ─── */
function IPhone({ index, total }: { index: number; total: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const offset = (index / total) * Math.PI * 2;
    const geometry = useLoader(STLLoader, "/models/iPhone_17_Pro_Max.stl");
    const screenTexture = useLoader(THREE.TextureLoader, "/models/phone_screen.png");

    // Titanium color variants — like real iPhone color options
    const colorVariant = useMemo(() => {
        const variants = [
            { body: "#4A4A50", emissive: "#2a3040", name: "Natural Titanium" },
            { body: "#2C2C30", emissive: "#1a1a2e", name: "Black Titanium" },
            { body: "#5C5C62", emissive: "#3a3a4e", name: "White Titanium" },
        ];
        return variants[index % variants.length];
    }, [index]);

    // Center, orient upright, and scale the STL geometry
    const { processedGeometry, screenDims } = useMemo(() => {
        const geo = geometry.clone();
        geo.computeBoundingBox();
        const box = geo.boundingBox!;
        const center = new THREE.Vector3();
        box.getCenter(center);
        geo.translate(-center.x, -center.y, -center.z);

        const size = new THREE.Vector3();
        box.getSize(size);

        // Rotate longest axis to Y (upright)
        const dims = [
            { axis: "x", val: size.x },
            { axis: "y", val: size.y },
            { axis: "z", val: size.z },
        ].sort((a, b) => b.val - a.val);

        if (dims[0].axis === "x") {
            geo.rotateZ(Math.PI / 2);
        } else if (dims[0].axis === "z") {
            geo.rotateX(Math.PI / 2);
        }

        geo.computeBoundingBox();
        const newBox = geo.boundingBox!;
        const newSize = new THREE.Vector3();
        newBox.getSize(newSize);
        const newCenter = new THREE.Vector3();
        newBox.getCenter(newCenter);
        geo.translate(-newCenter.x, -newCenter.y, -newCenter.z);

        // Ensure width (X) > depth (Z)
        if (newSize.z > newSize.x) {
            geo.rotateY(Math.PI / 2);
            geo.computeBoundingBox();
            const fixBox = geo.boundingBox!;
            const fixCenter = new THREE.Vector3();
            fixBox.getCenter(fixCenter);
            geo.translate(-fixCenter.x, -fixCenter.y, -fixCenter.z);
            fixBox.getSize(newSize);
        }

        // Flip 180° so camera bump is at top (model was upside down)
        geo.rotateZ(Math.PI);
        geo.computeBoundingBox();
        const flipBox = geo.boundingBox!;
        const flipCenter = new THREE.Vector3();
        flipBox.getCenter(flipCenter);
        geo.translate(-flipCenter.x, -flipCenter.y, -flipCenter.z);

        // Scale to target height
        const targetHeight = 2.2;
        const scale = targetHeight / newSize.y;
        geo.scale(scale, scale, scale);

        geo.computeBoundingBox();
        const finalBox = geo.boundingBox!;
        const finalSize = new THREE.Vector3();
        finalBox.getSize(finalSize);
        geo.computeVertexNormals();

        return {
            processedGeometry: geo,
            screenDims: {
                width: finalSize.x * 0.92,
                height: finalSize.y * 0.95,
                depth: finalSize.z,
            },
        };
    }, [geometry]);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime() * 0.3 + offset;
        const radius = 2.2;

        groupRef.current.position.x = Math.cos(t) * radius;
        groupRef.current.position.z = Math.sin(t) * radius;
        groupRef.current.position.y = Math.sin(t * 1.5) * 0.3;

        // Face outward from center
        groupRef.current.rotation.y = -t + Math.PI / 2;
        groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.06;
        groupRef.current.rotation.z = Math.cos(t * 0.6) * 0.04;
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.08} floatIntensity={0.2}>
                {/* Phone body — titanium finish */}
                <mesh geometry={processedGeometry}>
                    <meshPhysicalMaterial
                        color={colorVariant.body}
                        metalness={0.92}
                        roughness={0.22}
                        clearcoat={0.8}
                        clearcoatRoughness={0.15}
                        envMapIntensity={1.5}
                        emissive={colorVariant.emissive}
                        emissiveIntensity={0.1}
                        reflectivity={0.9}
                    />
                </mesh>

                {/* Screen texture overlay with rounded corners via alpha map */}
                <mesh position={[0, 0, screenDims.depth / 2 + 0.001]}>
                    <planeGeometry args={[screenDims.width, screenDims.height]} />
                    <meshStandardMaterial
                        map={screenTexture}
                        alphaMap={(() => {
                            const res = 256;
                            const canvas = document.createElement("canvas");
                            canvas.width = res;
                            canvas.height = res;
                            const ctx = canvas.getContext("2d")!;
                            const r = res * 0.12;
                            ctx.fillStyle = "#ffffff";
                            ctx.beginPath();
                            ctx.moveTo(r, 0);
                            ctx.lineTo(res - r, 0);
                            ctx.quadraticCurveTo(res, 0, res, r);
                            ctx.lineTo(res, res - r);
                            ctx.quadraticCurveTo(res, res, res - r, res);
                            ctx.lineTo(r, res);
                            ctx.quadraticCurveTo(0, res, 0, res - r);
                            ctx.lineTo(0, r);
                            ctx.quadraticCurveTo(0, 0, r, 0);
                            ctx.closePath();
                            ctx.fill();
                            const tex = new THREE.CanvasTexture(canvas);
                            tex.needsUpdate = true;
                            return tex;
                        })()}
                        emissive="#ffffff"
                        emissiveIntensity={0.2}
                        emissiveMap={screenTexture}
                        transparent
                        opacity={0.95}
                        toneMapped={false}
                    />
                </mesh>
            </Float>
        </group>
    );
}

/* ─── Social Icon Sprite — straight bottom-to-top flow ─── */
function SocialIcon({
    index,
    total,
    textures,
}: {
    index: number;
    total: number;
    textures: THREE.CanvasTexture[];
}) {
    const spriteRef = useRef<THREE.Sprite>(null);
    const socialIdx = index % SOCIALS.length;
    const texture = textures[socialIdx];
    const social = SOCIALS[socialIdx];

    const speed = useMemo(() => 0.3 + Math.random() * 0.5, []);
    const delay = useMemo(() => (index / total) * 10, [index, total]);
    const wobbleSpeed = useMemo(() => 0.6 + Math.random() * 1.2, []);
    const size = useMemo(() => 0.3 + Math.random() * 0.3, []);

    // Place icons in the visible area, spread across the scene
    // Keep out of the phone orbit center (radius ~2.2 around origin)
    const lane = useMemo(() => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 3.5 + Math.random() * 3.5; // outside phone orbit
        const x = Math.cos(angle) * dist;
        const z = Math.sin(angle) * dist;
        return { x, z };
    }, []);

    const material = useMemo(() => {
        return new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9,
            color: new THREE.Color(social.color),
            blending: THREE.AdditiveBlending,
        });
    }, [texture, social.color]);

    useFrame(({ clock }) => {
        if (!spriteRef.current) return;
        const t = clock.getElapsedTime() * speed + delay;
        const cycle = (t % 10) / 10;

        // Straight vertical movement with gentle horizontal wobble
        spriteRef.current.position.x = lane.x + Math.sin(t * wobbleSpeed) * 0.3;
        spriteRef.current.position.y = -5 + cycle * 14;
        spriteRef.current.position.z = lane.z;

        // Fade in/out at edges
        const fade = Math.sin(cycle * Math.PI);
        spriteRef.current.material.opacity = fade * 0.9;

        const pulse = 1 + Math.sin(t * 2) * 0.08;
        spriteRef.current.scale.set(size * pulse, size * pulse, 1);
    });

    return <sprite ref={spriteRef} material={material} scale={[size, size, 1]} />;
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

/* ─── Texture loader hook ─── */
function useIconTextures() {
    const textures = useMemo(() => {
        if (typeof document === "undefined") return [];
        return SOCIALS.map((s) => createIconTexture(s));
    }, []);
    return textures;
}

/* ─── Main Scene ─── */
function Scene() {
    const textures = useIconTextures();
    const streamCount = 60;

    if (textures.length === 0) return null;

    return (
        <>
            {/* Environment map for realistic reflections on titanium */}
            <Environment preset="city" />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffffff" />
            <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#7DD3FC" />
            <directionalLight position={[0, -2, -4]} intensity={0.25} color="#38BDF8" />
            <pointLight position={[0, -3, 0]} intensity={0.5} color="#7DD3FC" distance={8} />
            <pointLight position={[0, 4, 0]} intensity={0.35} color="#38BDF8" distance={6} />
            {/* Rim light for edge definition */}
            <spotLight
                position={[-4, 2, -3]}
                intensity={0.6}
                angle={0.5}
                penumbra={0.8}
                color="#7DD3FC"
            />

            {/* iPhones */}
            <group position={[0, 0.5, 0]}>
                {[0, 1, 2].map((i) => (
                    <IPhone key={i} index={i} total={3} />
                ))}
            </group>

            {/* Data stream beam */}
            <DataBeam />

            {/* Social icons — bottom to top only, in side lanes */}
            {Array.from({ length: streamCount }).map((_, i) => (
                <SocialIcon key={`s-${i}`} index={i} total={streamCount} textures={textures} />
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
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
