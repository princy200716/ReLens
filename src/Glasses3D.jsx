
import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function GlassesModel({
  lensColor = '#68dce8',
  frameColor = '#526d80',
}) {
  const leftLens = useRef(null)
  const rightLens = useRef(null)

  const frameMaterials = useRef([])
  const targetLensColor = useRef(new THREE.Color(lensColor))
  const targetFrameColor = useRef(new THREE.Color(frameColor))

  useEffect(() => {
    targetLensColor.current.set(lensColor)
  }, [lensColor])

  useEffect(() => {
    targetFrameColor.current.set(frameColor)
  }, [frameColor])

  useFrame((_, delta) => {
    const blend = 1 - Math.exp(-4 * delta)

    ;[leftLens.current, rightLens.current].forEach((material) => {
      if (material) {
        material.color.lerp(targetLensColor.current, blend)
      }
    })

    frameMaterials.current.forEach((material) => {
      if (material) {
        material.color.lerp(targetFrameColor.current, blend)
      }
    })
  })

  return (
    <group rotation={[0.12, -0.25, 0]}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.72, 0, 0]}>
          {/* Frame rims */}
          <mesh>
            <torusGeometry args={[0.57, 0.055, 16, 64]} />
            <meshStandardMaterial
              ref={(material) => {
                if (material) frameMaterials.current[side + 1] = material
              }}
              color={frameColor}
              metalness={0.8}
              roughness={0.22}
            />
          </mesh>

          {/* Coloured lenses */}
          <mesh position={[0, 0, -0.025]}>
            <circleGeometry args={[0.51, 64]} />
            <meshPhysicalMaterial
              ref={side === -1 ? leftLens : rightLens}
              color={lensColor}
              transparent
              opacity={0.88}
              roughness={0.18}
              metalness={0.05}
              emissive={lensColor}
              emissiveIntensity={0.18}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}

      {/* Center bridge */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.36, 0.075, 0.11]} />
        <meshStandardMaterial
          ref={(material) => {
            if (material) frameMaterials.current[0] = material
          }}
          color={frameColor}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Temple arms */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 1.4, 0.02, -0.42]}
          rotation={[0.15, side * 0.65, 0]}
        >
          <boxGeometry args={[0.95, 0.07, 0.09]} />
          <meshStandardMaterial
            ref={(material) => {
              if (material) frameMaterials.current[side + 3] = material
            }}
            color={frameColor}
            metalness={0.75}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Glasses3D({
  lensColor = '#68dce8',
  frameColor = '#526d80',
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5], fov: 42 }}
      style={{ width: '100%', height: '380px' }}
    >
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[3, 5, 5]}
        intensity={2.8}
      />

      <pointLight
        position={[-3, 2, 3]}
        color="#55e9e0"
        intensity={8}
      />

      <pointLight
        position={[3, -1, 2]}
        color="#b8dfff"
        intensity={4}
      />

      <GlassesModel
        lensColor={lensColor}
        frameColor={frameColor}
      />

      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.3}
        scale={5}
        blur={2}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        autoRotate
        autoRotateSpeed={0.8}
        rotateSpeed={0.7}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI * 2 / 3}
      />
    </Canvas>
  )
}
