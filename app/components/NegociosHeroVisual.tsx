'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface NegociosHeroVisualProps {
  mockupId?: string
}

export default function NegociosHeroVisual({ mockupId = 'hero-browser-mockup' }: NegociosHeroVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Accessibility & Viewport Check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    // On mobile viewports (<768px), disable WebGL rendering to prioritize touch latency and typography clarity
    if (isMobile) {
      return
    }

    // 2. Scene, Perspective Camera, and WebGL Renderer
    const scene = new THREE.Scene()

    const getDimensions = () => {
      const w = container.clientWidth || window.innerWidth || 1000
      const h = container.clientHeight || 650
      return { w, h }
    }

    const { w: initialWidth, h: initialHeight } = getDimensions()

    const camera = new THREE.PerspectiveCamera(38, initialWidth / initialHeight, 0.1, 50)
    camera.position.set(0, 0, 11)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(initialWidth, initialHeight)
    renderer.setClearColor(0x000000, 0)

    const canvas = renderer.domElement
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    container.appendChild(canvas)

    // Master Hierarchy
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // Motion Hierarchy Groups: Depth separation
    const backgroundPlanesGroup = new THREE.Group() // Deepest layer (Z ~ -1.5)
    const midgroundPlanesGroup = new THREE.Group()  // Mid layer (Z ~ -0.7)
    const foregroundGuidesGroup = new THREE.Group() // Precision datum guides (Z ~ 0)
    const dynamicScannerGroup = new THREE.Group()   // Active scanning axis (Z ~ 0.05)

    masterGroup.add(backgroundPlanesGroup)
    masterGroup.add(midgroundPlanesGroup)
    masterGroup.add(foregroundGuidesGroup)
    masterGroup.add(dynamicScannerGroup)

    // 3. Dynamic Mockup Projection in 3D Space
    const getMockupWorldBounds = () => {
      const mockupEl = document.getElementById(mockupId)
      if (!mockupEl || !container) {
        return {
          left: 1.0,
          right: 4.8,
          top: 1.45,
          bottom: -1.45,
          centerX: 2.9,
          centerY: 0,
          width: 3.8,
          height: 2.9,
        }
      }

      const mRect = mockupEl.getBoundingClientRect()
      const cRect = container.getBoundingClientRect()

      const normLeft = ((mRect.left - cRect.left) / cRect.width) * 2 - 1
      const normRight = ((mRect.right - cRect.left) / cRect.width) * 2 - 1
      const normTop = -(((mRect.top - cRect.top) / cRect.height) * 2 - 1)
      const normBottom = -(((mRect.bottom - cRect.top) / cRect.height) * 2 - 1)

      const halfFovRad = THREE.MathUtils.degToRad(camera.fov / 2)
      const visibleHalfHeight = Math.tan(halfFovRad) * camera.position.z
      const visibleHalfWidth = visibleHalfHeight * camera.aspect

      const left = normLeft * visibleHalfWidth
      const right = normRight * visibleHalfWidth
      const top = normTop * visibleHalfHeight
      const bottom = normBottom * visibleHalfHeight

      if (Math.abs(right - left) < 0.5 || Math.abs(top - bottom) < 0.5) {
        return {
          left: 1.0,
          right: 4.8,
          top: 1.45,
          bottom: -1.45,
          centerX: 2.9,
          centerY: 0,
          width: 3.8,
          height: 2.9,
        }
      }

      return {
        left,
        right,
        top,
        bottom,
        centerX: (left + right) / 2,
        centerY: (top + bottom) / 2,
        width: right - left,
        height: top - bottom,
      }
    }

    // Contemporary Bauhaus Study Palette: 55% Cobalt Blue, 30% Cadmium Yellow, 10% Red, 5% Ink Black
    const colBrandBlue = new THREE.Color(0x2563eb)
    const colBrandLight = new THREE.Color(0x3b82f6)
    // Pure, radiant Bauhaus Cadmium Yellow (0% orange, high-luminance primary yellow)
    const colBauhausYellow = new THREE.Color(0xffe600)
    const colBauhausYellowBorder = new THREE.Color(0xd4a300)
    const colBauhausRed = new THREE.Color(0xef4444)
    const colBauhausRedBorder = new THREE.Color(0xdc2626)
    const colBauhausInk = new THREE.Color(0x121210)
    const colSlate = new THREE.Color(0x475569)

    // Resource disposables tracker
    const disposables: { geometry: THREE.BufferGeometry; material: THREE.Material }[] = []

    // Helper: Create a 3D architectural cube/box with wireframe edge definition
    const createArchitecturalCube = (
      width: number,
      height: number,
      depth: number,
      fillColor: THREE.Color,
      fillOpacity: number,
      strokeColor: THREE.Color,
      strokeOpacity: number,
      zPos: number,
      rotX = -0.09,
      rotY = 0.14
    ) => {
      const group = new THREE.Group()

      const geom = new THREE.BoxGeometry(width, height, depth)
      const fillMat = new THREE.MeshBasicMaterial({
        color: fillColor,
        transparent: true,
        opacity: fillOpacity,
        depthWrite: false, // Allows clean volumetric intersection without z-fighting
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geom, fillMat)
      group.add(mesh)
      disposables.push({ geometry: geom, material: fillMat })

      const edgeGeom = new THREE.EdgesGeometry(geom)
      const strokeMat = new THREE.LineBasicMaterial({
        color: strokeColor,
        transparent: true,
        opacity: strokeOpacity,
        depthWrite: false,
      })
      const strokeMesh = new THREE.LineSegments(edgeGeom, strokeMat)
      group.add(strokeMesh)
      disposables.push({ geometry: edgeGeom, material: strokeMat })

      group.position.z = zPos
      group.rotation.x = rotX
      group.rotation.y = rotY
      return group
    }

    // Dynamic Elements References for the Animation Loop (3D Cubes & Datums)
    // 55% Blue: Largest structural cubes
    let primarySledCube: THREE.Group | null = null
    let rightColumnCube: THREE.Group | null = null

    // 30% Yellow: Medium cubes
    let leftFlankCube: THREE.Group | null = null
    let baselineTrackCube: THREE.Group | null = null

    // 10% Red: Smallest cubes/elements
    let scannerRedCube: THREE.Group | null = null
    let caliperRedCube: THREE.Group | null = null

    // 5% Black: Smallest dark elements
    let datumBlackCube: THREE.Group | null = null
    let registrationBlackCube: THREE.Group | null = null

    // Guides and Measuring Systems
    let scannerAxisGroup: THREE.Group | null = null
    let telescopingTopLineGeom: THREE.BufferGeometry | null = null
    let telescopingTopLineArray: Float32Array | null = null
    let telescopingBaseLineGeom: THREE.BufferGeometry | null = null
    let telescopingBaseLineArray: Float32Array | null = null
    let caliperLineGeom: THREE.BufferGeometry | null = null
    let caliperLineArray: Float32Array | null = null
    let cornerBracketsGroup: THREE.Group | null = null

    // Helper to clear a group and dispose inner objects
    const clearGroup = (g: THREE.Group) => {
      while (g.children.length > 0) {
        g.remove(g.children[0])
      }
    }

    // Build the Entire Spatial 3D Volumetric System
    const buildSystem = (b: ReturnType<typeof getMockupWorldBounds>) => {
      clearGroup(backgroundPlanesGroup)
      clearGroup(midgroundPlanesGroup)
      clearGroup(foregroundGuidesGroup)
      clearGroup(dynamicScannerGroup)

      disposables.forEach((d) => {
        d.geometry.dispose()
        d.material.dispose()
      })
      disposables.length = 0

      // =========================================================================
      // 1. 55% BLUE: LARGEST STRUCTURAL CUBES/VOLUMES
      // =========================================================================

      // CUBE 1A: Primary Foundation Sled (Massive structural chassis passing behind mockup)
      const sledWidth = b.width * 1.30
      const sledHeight = b.height * 1.16
      const sledDepth = 0.75
      primarySledCube = createArchitecturalCube(
        sledWidth,
        sledHeight,
        sledDepth,
        colBrandBlue,
        0.18,
        colBrandBlue,
        0.80,
        -1.5,
        -0.08,
        0.12
      )
      primarySledCube.position.set(b.centerX, b.centerY, -1.5)
      backgroundPlanesGroup.add(primarySledCube)

      // Internal structural rib division inside the blue sled
      const sledSubGeom = new THREE.BufferGeometry()
      const sledSubVerts = new Float32Array([
        -sledWidth * 0.18, -sledHeight / 2, 0, -sledWidth * 0.18, sledHeight / 2, 0,
        sledWidth * 0.22, -sledHeight / 2, 0, sledWidth * 0.22, sledHeight / 2, 0,
      ])
      sledSubGeom.setAttribute('position', new THREE.BufferAttribute(sledSubVerts, 3))
      const sledSubMat = new THREE.LineBasicMaterial({
        color: colBrandLight,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      })
      const sledSubLines = new THREE.LineSegments(sledSubGeom, sledSubMat)
      primarySledCube.add(sledSubLines)
      disposables.push({ geometry: sledSubGeom, material: sledSubMat })

      // CUBE 1B: Right-Flank Modular Column (Vertical structural monolith)
      const colWidth = Math.max(1.8, b.width * 0.38)
      const colHeight = b.height * 1.22
      const colDepth = 0.85
      rightColumnCube = createArchitecturalCube(
        colWidth,
        colHeight,
        colDepth,
        colBrandBlue,
        0.26,
        colBrandBlue,
        0.90,
        -0.6,
        -0.09,
        0.15
      )
      rightColumnCube.position.set(b.right + colWidth * 0.65, b.centerY, -0.6)
      midgroundPlanesGroup.add(rightColumnCube)

      // Column modular floor rib divisions
      const colGridGeom = new THREE.BufferGeometry()
      const colGridVerts = new Float32Array([
        -colWidth / 2, colHeight * 0.35, 0, colWidth / 2, colHeight * 0.35, 0,
        -colWidth / 2, -colHeight * 0.35, 0, colWidth / 2, -colHeight * 0.35, 0,
      ])
      colGridGeom.setAttribute('position', new THREE.BufferAttribute(colGridVerts, 3))
      const colGridMat = new THREE.LineBasicMaterial({
        color: colBrandLight,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      })
      const colGridLines = new THREE.LineSegments(colGridGeom, colGridMat)
      rightColumnCube.add(colGridLines)
      disposables.push({ geometry: colGridGeom, material: colGridMat })

      // =========================================================================
      // 2. 30% YELLOW: MEDIUM CUBES/VOLUMES (Proportion Modules & Movement Guides)
      // Pure, vibrant Bauhaus cadmium yellow without any amber or orange cast
      // =========================================================================

      // CUBE 2A: Left-Flank Proportion Cube (Medium counterweight block)
      const subWidth = b.width * 0.34
      const subHeight = b.height * 0.52
      const subDepth = 0.65
      leftFlankCube = createArchitecturalCube(
        subWidth,
        subHeight,
        subDepth,
        colBauhausYellow,
        0.32,
        colBauhausYellowBorder,
        0.95,
        -0.85,
        -0.09,
        0.14
      )
      leftFlankCube.position.set(b.left - subWidth * 0.45, b.bottom + subHeight * 0.45, -0.85)
      backgroundPlanesGroup.add(leftFlankCube)

      // Functional Proportional Subdivision (Form follows function: Golden division hairline)
      const subRatioGeom = new THREE.BufferGeometry()
      const subRatioVerts = new Float32Array([
        -subWidth / 2, subHeight * 0.12, 0, subWidth / 2, subHeight * 0.12, 0,
      ])
      subRatioGeom.setAttribute('position', new THREE.BufferAttribute(subRatioVerts, 3))
      const subRatioMat = new THREE.LineBasicMaterial({
        color: colBauhausYellowBorder,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      })
      const subRatioLines = new THREE.LineSegments(subRatioGeom, subRatioMat)
      leftFlankCube.add(subRatioLines)
      disposables.push({ geometry: subRatioGeom, material: subRatioMat })

      // CUBE 2B: Horizontal Baseline Track Runner Cube
      // Slides along the bottom edge, penetrating directly into the right blue column
      const ribbonWidth = b.width * 1.15
      const ribbonHeight = 0.42
      const ribbonDepth = 0.60
      baselineTrackCube = createArchitecturalCube(
        ribbonWidth,
        ribbonHeight,
        ribbonDepth,
        colBauhausYellow,
        0.30,
        colBauhausYellowBorder,
        0.95,
        -0.45,
        -0.08,
        0.12
      )
      baselineTrackCube.position.set(b.centerX + 0.3, b.bottom - 0.28, -0.45)
      midgroundPlanesGroup.add(baselineTrackCube)

      // Functional Track Centerline (Form follows function: Linear sliding axis)
      const trackAxisGeom = new THREE.BufferGeometry()
      const trackAxisVerts = new Float32Array([
        -ribbonWidth / 2, 0, 0, ribbonWidth / 2, 0, 0,
      ])
      trackAxisGeom.setAttribute('position', new THREE.BufferAttribute(trackAxisVerts, 3))
      const trackAxisMat = new THREE.LineBasicMaterial({
        color: colBauhausYellowBorder,
        transparent: true,
        opacity: 0.50,
        depthWrite: false,
      })
      const trackAxisLines = new THREE.LineSegments(trackAxisGeom, trackAxisMat)
      baselineTrackCube.add(trackAxisLines)
      disposables.push({ geometry: trackAxisGeom, material: trackAxisMat })

      // =========================================================================
      // 3. 10% RED: SMALLEST CUBES/ELEMENTS (Active Interactive Index & Caliper)
      // =========================================================================

      // CUBE 3A: Active Scanner Index Cube (Glides along top edge with the ratio axis)
      const scanCubeSize = 0.30
      scannerRedCube = createArchitecturalCube(
        scanCubeSize,
        scanCubeSize,
        scanCubeSize,
        colBauhausRed,
        0.65,
        colBauhausRedBorder,
        0.95,
        0.15,
        -0.10,
        0.18
      )
      scannerRedCube.position.set(b.centerX, b.top + 0.12, 0.15)
      dynamicScannerGroup.add(scannerRedCube)

      // CUBE 3B: Dimension Caliper Index Cube (Floats in the gap between mockup and blue column)
      const caliperCubeW = 0.34
      const caliperCubeH = 0.24
      const caliperCubeD = 0.30
      caliperRedCube = createArchitecturalCube(
        caliperCubeW,
        caliperCubeH,
        caliperCubeD,
        colBauhausRed,
        0.60,
        colBauhausRedBorder,
        0.95,
        0.05,
        -0.08,
        0.16
      )
      caliperRedCube.position.set(b.right + 0.6, b.centerY, 0.05)
      foregroundGuidesGroup.add(caliperRedCube)

      // =========================================================================
      // 4. 5% BLACK: SMALLEST DARK ELEMENTS (Precision Origin & Datum Anchors)
      // =========================================================================

      // CUBE 4A: Precision Datum Origin Cube (Cartesian 0,0,0 benchmark)
      const datumCubeSize = 0.20
      datumBlackCube = createArchitecturalCube(
        datumCubeSize,
        datumCubeSize,
        datumCubeSize,
        colBauhausInk,
        0.85,
        colBauhausInk,
        1.0,
        0.22,
        -0.10,
        0.15
      )
      datumBlackCube.position.set(b.left - 0.15, b.bottom, 0.22)
      foregroundGuidesGroup.add(datumBlackCube)

      // CUBE 4B: Registration Benchmark Cube (Secondary micro datum anchor on right baseline)
      const regCubeSize = 0.16
      registrationBlackCube = createArchitecturalCube(
        regCubeSize,
        regCubeSize,
        regCubeSize,
        colBauhausInk,
        0.85,
        colBauhausInk,
        1.0,
        0.18,
        -0.08,
        0.14
      )
      registrationBlackCube.position.set(b.right + 1.1, b.bottom, 0.18)
      foregroundGuidesGroup.add(registrationBlackCube)

      // =========================================================================
      // 5. SECONDARY MOTION: DYNAMIC SCANNING AXES, TELESCOPING DATUMS & CALIPERS
      // =========================================================================

      // A. The Active Scanning Ratio Axis (Precision measurement guide)
      scannerAxisGroup = new THREE.Group()
      scannerAxisGroup.position.set(b.centerX, 0, 0.08)

      const scanGeom = new THREE.BufferGeometry()
      const scanSpan = b.height * 1.25
      const tSerif = 0.18
      const scanVerts = new Float32Array([
        // Vertical axis
        0, -scanSpan / 2, 0, 0, scanSpan / 2, 0,
        // Top T-serif
        -tSerif, scanSpan / 2, 0, tSerif, scanSpan / 2, 0,
        // Bottom T-serif
        -tSerif, -scanSpan / 2, 0, tSerif, -scanSpan / 2, 0,
        // Internal tick
        -tSerif * 0.5, 0, 0, tSerif * 0.5, 0, 0,
      ])
      scanGeom.setAttribute('position', new THREE.BufferAttribute(scanVerts, 3))
      const scanMat = new THREE.LineBasicMaterial({
        color: colBrandLight,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      })
      const scanMesh = new THREE.LineSegments(scanGeom, scanMat)
      scannerAxisGroup.add(scanMesh)
      dynamicScannerGroup.add(scannerAxisGroup)
      disposables.push({ geometry: scanGeom, material: scanMat })

      // B. Telescoping Top Datum Line (Sharp ink ruler)
      telescopingTopLineArray = new Float32Array([
        b.left - 0.6, b.top, 0, b.right + 1.2, b.top, 0,
        // Left terminal tick
        b.left - 0.6, b.top - 0.07, 0, b.left - 0.6, b.top + 0.07, 0,
        // Dynamic right terminal tick
        b.right + 1.2, b.top - 0.07, 0, b.right + 1.2, b.top + 0.07, 0,
      ])
      telescopingTopLineGeom = new THREE.BufferGeometry()
      telescopingTopLineGeom.setAttribute('position', new THREE.BufferAttribute(telescopingTopLineArray, 3))
      const topLineMat = new THREE.LineBasicMaterial({
        color: colBauhausInk,
        transparent: true,
        opacity: 0.50,
        depthWrite: false,
      })
      const topLineMesh = new THREE.LineSegments(telescopingTopLineGeom, topLineMat)
      foregroundGuidesGroup.add(topLineMesh)
      disposables.push({ geometry: telescopingTopLineGeom, material: topLineMat })

      // C. Telescoping Baseline Datum (Continuous architectural ink ruler)
      telescopingBaseLineArray = new Float32Array([
        b.left - 1.2, b.bottom, 0, b.right + 2.6, b.bottom, 0,
        // Ticks along the baseline
        b.left, b.bottom - 0.09, 0, b.left, b.bottom + 0.09, 0,
        b.right, b.bottom - 0.09, 0, b.right, b.bottom + 0.09, 0,
        b.right + 1.1, b.bottom - 0.06, 0, b.right + 1.1, b.bottom + 0.06, 0,
        b.right + 2.0, b.bottom - 0.06, 0, b.right + 2.0, b.bottom + 0.06, 0,
        // Sliding right terminal tick
        b.right + 2.6, b.bottom - 0.09, 0, b.right + 2.6, b.bottom + 0.09, 0,
      ])
      telescopingBaseLineGeom = new THREE.BufferGeometry()
      telescopingBaseLineGeom.setAttribute('position', new THREE.BufferAttribute(telescopingBaseLineArray, 3))
      const baseLineMat = new THREE.LineBasicMaterial({
        color: colBauhausInk,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      })
      const baseLineMesh = new THREE.LineSegments(telescopingBaseLineGeom, baseLineMat)
      foregroundGuidesGroup.add(baseLineMesh)
      disposables.push({ geometry: telescopingBaseLineGeom, material: baseLineMat })

      // D. Architectural Dimension Caliper (Cobalt blue dimension bracket)
      caliperLineArray = new Float32Array([
        b.right, b.centerY, 0.05, b.right + 1.2, b.centerY, 0.05,
        b.right, b.centerY - 0.1, 0.05, b.right, b.centerY + 0.1, 0.05,
        b.right + 1.2, b.centerY - 0.1, 0.05, b.right + 1.2, b.centerY + 0.1, 0.05,
      ])
      caliperLineGeom = new THREE.BufferGeometry()
      caliperLineGeom.setAttribute('position', new THREE.BufferAttribute(caliperLineArray, 3))
      const caliperMat = new THREE.LineBasicMaterial({
        color: colBrandBlue,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      })
      const caliperMesh = new THREE.LineSegments(caliperLineGeom, caliperMat)
      foregroundGuidesGroup.add(caliperMesh)
      disposables.push({ geometry: caliperLineGeom, material: caliperMat })

      // E. Precision Corner Registration Marks (Bauhaus ink crop marks)
      cornerBracketsGroup = new THREE.Group()
      const arm = 0.22
      const cOff = 0.08
      const cornerVerts = new Float32Array([
        // Top-Left (┌)
        b.left - cOff, b.top + cOff, 0.04, b.left - cOff + arm, b.top + cOff, 0.04,
        b.left - cOff, b.top + cOff, 0.04, b.left - cOff, b.top + cOff - arm, 0.04,
        // Top-Right (┐)
        b.right + cOff, b.top + cOff, 0.04, b.right + cOff - arm, b.top + cOff, 0.04,
        b.right + cOff, b.top + cOff, 0.04, b.right + cOff, b.top + cOff - arm, 0.04,
        // Bottom-Left (└)
        b.left - cOff, b.bottom - cOff, 0.04, b.left - cOff + arm, b.bottom - cOff, 0.04,
        b.left - cOff, b.bottom - cOff, 0.04, b.left - cOff, b.bottom - cOff + arm, 0.04,
        // Bottom-Right (┘)
        b.right + cOff, b.bottom - cOff, 0.04, b.right + cOff - arm, b.bottom - cOff, 0.04,
        b.right + cOff, b.bottom - cOff, 0.04, b.right + cOff, b.bottom - cOff + arm, 0.04,
      ])
      const cornerGeom = new THREE.BufferGeometry()
      cornerGeom.setAttribute('position', new THREE.BufferAttribute(cornerVerts, 3))
      const cornerMat = new THREE.LineBasicMaterial({
        color: colBauhausInk,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      })
      const cornerMesh = new THREE.LineSegments(cornerGeom, cornerMat)
      cornerBracketsGroup.add(cornerMesh)
      foregroundGuidesGroup.add(cornerBracketsGroup)
      disposables.push({ geometry: cornerGeom, material: cornerMat })

      // F. Static Vertical Guide on Left Edge (Neutral architectural guide)
      const leftAxisGeom = new THREE.BufferGeometry()
      const leftAxisVerts = new Float32Array([
        b.left, b.bottom - 0.7, 0, b.left, b.top + 0.7, 0,
        b.left - 0.08, b.top + 0.7, 0, b.left + 0.08, b.top + 0.7, 0,
        b.left - 0.08, b.bottom - 0.7, 0, b.left + 0.08, b.bottom - 0.7, 0,
      ])
      leftAxisGeom.setAttribute('position', new THREE.BufferAttribute(leftAxisVerts, 3))
      const leftAxisMat = new THREE.LineBasicMaterial({
        color: colSlate,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      })
      const leftAxisMesh = new THREE.LineSegments(leftAxisGeom, leftAxisMat)
      foregroundGuidesGroup.add(leftAxisMesh)
      disposables.push({ geometry: leftAxisGeom, material: leftAxisMat })
    }

    // Initial construction
    let currentBounds = getMockupWorldBounds()
    buildSystem(currentBounds)

    // 4. Cursor Interaction and Mockup Hover State
    let mouseActive = false
    let mouseTargetX = 0
    let mouseTargetY = 0
    let mouseCurrentX = 0
    let mouseCurrentY = 0

    let isHoveringMockup = false
    let hoverProgress = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseActive = true
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseTargetX = THREE.MathUtils.clamp(x, -1, 1)
      mouseTargetY = THREE.MathUtils.clamp(y, -1, 1)
    }

    const handleMouseLeave = () => {
      mouseActive = false
      mouseTargetX = 0
      mouseTargetY = 0
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    const mockupEl = document.getElementById(mockupId)
    const onMockupEnter = () => {
      isHoveringMockup = true
    }
    const onMockupLeave = () => {
      isHoveringMockup = false
    }

    if (mockupEl) {
      mockupEl.addEventListener('mouseenter', onMockupEnter)
      mockupEl.addEventListener('mouseleave', onMockupLeave)
    }

    // 5. Visibility and Window Resize Handlers
    let isVisibleOnScreen = true
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleOnScreen = entry.isIntersecting
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth || window.innerWidth || 1000
      const newHeight = container.clientHeight || 650

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)

      currentBounds = getMockupWorldBounds()
      buildSystem(currentBounds)
    }

    window.addEventListener('resize', handleResize)

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize()
      })
      resizeObserver.observe(container)
    }

    // 6. Deliberate, Clearly Perceptible Architectural Motion Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      if (!isVisibleOnScreen) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      const t = clock.getElapsedTime()

      // Accessibility: Render a serene, perfectly aligned static composition and halt
      if (prefersReducedMotion) {
        renderer.render(scene, camera)
        return
      }

      // Smooth Viscous Cursor Interpolation
      const targetX = mouseActive ? mouseTargetX : 0
      const targetY = mouseActive ? mouseTargetY : 0
      mouseCurrentX += (targetX - mouseCurrentX) * 0.045
      mouseCurrentY += (targetY - mouseCurrentY) * 0.045

      const targetHover = isHoveringMockup ? 1 : 0
      hoverProgress += (targetHover - hoverProgress) * 0.06

      // =======================================================================
      // AMBIENT MOTION & DEPTH SEPARATION
      // =======================================================================
      // Refined perspective tilt and smooth pan
      masterGroup.rotation.y = mouseCurrentX * 0.038
      masterGroup.rotation.x = -mouseCurrentY * 0.026
      masterGroup.position.x = mouseCurrentX * 0.12
      masterGroup.position.y = mouseCurrentY * 0.08

      // Differential depth layer movement
      backgroundPlanesGroup.position.x = -mouseCurrentX * 0.07
      backgroundPlanesGroup.position.y = -mouseCurrentY * 0.04
      midgroundPlanesGroup.position.x = mouseCurrentX * 0.04
      midgroundPlanesGroup.position.y = mouseCurrentY * 0.025
      foregroundGuidesGroup.position.x = mouseCurrentX * 0.015
      foregroundGuidesGroup.position.y = mouseCurrentY * 0.01

      const b = currentBounds

      // =======================================================================
      // LEVEL 1: PRIMARY VOLUMETRIC MOTION (55% Blue & 30% Yellow Cubes)
      // =======================================================================

      // 1. Primary Blue Foundation Sled: Glides smoothly back and forth behind the browser
      // Amplitude: ±0.75 world units (~90-130px visible travel). Period: ~9.5 seconds
      if (primarySledCube) {
        const sledCycle = Math.sin(t * 0.65)
        const sledTravel = b.width * 0.18 * (1 - hoverProgress * 0.45)
        primarySledCube.position.x = b.centerX + sledCycle * sledTravel + mouseCurrentX * 0.15
        primarySledCube.position.y = b.centerY + Math.cos(t * 0.4) * 0.08
        // Subtle rotational shift reveals perspective facets and 3D depth dynamically
        primarySledCube.rotation.y = 0.12 + Math.sin(t * 0.35) * 0.03
        primarySledCube.rotation.x = -0.08 + Math.cos(t * 0.4) * 0.02
      }

      // 2. Right Modular Blue Column: Glides along the vertical Y axis in the right margin
      // Amplitude: ±0.55 world units (~70-90px vertical travel). Period: ~7.2 seconds
      let currentColX = b.right + (b.width * 0.38) * 0.65
      if (rightColumnCube) {
        const colVerticalCycle = Math.sin(t * 0.85 + 0.8)
        const colTravel = b.height * 0.22 * (1 - hoverProgress * 0.4)
        currentColX = b.right + (b.width * 0.38) * 0.65 + Math.cos(t * 0.45) * 0.12
        rightColumnCube.position.x = currentColX
        rightColumnCube.position.y = b.centerY + colVerticalCycle * colTravel
        rightColumnCube.rotation.y = 0.15 + Math.cos(t * 0.4) * 0.03
        rightColumnCube.rotation.x = -0.09 + Math.sin(t * 0.3) * 0.02
      }

      // 3. Left-Flank Yellow Cube: Phase-shifted diagonal breathing, overlapping with blue sled
      if (leftFlankCube) {
        const subW = b.width * 0.34
        const subH = b.height * 0.52
        const subCycleX = Math.sin(t * 0.55 + 2.2) * 0.22
        const subCycleY = Math.cos(t * 0.7 + 1.0) * 0.16
        leftFlankCube.position.x = b.left - subW * 0.45 + subCycleX
        leftFlankCube.position.y = b.bottom + subH * 0.45 + subCycleY
        leftFlankCube.rotation.y = 0.14 + Math.sin(t * 0.5) * 0.04
        leftFlankCube.rotation.x = -0.09 + Math.cos(t * 0.45) * 0.02
      }

      // 4. Baseline Yellow Track Runner Cube: Smooth horizontal track sliding
      // Passes directly through the right blue column, creating visible 3D volumetric intersections!
      if (baselineTrackCube) {
        const ribbonCycle = Math.cos(t * 0.48) * 0.55
        baselineTrackCube.position.x = b.centerX + 0.3 + ribbonCycle
        baselineTrackCube.rotation.y = 0.12 + Math.sin(t * 0.4) * 0.03
        baselineTrackCube.rotation.x = -0.08 + Math.cos(t * 0.35) * 0.02
      }

      // =======================================================================
      // LEVEL 2: SECONDARY VOLUMETRIC MOTION (10% Red & 5% Black Cubes + Guides)
      // =======================================================================

      // 1. Dynamic Scanning Ratio Axis & Red Index Cube: Sweeps across the browser mockup
      let currentScanX = b.centerX
      if (scannerAxisGroup) {
        const scanPhase = Math.sin(t * 0.72)
        const ratio = 0.5 + 0.28 * scanPhase
        const targetRatio = THREE.MathUtils.lerp(ratio, 0.382, hoverProgress)
        currentScanX = b.left + b.width * targetRatio
        scannerAxisGroup.position.x = currentScanX
      }

      // Red Scanner Index Cube glides on top of the browser along the scanning axis
      if (scannerRedCube) {
        scannerRedCube.position.x = currentScanX
        scannerRedCube.position.y = b.top + 0.12 + Math.sin(t * 1.1) * 0.05
        scannerRedCube.rotation.y = 0.18 + Math.cos(t * 0.8) * 0.06
        scannerRedCube.rotation.x = -0.10 + Math.sin(t * 0.6) * 0.04
      }

      // 2. Telescoping Top Datum Line: Right edge extends and contracts dynamically
      if (telescopingTopLineGeom && telescopingTopLineArray) {
        const extendCycle = 0.5 + 0.5 * Math.sin(t * 0.8)
        const currentExtend = b.right + 0.8 + extendCycle * 1.35

        telescopingTopLineArray[3] = currentExtend
        telescopingTopLineArray[12] = currentExtend
        telescopingTopLineArray[15] = currentExtend

        telescopingTopLineGeom.attributes.position.needsUpdate = true
      }

      // 3. Telescoping Baseline Datum & Black Anchor Cube
      if (telescopingBaseLineGeom && telescopingBaseLineArray) {
        const baseLeftExtend = b.left - 1.2 - Math.sin(t * 0.6) * 0.35
        const baseRightExtend = b.right + 2.3 + Math.cos(t * 0.6) * 0.55

        telescopingBaseLineArray[0] = baseLeftExtend
        telescopingBaseLineArray[3] = baseRightExtend
        telescopingBaseLineArray[30] = baseRightExtend
        telescopingBaseLineArray[33] = baseRightExtend

        telescopingBaseLineGeom.attributes.position.needsUpdate = true
      }

      // Black Datum Origin & Registration Cubes (Cartesian benchmarks)
      if (datumBlackCube) {
        datumBlackCube.position.x = b.left - 0.15 + Math.sin(t * 0.5) * 0.06
        datumBlackCube.position.y = b.bottom
        datumBlackCube.rotation.y = 0.15 + Math.sin(t * 0.4) * 0.02
        datumBlackCube.rotation.x = -0.10
      }
      if (registrationBlackCube) {
        registrationBlackCube.position.x = b.right + 1.1 + Math.cos(t * 0.45) * 0.05
        registrationBlackCube.position.y = b.bottom
        registrationBlackCube.rotation.y = 0.14 + Math.cos(t * 0.5) * 0.02
        registrationBlackCube.rotation.x = -0.08
      }

      // 4. Dimension Caliper & Red Caliper Cube: Tracks the interval between mockup and blue column
      const colEdge = currentColX - (b.width * 0.38) * 0.5
      if (caliperLineGeom && caliperLineArray) {
        caliperLineArray[3] = colEdge
        caliperLineArray[12] = colEdge
        caliperLineArray[15] = colEdge

        caliperLineGeom.attributes.position.needsUpdate = true
      }

      // Red Caliper Index Cube floats inside the measurement zone, overlapping the blue column
      if (caliperRedCube) {
        caliperRedCube.position.x = (b.right + colEdge) * 0.5
        caliperRedCube.position.y = b.centerY + Math.sin(t * 0.85 + 0.8) * 0.15
        caliperRedCube.rotation.y = 0.16 + Math.sin(t * 0.7) * 0.05
        caliperRedCube.rotation.x = -0.08 + Math.cos(t * 0.5) * 0.03
      }

      // 5. Corner Registration Brackets: Soft breathing pulsation
      if (cornerBracketsGroup) {
        const pulse = Math.sin(t * 1.2) * 0.02 * (1 - hoverProgress)
        cornerBracketsGroup.scale.set(1 + pulse, 1 + pulse, 1)
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // 7. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      if (resizeObserver) resizeObserver.disconnect()

      if (mockupEl) {
        mockupEl.removeEventListener('mouseenter', onMockupEnter)
        mockupEl.removeEventListener('mouseleave', onMockupLeave)
      }

      disposables.forEach((d) => {
        d.geometry.dispose()
        d.material.dispose()
      })

      renderer.dispose()
      renderer.forceContextLoss()
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }
  }, [mockupId])

  return (
    <div
      ref={containerRef}
      id="negocios-hero-visual-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-4rem',
        bottom: '-4rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        maxWidth: '100vw',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    />
  )
}
