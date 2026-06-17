import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useThemeColors } from '../../lib/themeColors'

/*
  WebGL "trust lattice": a volumetric point cloud (lime nodes) wired with faint
  violet edges, drifting slowly and parallaxing toward the cursor, with depth fog.
  Capability-gated by HeroBackdrop; Canvas 2D AsciiField is the guaranteed
  fallback. Frameloop pauses when off-screen.
*/

const COUNT = 460
const CONNECT = 1.7
const MAX_SEGMENTS = 1100

// seeded PRNG so geometry is deterministic (pure during render, stable across renders)
function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function Lattice({ node, edge }: { node: string; edge: string }) {
  const group = useRef<THREE.Group>(null)

  const { positions, lines } = useMemo(() => {
    const rng = mulberry32(0x7e2c91)
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < COUNT; i++) {
      pts.push(
        new THREE.Vector3(
          (rng() - 0.5) * 16,
          (rng() - 0.5) * 10,
          (rng() - 0.5) * 8,
        ),
      )
    }
    const positions = new Float32Array(COUNT * 3)
    pts.forEach((p, i) => {
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    })
    const seg: number[] = []
    let count = 0
    for (let i = 0; i < COUNT && count < MAX_SEGMENTS; i++) {
      for (let j = i + 1; j < COUNT && count < MAX_SEGMENTS; j++) {
        if (pts[i].distanceTo(pts[j]) < CONNECT) {
          seg.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
          count++
        }
      }
    }
    return { positions, lines: new Float32Array(seg) }
  }, [])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    g.rotation.y += delta * 0.03
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.18, 0.04)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, state.pointer.x * 0.08, 0.04)
  })

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color={node}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={edge} transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

export function WebGLLattice({ className }: { className?: string }) {
  const colors = useThemeColors()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className={className}>
      <Canvas
        dpr={dpr}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6.5], fov: 62 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={[colors.bg, 5, 15]} />
        <Lattice node={colors.accent} edge={colors.accent2} />
      </Canvas>
    </div>
  )
}
