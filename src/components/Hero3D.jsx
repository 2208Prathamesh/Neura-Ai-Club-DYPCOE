import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { asset } from '../utils.js'

const COUNT = 9000
const WORLD_W = 7
const REVEAL_AT = 3.0

function makeSprite() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.7)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

// Sample the real logo image: positions AND colours come from its pixels.
function buildData(img) {
  const W = 440
  const H = Math.round((W * img.height) / img.width)
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0, W, H)
  const px = ctx.getImageData(0, 0, W, H).data

  const pts = []
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4
      if (px[i + 3] > 90) pts.push([x, y, px[i], px[i + 1], px[i + 2]])
    }
  }
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pts[i], pts[j]] = [pts[j], pts[i]]
  }

  const s = WORLD_W / W
  const targets = new Float32Array(COUNT * 3)
  const starts = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)
  const delays = new Float32Array(COUNT)
  const swirl = new Float32Array(COUNT)
  const col = new THREE.Color()

  for (let i = 0; i < COUNT; i++) {
    const [x, y, r, g, b] = pts[i % pts.length]
    const i3 = i * 3
    targets[i3] = (x - W / 2) * s + (Math.random() - 0.5) * 0.02
    targets[i3 + 1] = -(y - H / 2) * s + (Math.random() - 0.5) * 0.02
    targets[i3 + 2] = (Math.random() - 0.5) * 0.3

    const u = Math.random() * 2 - 1
    const a = Math.random() * Math.PI * 2
    const rad = 7 + Math.random() * 9
    const q = Math.sqrt(1 - u * u)
    starts[i3] = rad * q * Math.cos(a)
    starts[i3 + 1] = rad * u
    starts[i3 + 2] = rad * q * Math.sin(a)

    delays[i] = Math.random() * 1.2
    swirl[i] = Math.random() * 2 - 1

    col.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace)
    colors[i3] = col.r
    colors[i3 + 1] = col.g
    colors[i3 + 2] = col.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(starts), 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return { geometry, targets, starts, delays, swirl }
}

function LogoReveal({ reduced }) {
  const group = useRef()
  const pointsMat = useRef()
  const planeMat = useRef()
  const { viewport } = useThree()
  const tex = useLoader(THREE.TextureLoader, asset('logo-mark.png'))
  const sprite = useMemo(makeSprite, [])
  const data = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    return buildData(tex.image)
  }, [tex])
  const aspect = tex.image.height / tex.image.width

  useFrame((state) => {
    const t = state.clock.elapsedTime + (reduced ? 10 : 0)
    const arr = data.geometry.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const p = Math.min(1, Math.max(0, (t - 0.2 - data.delays[i]) / 2.6))
      const e = 1 - Math.pow(1 - p, 4)
      const k = 1 - e
      const curve = Math.sin(p * Math.PI) * 0.9 * data.swirl[i]
      arr[i3] = data.targets[i3] + (data.starts[i3] - data.targets[i3]) * k + curve + Math.sin(t * 1.6 + i) * 0.01
      arr[i3 + 1] = data.targets[i3 + 1] + (data.starts[i3 + 1] - data.targets[i3 + 1]) * k + Math.cos(t * 1.3 + i) * 0.01
      arr[i3 + 2] = data.targets[i3 + 2] + (data.starts[i3 + 2] - data.targets[i3 + 2]) * k
    }
    data.geometry.attributes.position.needsUpdate = true

    // Once the swarm has formed, the real logo artwork fades in on top.
    const r = Math.min(1, Math.max(0, (t - REVEAL_AT) / 1.2))
    const er = 1 - Math.pow(1 - r, 3)
    planeMat.current.opacity = er
    pointsMat.current.opacity = 1 - 0.6 * er

    const g = group.current
    g.scale.setScalar(Math.min(0.55, (viewport.width * 0.8) / WORLD_W))
    g.position.y = viewport.height * 0.16
    g.rotation.y = Math.sin(t * 0.5) * 0.25 + state.pointer.x * 0.35
    g.rotation.x = -state.pointer.y * 0.2
  })

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[WORLD_W, WORLD_W * aspect]} />
        <meshBasicMaterial ref={planeMat} map={tex} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
      <points geometry={data.geometry}>
        <pointsMaterial
          ref={pointsMat}
          map={sprite}
          size={0.09}
          sizeAttenuation
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

function Backdrop() {
  const wire = useRef()
  const stars = useRef()
  const starGeo = useMemo(() => {
    const n = 900
    const p = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1
      const a = Math.random() * Math.PI * 2
      const r = 10 + Math.random() * 8
      const q = Math.sqrt(1 - u * u)
      p[i * 3] = r * q * Math.cos(a)
      p[i * 3 + 1] = r * u
      p[i * 3 + 2] = r * q * Math.sin(a)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(p, 3))
    return g
  }, [])
  const sprite = useMemo(makeSprite, [])

  useFrame((state, dt) => {
    wire.current.rotation.y += dt * 0.08
    wire.current.rotation.x += dt * 0.04
    stars.current.rotation.y += dt * 0.02
  })

  return (
    <>
      <mesh ref={wire} position={[0, 1, -3]}>
        <icosahedronGeometry args={[5.2, 1]} />
        <meshBasicMaterial color="#6d28d9" wireframe transparent opacity={0.13} />
      </mesh>
      <points ref={stars} geometry={starGeo}>
        <pointsMaterial
          map={sprite}
          size={0.14}
          color="#a78bfa"
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

export default function Hero3D({ reduced = false }) {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Backdrop />
      <Suspense fallback={null}>
        <LogoReveal reduced={reduced} />
      </Suspense>
    </Canvas>
  )
}
