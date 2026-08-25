'use client'

import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react'
import * as THREE from 'three'
import type { VeraMode } from '../store/veraStore'

// ─── SEEDED RNG ─────────────────────────────────────────────────────────────
function mulberry32(a: number) {
  return function() {
    let t = (a += 0x6D2B79F5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = mulberry32(42)

// ─── CONFIG ─────────────────────────────────────────────────────────────────

const INNER_COUNT = 150
const INNER_SEED = 3
const INNER_ATTACH = 3
const INNER_MIN_R = 0.15
const INNER_MAX_R = 0.5

const OUTER_COUNT = 4500
const OUTER_MIN_R = 0.9
const OUTER_MAX_R = 2.0

// Bumped up so nucleus is visible without glow mesh
const INNER_DOT_RADIUS = 0.012
const OUTER_DOT_RADIUS = 0.012

const COLOR_OUTER = new THREE.Color('#A0A3A8')
const COLOR_INNER_IDLE = new THREE.Color('#4ECA5C')
const COLOR_INNER_HUB = new THREE.Color('#9FFF60')
const COLOR_ACTIVE = new THREE.Color('#D9F70F')
const COLOR_EDGE_HIGHLIGHT = new THREE.Color('#C8FF30')
const COLOR_EDGE_BASE = new THREE.Color('#4ECA5C')
const COLOR_BRIDGE = new THREE.Color('#D9F70F')
const BG_COLOR = 0x090909

const EDGE_BASE_ALPHA = 0.55
const EDGE_HIGHLIGHT_ALPHA = 0.95
const BRIDGE_BASE_ALPHA = 0.0
const BRIDGE_HIGHLIGHT_ALPHA = 0.85

const WOBBLE_OUTER = 0.0015
const WOBBLE_INNER = 0.0
const WOBBLE_SPEED = 0.2

const ASSEMBLY_DELAY_SPAN = 0
const ASSEMBLY_DURATION = 1
const ASSEMBLY_FLIGHT_MIN = 0
const ASSEMBLY_FLIGHT_JITTER = 0

const PULSE_SPEED = 2
const ACTIVATION_DECAY = 0.985
const EDGE_ACTIVATION_DECAY = 0.97
const BASE_THINK_MIN_MS = 1600
const BASE_THINK_MAX_MS = 3400
const HOVER_THINK_MIN_MS = 120
const HOVER_THINK_MAX_MS = 350
const MAX_CONCURRENT_PULSES = 6
const HOVER_TRIGGER_COOLDOWN_MS = 180
const HOVER_BURST_COUNT = 3

const IDLE_ROT_SPEED = 0.055
const HOVER_ROT_GAIN = 0.85
const HOVER_TILT_MAX = 0.32
const ROTATION_EASE = 0.045

const MAX_BRIDGES = 120

// ─── TYPES ──────────────────────────────────────────────────────────────────

export interface VeraGraphHandle {
  setMode: (mode: VeraMode) => void
  pulse: (targetIndex?: number) => void
}

interface Pulse {
  path: number[]
  t: number
}

interface Bridge {
  innerIdx: number
  outerIdx: number
  t: number
  active: boolean
}

const VeraGraph = forwardRef<VeraGraphHandle>((_props, ref) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const modeRef = useRef<VeraMode>('hero')

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth || 900
    const height = mount.clientHeight || 900
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

    // ── SCENE / CAMERA / RENDERER ──────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(BG_COLOR, 0.075)

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    const cameraBase = new THREE.Vector3(-0.7, 0.2, 6.4)
    camera.position.copy(cameraBase)

    const graphGroup = new THREE.Group()
    graphGroup.position.set(1.7, 0, 0)
    scene.add(graphGroup)

    const lookTarget = new THREE.Vector3(1.7, 0, 0)
    camera.lookAt(lookTarget)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(pixelRatio)
    mount.appendChild(renderer.domElement)

    // ── INNER GRAPH TOPOLOGY (Barabási-Albert) ─────────────────────────────
    const degree = new Int32Array(INNER_COUNT)
    const adjacency: number[][] = Array.from({ length: INNER_COUNT }, () => [])
    const edgeList: [number, number][] = []
    const edgeIndexMap = new Map<string, number>()
    const attachPool: number[] = []

    // FIX: unescaped template literal so the key is actually unique per edge
    const edgeKey = (a: number, b: number) => (a < b ? `${a}_${b}` : `${b}_${a}`)

    function addEdge(a: number, b: number) {
      if (a === b) return
      const key = edgeKey(a, b)
      if (edgeIndexMap.has(key)) return
      edgeIndexMap.set(key, edgeList.length)
      edgeList.push([a, b])
      adjacency[a].push(b)
      adjacency[b].push(a)
      degree[a]++
      degree[b]++
      attachPool.push(a, b)
    }

    for (let i = 0; i < INNER_SEED; i++) {
      for (let j = i + 1; j < INNER_SEED; j++) addEdge(i, j)
    }
    for (let i = INNER_SEED; i < INNER_COUNT; i++) {
      const chosen = new Set<number>()
      let guard = 0
      while (chosen.size < Math.min(INNER_ATTACH, i) && guard < 50) {
        guard++
        const useWeighted = attachPool.length > 0 && rand() < 0.82
        const pick = useWeighted
          ? attachPool[Math.floor(rand() * attachPool.length)]
          : Math.floor(rand() * i)
        if (pick !== i) chosen.add(pick)
      }
      for (const t of chosen) addEdge(i, t)
    }

    // VALIDATION: refuse to boot if the graph invariant is violated
    const expectedEdges = INNER_COUNT * INNER_ATTACH * 0.5
    if (edgeList.length < expectedEdges) {
      throw new Error(
        `Graph construction failed: expected ~${expectedEdges} edges, got ${edgeList.length}. ` +
        `Check edgeKey and addEdge logic.`
      )
    }

    const edgeCount = edgeList.length
    const maxDegree = Math.max(1, ...Array.from(degree))

    function bfsPath(source: number, target: number): number[] {
      if (source === target) return [source]
      const prev = new Int32Array(INNER_COUNT).fill(-1)
      const visited = new Uint8Array(INNER_COUNT)
      visited[source] = 1
      const queue = [source]
      let qi = 0
      while (qi < queue.length) {
        const cur = queue[qi++]
        if (cur === target) break
        for (const nb of adjacency[cur]) {
          if (!visited[nb]) {
            visited[nb] = 1
            prev[nb] = cur
            queue.push(nb)
          }
        }
      }
      if (!visited[target]) return []
      const path: number[] = []
      let cur = target
      while (cur !== -1) {
        path.unshift(cur)
        if (cur === source) break
        cur = prev[cur]
      }
      return path
    }

    // ── SPHERE SAMPLER ─────────────────────────────────────────────────────
    function sampleSpherePoint(minR: number, maxR: number, out: THREE.Vector3) {
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const u = rand()
      const r = minR + (maxR - minR) * Math.pow(0.55 + 0.45 * u, 1 / 3)
      out.set(
        Math.sin(phi) * Math.cos(theta) * r,
        Math.sin(phi) * Math.sin(theta) * r,
        Math.cos(phi) * r
      )
      return r
    }

    // ── BUILD CLOUDS ────────────────────────────────────────────────────────
    function buildCloud(count: number, minR: number, maxR: number) {
      const finalPos = new Float32Array(count * 3)
      const startPos = new Float32Array(count * 3)
      const delay = new Float32Array(count)
      const radius = new Float32Array(count)
      const wobbleSeed = new Float32Array(count * 3)
      const v = new THREE.Vector3()
      let maxRadiusSeen = 0
      for (let i = 0; i < count; i++) {
        const r = sampleSpherePoint(minR, maxR, v)
        radius[i] = r
        maxRadiusSeen = Math.max(maxRadiusSeen, r)
        finalPos[i * 3] = v.x
        finalPos[i * 3 + 1] = v.y
        finalPos[i * 3 + 2] = v.z
        const dir = v.clone().normalize()
        const flight = ASSEMBLY_FLIGHT_MIN + rand() * ASSEMBLY_FLIGHT_JITTER
        const s = dir.multiplyScalar(r + flight)
        startPos[i * 3] = s.x
        startPos[i * 3 + 1] = s.y
        startPos[i * 3 + 2] = s.z
        wobbleSeed[i * 3] = rand() * 1000
        wobbleSeed[i * 3 + 1] = rand() * 1000
        wobbleSeed[i * 3 + 2] = rand() * 1000
      }
      for (let i = 0; i < count; i++) {
        const norm = maxRadiusSeen > 0 ? radius[i] / maxRadiusSeen : 1
        delay[i] = (1 - norm) * ASSEMBLY_DELAY_SPAN
      }
      return { finalPos, startPos, delay, radius, wobbleSeed, count }
    }

    const inner = buildCloud(INNER_COUNT, INNER_MIN_R, INNER_MAX_R)
    const outer = buildCloud(OUTER_COUNT, OUTER_MIN_R, OUTER_MAX_R)
    for (let i = 0; i < inner.count; i++) inner.delay[i] += ASSEMBLY_DELAY_SPAN * 0.55

    // ── NUCLEUS / EXTERIOR POOLS ───────────────────────────────────────────
    const sortedByRadius = Array.from({ length: INNER_COUNT }, (_, i) => i).sort(
      (a, b) => inner.radius[a] - inner.radius[b]
    )
    const nucleusIndices = sortedByRadius.slice(0, Math.max(3, Math.floor(INNER_COUNT * 0.06)))
    const exteriorIndices = sortedByRadius.slice(Math.floor(INNER_COUNT * 0.70))

    // ── INNER → OUTER BRIDGE MAP ───────────────────────────────────────────
    const innerToOuterBridges: number[][] = Array.from({ length: INNER_COUNT }, () => [])
    const tmpA = new THREE.Vector3()
    const tmpB = new THREE.Vector3()
    for (let i = 0; i < INNER_COUNT; i++) {
      tmpA.set(inner.finalPos[i * 3], inner.finalPos[i * 3 + 1], inner.finalPos[i * 3 + 2])
      const dists: { idx: number; d2: number }[] = []
      for (let o = 0; o < OUTER_COUNT; o++) {
        tmpB.set(outer.finalPos[o * 3], outer.finalPos[o * 3 + 1], outer.finalPos[o * 3 + 2])
        const d2 = tmpA.distanceToSquared(tmpB)
        dists.push({ idx: o, d2 })
      }
      dists.sort((a, b) => a.d2 - b.d2)
      innerToOuterBridges[i] = dists.slice(0, 2).map((d) => d.idx)
    }

    // ── STATE ARRAYS ───────────────────────────────────────────────────────
    const innerActivation = new Float32Array(INNER_COUNT)
    const edgeActivation = new Float32Array(edgeCount)
    const innerIdleColor: THREE.Color[] = []
    for (let i = 0; i < INNER_COUNT; i++) {
      const norm = degree[i] / maxDegree
      innerIdleColor.push(COLOR_INNER_IDLE.clone().lerp(COLOR_INNER_HUB, Math.min(1, norm)))
    }

    // ── OUTER MESH ─────────────────────────────────────────────────────────
    const outerGeo = new THREE.IcosahedronGeometry(OUTER_DOT_RADIUS, 0)
    const outerMat = new THREE.MeshBasicMaterial({
      color: COLOR_OUTER,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
    const outerMesh = new THREE.InstancedMesh(outerGeo, outerMat, OUTER_COUNT)
    graphGroup.add(outerMesh)

    // ── INNER MESH ─────────────────────────────────────────────────────────
    const innerGeo = new THREE.IcosahedronGeometry(INNER_DOT_RADIUS, 1)
    const innerMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: true,
    })
    const innerMesh = new THREE.InstancedMesh(innerGeo, innerMat, INNER_COUNT)

    // CRITICAL: initialize instanceColor so dots render with correct colors
    const innerColors = new Float32Array(INNER_COUNT * 3)
    for (let i = 0; i < INNER_COUNT; i++) {
      innerColors[i * 3] = innerIdleColor[i].r
      innerColors[i * 3 + 1] = innerIdleColor[i].g
      innerColors[i * 3 + 2] = innerIdleColor[i].b
    }
    innerMesh.instanceColor = new THREE.InstancedBufferAttribute(innerColors, 3)
    graphGroup.add(innerMesh)

    // ── INNER EDGES ────────────────────────────────────────────────────────
    const edgePositions = new Float32Array(edgeCount * 2 * 3)
    const edgeColors = new Float32Array(edgeCount * 2 * 4)
    const edgeGeo = new THREE.BufferGeometry()
    const edgePosAttr = new THREE.BufferAttribute(edgePositions, 3).setUsage(THREE.DynamicDrawUsage)
    const edgeColorAttr = new THREE.BufferAttribute(edgeColors, 4).setUsage(THREE.DynamicDrawUsage)
    edgeGeo.setAttribute('position', edgePosAttr)
    edgeGeo.setAttribute('aColor', edgeColorAttr)

    const edgeMat = new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        attribute vec4 aColor;
        varying vec4 vColor;
        void main() {
          vColor = aColor;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec4 vColor;
        void main() {
          gl_FragColor = vColor;
        }
      `,
      transparent: true,
      depthWrite: false,
    })
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat)
    graphGroup.add(edgeLines)

    // ── OUTER BRIDGES ──────────────────────────────────────────────────────
    const bridgePositions = new Float32Array(MAX_BRIDGES * 2 * 3)
    const bridgeColors = new Float32Array(MAX_BRIDGES * 2 * 4)
    const bridgeGeo = new THREE.BufferGeometry()
    const bridgePosAttr = new THREE.BufferAttribute(bridgePositions, 3).setUsage(THREE.DynamicDrawUsage)
    const bridgeColorAttr = new THREE.BufferAttribute(bridgeColors, 4).setUsage(THREE.DynamicDrawUsage)
    bridgeGeo.setAttribute('position', bridgePosAttr)
    bridgeGeo.setAttribute('aColor', bridgeColorAttr)

    const bridgeMat = new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        attribute vec4 aColor;
        varying vec4 vColor;
        void main() {
          vColor = aColor;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec4 vColor;
        void main() {
          gl_FragColor = vColor;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const bridgeLines = new THREE.LineSegments(bridgeGeo, bridgeMat)
    graphGroup.add(bridgeLines)

    const bridges: Bridge[] = Array.from({ length: MAX_BRIDGES }, () => ({
      innerIdx: 0,
      outerIdx: 0,
      t: 0,
      active: false,
    }))
    let nextBridgeSlot = 0

    function spawnBridge(innerIdx: number) {
      const candidates = innerToOuterBridges[innerIdx]
      if (!candidates || candidates.length === 0) return
      const outerIdx = candidates[Math.floor(rand() * candidates.length)]
      const b = bridges[nextBridgeSlot]
      b.innerIdx = innerIdx
      b.outerIdx = outerIdx
      b.t = 0
      b.active = true
      nextBridgeSlot = (nextBridgeSlot + 1) % MAX_BRIDGES
    }

    // ── HIT SPHERE ─────────────────────────────────────────────────────────
    const hitGeo = new THREE.SphereGeometry(OUTER_MAX_R, 16, 16)
    const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    const hitSphere = new THREE.Mesh(hitGeo, hitMat)
    graphGroup.add(hitSphere)

    // ── PULSE STATE ────────────────────────────────────────────────────────
    const pulses: Pulse[] = []
    let nextAutoThink = performance.now() + 800
    let lastHoverTrigger = 0

    function triggerRadialBurst(count: number, fixedTarget?: number) {
      for (let k = 0; k < count; k++) {
        const source = nucleusIndices[Math.floor(rand() * nucleusIndices.length)]
        let target: number
        if (fixedTarget !== undefined) {
          target = fixedTarget
        } else {
          target = exteriorIndices[Math.floor(rand() * exteriorIndices.length)]
        }
        if (source === target) continue
        const path = bfsPath(source, target)
        if (path.length >= 2) pulses.push({ path, t: 0 })
      }
    }

    function pulseNow(targetIndex?: number) {
      triggerRadialBurst(1, targetIndex)
    }

    const onThinkEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail || {}
      pulseNow(detail.targetIndex)
    }
    window.addEventListener('vera-think', onThinkEvent as EventListener)

    // ── INTERACTION ─────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const pointerNDC = new THREE.Vector2(999, 999)
    let pointerActive = false
    const nearestPoint = new THREE.Vector3()

    function findNearestInnerNode(localPoint: THREE.Vector3): number {
      let best = -1
      let bestD2 = Infinity
      for (let i = 0; i < INNER_COUNT; i++) {
        const dx = inner.finalPos[i * 3] - localPoint.x
        const dy = inner.finalPos[i * 3 + 1] - localPoint.y
        const dz = inner.finalPos[i * 3 + 2] - localPoint.z
        const d2 = dx * dx + dy * dy + dz * dz
        if (d2 < bestD2) {
          bestD2 = d2
          best = i
        }
      }
      return best
    }

    function updatePointer(clientX: number, clientY: number) {
      if (!mount) return
      const rect = mount.getBoundingClientRect()
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1
      const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
      pointerActive = inside

      if (!inside) return
      raycaster.setFromCamera(pointerNDC, camera)
      const hits = raycaster.intersectObject(hitSphere)
      if (hits.length === 0) return
      graphGroup.worldToLocal(nearestPoint.copy(hits[0].point))
      const now = performance.now()
      if (now - lastHoverTrigger > HOVER_TRIGGER_COOLDOWN_MS) {
        lastHoverTrigger = now
        const nearest = findNearestInnerNode(nearestPoint)
        if (nearest === -1) return
        const targets: number[] = []
        for (let k = 0; k < HOVER_BURST_COUNT; k++) {
          targets.push(exteriorIndices[Math.floor(rand() * exteriorIndices.length)])
        }
        for (const t of targets) {
          const path = bfsPath(nearest, t)
          if (path.length >= 2) pulses.push({ path, t: 0 })
        }
      }
    }

    const onPointerMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY)
    const onPointerDown = (e: PointerEvent) => updatePointer(e.clientX, e.clientY)
    const onPointerLeave = () => {
      pointerActive = false
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    mount.addEventListener('pointerdown', onPointerDown, { passive: true })
    mount.addEventListener('pointerleave', onPointerLeave)
    mount.addEventListener('pointercancel', onPointerLeave)

    // ── ANIMATION SCRATCH ──────────────────────────────────────────────────
    const dummy = new THREE.Object3D()
    const colorScratch = new THREE.Color()
    const posVec = new THREE.Vector3()

    let raf = 0
    let last = performance.now()
    const startTime = performance.now()

    let rotY = 0
    let rotX = 0
    let rotYVel = IDLE_ROT_SPEED
    let hoverIntensity = 0

    function stepCloud(
      cloud: ReturnType<typeof buildCloud>,
      mesh: THREE.InstancedMesh,
      elapsed: number,
      t: number,
      wobbleAmp: number,
      writeColor: (i: number, scale: number) => void
    ) {
      for (let i = 0; i < cloud.count; i++) {
        const fx = cloud.finalPos[i * 3]
        const fy = cloud.finalPos[i * 3 + 1]
        const fz = cloud.finalPos[i * 3 + 2]

        const wx = Math.sin(t * WOBBLE_SPEED + cloud.wobbleSeed[i * 3]) * wobbleAmp
        const wy = Math.cos(t * WOBBLE_SPEED + cloud.wobbleSeed[i * 3 + 1]) * wobbleAmp
        const wz = Math.sin(t * WOBBLE_SPEED + cloud.wobbleSeed[i * 3 + 2]) * wobbleAmp

        posVec.set(fx + wx, fy + wy, fz + wz)
        dummy.position.copy(posVec)
        dummy.scale.setScalar(1.0)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        writeColor(i, 1.0)
      }
      mesh.instanceMatrix.needsUpdate = true
    }

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const elapsed = now - startTime
      const t = elapsed / 1000

      // ── hover intensity smoothing ──
      const targetHover = pointerActive ? 1 : 0
      hoverIntensity += (targetHover - hoverIntensity) * 0.08

      // ── auto think ──
      const thinkMin = BASE_THINK_MIN_MS * (1 - hoverIntensity * 0.92) + HOVER_THINK_MIN_MS * hoverIntensity
      const thinkMax = BASE_THINK_MAX_MS * (1 - hoverIntensity * 0.92) + HOVER_THINK_MAX_MS * hoverIntensity
      if (now > nextAutoThink && pulses.length < MAX_CONCURRENT_PULSES) {
        triggerRadialBurst(1 + Math.floor(hoverIntensity * 2))
        nextAutoThink = now + thinkMin + Math.random() * (thinkMax - thinkMin)
      }

      // ── advance inner pulses ──
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p]
        pulse.t += dt * PULSE_SPEED
        const maxT = pulse.path.length - 1
        if (pulse.t >= maxT) {
          const terminal = pulse.path[pulse.path.length - 1]
          innerActivation[terminal] = 1
          if (inner.radius[terminal] > INNER_MAX_R * 0.75) {
            spawnBridge(terminal)
          }
          pulses.splice(p, 1)
          continue
        }
        const segIdx = Math.floor(pulse.t)
        const localT = pulse.t - segIdx
        const a = pulse.path[segIdx]
        const b = pulse.path[segIdx + 1]
        innerActivation[a] = Math.max(innerActivation[a], 1 - localT * 0.4)
        innerActivation[b] = Math.max(innerActivation[b], localT)
        const ei = edgeIndexMap.get(edgeKey(a, b))
        if (ei !== undefined) edgeActivation[ei] = 1
      }
      for (let i = 0; i < INNER_COUNT; i++) innerActivation[i] *= ACTIVATION_DECAY
      for (let e = 0; e < edgeCount; e++) edgeActivation[e] *= EDGE_ACTIVATION_DECAY

      // ── advance bridges ──
      for (let b = 0; b < MAX_BRIDGES; b++) {
        const br = bridges[b]
        if (!br.active) continue
        br.t += dt * 3.5
        if (br.t >= 1.5) {
          br.active = false
          br.t = 0
        }
      }

      // ── rotation ──
      // modeRef.current is available here for mode-driven rotation tweaks in step 4
      const targetYVel = pointerActive ? IDLE_ROT_SPEED + pointerNDC.x * HOVER_ROT_GAIN : IDLE_ROT_SPEED
      rotYVel += (targetYVel - rotYVel) * ROTATION_EASE
      rotY += rotYVel * dt
      const targetTilt = pointerActive ? -pointerNDC.y * HOVER_TILT_MAX : 0
      rotX += (targetTilt - rotX) * ROTATION_EASE
      graphGroup.rotation.y = rotY
      graphGroup.rotation.x = rotX

      // ── outer cloud ──
      stepCloud(outer, outerMesh, elapsed, t, WOBBLE_OUTER, () => {})

      // ── inner cloud ──
      stepCloud(inner, innerMesh, elapsed, t, WOBBLE_INNER, (i) => {
        const act = innerActivation[i]
        // Floor activation so nucleus never fades to invisibility
        const visibleAct = Math.max(act, 0.25)
        colorScratch.copy(innerIdleColor[i]).lerp(COLOR_ACTIVE, Math.min(1, visibleAct))
        innerMesh.setColorAt(i, colorScratch)
      })

      if (innerMesh.instanceColor) innerMesh.instanceColor.needsUpdate = true

      // ── write inner edges ──
      for (let e = 0; e < edgeCount; e++) {
        const [a, b] = edgeList[e]
        const ax = inner.finalPos[a * 3]
        const ay = inner.finalPos[a * 3 + 1]
        const az = inner.finalPos[a * 3 + 2]
        const bx = inner.finalPos[b * 3]
        const by = inner.finalPos[b * 3 + 1]
        const bz = inner.finalPos[b * 3 + 2]

        const base = e * 6
        edgePositions[base] = ax
        edgePositions[base + 1] = ay
        edgePositions[base + 2] = az
        edgePositions[base + 3] = bx
        edgePositions[base + 4] = by
        edgePositions[base + 5] = bz

        const act = edgeActivation[e]
        const cBase = e * 8
        const col = act > 0.02
          ? colorScratch.copy(COLOR_EDGE_BASE).lerp(COLOR_EDGE_HIGHLIGHT, act)
          : colorScratch.copy(COLOR_EDGE_BASE)

        const alpha = EDGE_BASE_ALPHA + (EDGE_HIGHLIGHT_ALPHA - EDGE_BASE_ALPHA) * act
        edgeColors[cBase] = col.r; edgeColors[cBase + 1] = col.g; edgeColors[cBase + 2] = col.b; edgeColors[cBase + 3] = alpha
        edgeColors[cBase + 4] = col.r; edgeColors[cBase + 5] = col.g; edgeColors[cBase + 6] = col.b; edgeColors[cBase + 7] = alpha
      }
      edgePosAttr.needsUpdate = true
      edgeColorAttr.needsUpdate = true

      // ── write outer bridges ──
      for (let b = 0; b < MAX_BRIDGES; b++) {
        const br = bridges[b]
        const base = b * 6
        const cBase = b * 8
        if (!br.active) {
          bridgePositions[base] = 0; bridgePositions[base + 1] = 0; bridgePositions[base + 2] = 0
          bridgePositions[base + 3] = 0; bridgePositions[base + 4] = 0; bridgePositions[base + 5] = 0
          bridgeColors[cBase + 3] = 0; bridgeColors[cBase + 7] = 0
          continue
        }

        const ix = inner.finalPos[br.innerIdx * 3]
        const iy = inner.finalPos[br.innerIdx * 3 + 1]
        const iz = inner.finalPos[br.innerIdx * 3 + 2]
        const ox = outer.finalPos[br.outerIdx * 3]
        const oy = outer.finalPos[br.outerIdx * 3 + 1]
        const oz = outer.finalPos[br.outerIdx * 3 + 2]

        const travel = Math.min(1, br.t)
        const fade = br.t > 1 ? Math.max(0, 1 - (br.t - 1) * 2.5) : 1

        const mx = ix + (ox - ix) * travel
        const my = iy + (oy - iy) * travel
        const mz = iz + (oz - iz) * travel

        bridgePositions[base] = ix
        bridgePositions[base + 1] = iy
        bridgePositions[base + 2] = iz
        bridgePositions[base + 3] = mx
        bridgePositions[base + 4] = my
        bridgePositions[base + 5] = mz

        const alpha = (BRIDGE_BASE_ALPHA + (BRIDGE_HIGHLIGHT_ALPHA - BRIDGE_BASE_ALPHA) * travel) * fade
        bridgeColors[cBase] = COLOR_BRIDGE.r
        bridgeColors[cBase + 1] = COLOR_BRIDGE.g
        bridgeColors[cBase + 2] = COLOR_BRIDGE.b
        bridgeColors[cBase + 3] = alpha
        bridgeColors[cBase + 4] = COLOR_BRIDGE.r
        bridgeColors[cBase + 5] = COLOR_BRIDGE.g
        bridgeColors[cBase + 6] = COLOR_BRIDGE.b
        bridgeColors[cBase + 7] = alpha * 0.6
      }
      bridgePosAttr.needsUpdate = true
      bridgeColorAttr.needsUpdate = true

      // ── camera drift ──
      const driftX = Math.sin(t * 0.05) * 0.18
      const driftY = Math.cos(t * 0.037) * 0.1
      camera.position.set(cameraBase.x + driftX, cameraBase.y + driftY, cameraBase.z)
      camera.lookAt(lookTarget)

      renderer.render(scene, camera)
    }

    animate()

    // VeraGraph.tsx — inside the main useEffect, near the existing onResize block
    const onResize = () => {
      const w = mount.clientWidth || 900
      const h = mount.clientHeight || 900
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      resizeObserver.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('vera-think', onThinkEvent as EventListener)
      window.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerdown', onPointerDown)
      mount.removeEventListener('pointerleave', onPointerLeave)
      mount.removeEventListener('pointercancel', onPointerLeave)
      outerGeo.dispose()
      outerMat.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      hitGeo.dispose()
      hitMat.dispose()
      edgeGeo.dispose()
      edgeMat.dispose()
      bridgeGeo.dispose()
      bridgeMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    setMode: (mode) => { modeRef.current = mode },
    pulse: (targetIndex) => {
      window.dispatchEvent(new CustomEvent('vera-think', { detail: { targetIndex } }))
    },
  }))

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
})

VeraGraph.displayName = 'VeraGraph'
export default VeraGraph