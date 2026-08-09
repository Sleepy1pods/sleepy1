<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// ============================================================================
// 3D MODEL CONFIGURATION
// To replace this example 3D pod model with your own custom .glb or .gltf file:
// 1. Place your 3D model file in the `/public/models/` folder (e.g. `/public/models/pod.glb`)
// 2. Set `customModelUrl` below to your file path: e.g. `'/models/pod.glb'`
// 3. The viewer will automatically load your custom 3D model!
// ============================================================================
const customModelUrl = ref<string>('/SleepPod1.glb') // e.g., '/models/pod.glb'

type ViewMode = 'interior' | 'exterior'
const activeView = ref<ViewMode>('exterior')
const isAutoRotating = ref(true)
const isLoadingModel = ref(false)
const currentAngleDegrees = ref(0)

const canvasContainer = ref<HTMLElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let controls: OrbitControls | null = null
let animationFrameId: number | null = null
let podGroup: THREE.Group | null = null
let starParticles: THREE.Points | null = null

// View metadata & feature descriptions
const viewMeta = computed(() => {
  if (activeView.value === 'interior') {
    return {
      label: '3D Interior Cabin',
      tagline: 'Step inside your private rest sanctuary',
      description:
        'Explore inside the cabin in 3D — view the ergonomic memory-foam mattress, glowing star ceiling constellation canopy, private entertainment display, and intuitive touch controls.',
      features: [
        'Immersive starry night sky ceiling canopy',
        'HD entertainment & private audio display',
        'Smart touch lighting & climate control panel',
        'Active laminar HEPA air circulation',
        'Ergonomic memory-foam mattress & organic bedding',
      ],
    }
  }
  return {
    label: '3D Exterior Chassis',
    tagline: 'Modular, portable, and acoustic-sealed',
    description:
      'Rotate the freestanding architectural pod exterior in 3D — featuring hospitality-grade acoustic isolation casing, contactless NFC access scanner, and modular footprint.',
    features: [
      'Freestanding modular portable architecture',
      'Double-walled hospitality acoustic shell',
      'Smart QR & contactless NFC entry scanner',
      'Continuous HEPA external air intake vents',
      'Sleek privacy tinted door & occupancy glow',
    ],
  }
})

// Build default procedural 3D example pod model
function buildProceduralPodModel(): THREE.Group {
  const group = new THREE.Group()

  // 1. Bright Pearl-White Luxury Outer Shell (Rotated horizontally)
  // Highly detailed capsule geometry for ultra-smooth modern curves
  const shellGeo = new THREE.CapsuleGeometry(1.55, 2.3, 48, 48)
  const shellMat = new THREE.MeshStandardMaterial({
    color: 0xf8f9fc, // Luxury Pearl White / Ivory Bright finish
    roughness: 0.18,
    metalness: 0.25,
  })
  const shellMesh = new THREE.Mesh(shellGeo, shellMat)
  shellMesh.rotation.z = Math.PI / 2
  shellMesh.castShadow = true
  shellMesh.receiveShadow = true
  group.add(shellMesh)

  // 2. Brushed Silver / Titanium Acoustic Sealing Rings (Front & Back)
  const ringGeo = new THREE.TorusGeometry(1.57, 0.045, 24, 64)
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xdce3f0, // Titanium silver chrome
    metalness: 0.9,
    roughness: 0.1,
  })
  const leftRing = new THREE.Mesh(ringGeo, ringMat)
  leftRing.rotation.y = Math.PI / 2
  leftRing.position.x = -1.15
  group.add(leftRing)

  const rightRing = new THREE.Mesh(ringGeo, ringMat)
  rightRing.rotation.y = Math.PI / 2
  rightRing.position.x = 1.15
  group.add(rightRing)

  // 3. Crystal-Clear Tinted Curved Glass Privacy Window/Door (+Z)
  const windowGeo = new THREE.CylinderGeometry(1.58, 1.58, 1.7, 32, 1, false, -Math.PI / 3.2, (2 * Math.PI) / 3.2)
  const windowMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde7ff,
    roughness: 0.05,
    metalness: 0.1,
    transparent: true,
    opacity: 0.22,
    transmission: 0.5,
  })
  const windowMesh = new THREE.Mesh(windowGeo, windowMat)
  windowMesh.rotation.z = Math.PI / 2
  windowMesh.rotation.x = Math.PI / 2
  group.add(windowMesh)

  // 4. Upholstered Cozy Dark Inner Cabin Liner
  const linerGeo = new THREE.CapsuleGeometry(1.47, 2.22, 32, 32)
  const linerMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a2e, // Acoustic deep indigo fabric tone
    roughness: 0.9,
    side: THREE.BackSide,
  })
  const linerMesh = new THREE.Mesh(linerGeo, linerMat)
  linerMesh.rotation.z = Math.PI / 2
  group.add(linerMesh)

  // 5. Plush Layered Luxury Bed & Bedding
  // Walnut wood bed frame base
  const frameGeo = new THREE.BoxGeometry(2.36, 0.14, 1.36)
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a2421, roughness: 0.4 })
  const frameMesh = new THREE.Mesh(frameGeo, frameMat)
  frameMesh.position.set(0, -0.74, 0)
  group.add(frameMesh)

  // Thick Organic Ivory Memory-Foam Mattress
  const bedGeo = new THREE.BoxGeometry(2.32, 0.28, 1.32)
  const bedMat = new THREE.MeshStandardMaterial({
    color: 0xfffcf5, // Warm organic ivory
    roughness: 0.75,
  })
  const bedMesh = new THREE.Mesh(bedGeo, bedMat)
  bedMesh.position.set(0, -0.55, 0)
  bedMesh.receiveShadow = true
  group.add(bedMesh)

  // Folded Quilted Duvet / Comforter draped over the foot (+X)
  const duvetGeo = new THREE.BoxGeometry(1.05, 0.08, 1.32)
  const duvetMat = new THREE.MeshStandardMaterial({
    color: 0xe8effa, // Soft lavender-gray organic linen
    roughness: 0.85,
  })
  const duvetMesh = new THREE.Mesh(duvetGeo, duvetMat)
  duvetMesh.position.set(0.62, -0.38, 0)
  group.add(duvetMesh)

  // Main Sleeping Pillow at head (-X)
  const pillowGeo = new THREE.BoxGeometry(0.48, 0.16, 0.88)
  const pillowMat = new THREE.MeshStandardMaterial({
    color: 0xfffaf0,
    roughness: 0.9,
  })
  const pillowMesh = new THREE.Mesh(pillowGeo, pillowMat)
  pillowMesh.position.set(-0.85, -0.36, 0)
  pillowMesh.rotation.z = 0.16
  group.add(pillowMesh)

  // Decorative Accent Pillow (Lumbar indigo accent pillow)
  const accentPillowGeo = new THREE.BoxGeometry(0.3, 0.14, 0.55)
  const accentPillowMat = new THREE.MeshStandardMaterial({
    color: 0x8b9bfb, // Luxury violet/lavender accent
    roughness: 0.8,
  })
  const accentPillowMesh = new THREE.Mesh(accentPillowGeo, accentPillowMat)
  accentPillowMesh.position.set(-0.62, -0.35, 0)
  accentPillowMesh.rotation.z = 0.25
  group.add(accentPillowMesh)

  // 6. Warm Golden LED Cove Light Strips along sides of cabin
  const stripGeo = new THREE.BoxGeometry(2.0, 0.03, 0.03)
  const stripMat = new THREE.MeshBasicMaterial({
    color: 0xfbbf24, // Cozy golden amber
  })
  const leftStrip = new THREE.Mesh(stripGeo, stripMat)
  leftStrip.position.set(0, -0.38, -0.66)
  group.add(leftStrip)

  const rightStrip = new THREE.Mesh(stripGeo, stripMat)
  rightStrip.position.set(0, -0.38, 0.66)
  group.add(rightStrip)

  // 7. Entertainment Widescreen Display & Soundbar at foot (+X)
  const screenGeo = new THREE.BoxGeometry(0.05, 0.65, 1.15)
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x050711,
    emissive: 0x4d61fc,
    emissiveIntensity: 0.75, // Vivid aurora screen glow
    roughness: 0.15,
  })
  const screenMesh = new THREE.Mesh(screenGeo, screenMat)
  screenMesh.position.set(1.06, -0.05, 0)
  group.add(screenMesh)

  // Soundbar below display
  const barGeo = new THREE.BoxGeometry(0.06, 0.08, 0.9)
  const barMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 })
  const barMesh = new THREE.Mesh(barGeo, barMat)
  barMesh.position.set(1.05, -0.42, 0)
  group.add(barMesh)

  // 8. Multi-Color 150-Star Ceiling Constellation Canopy
  const starCount = 150
  const starPositions = new Float32Array(starCount * 3)
  const starColors = new Float32Array(starCount * 3)
  const palette = [
    new THREE.Color(0xfff0b3), // Warm gold star
    new THREE.Color(0xd4a5ff), // Soft violet star
    new THREE.Color(0xffffff), // Crisp white star
  ]
  for (let i = 0; i < starCount; i++) {
    const u = Math.random() * Math.PI - Math.PI / 2
    const v = (Math.random() - 0.5) * Math.PI * 0.7
    const r = 1.38
    starPositions[i * 3] = r * Math.sin(u)
    starPositions[i * 3 + 1] = Math.abs(r * Math.cos(u) * Math.cos(v)) * 0.7 + 0.4
    starPositions[i * 3 + 2] = r * Math.cos(u) * Math.sin(v)

    const c = palette[i % palette.length]
    starColors[i * 3] = c.r
    starColors[i * 3 + 1] = c.g
    starColors[i * 3 + 2] = c.b
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
  const starMat = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
  })
  starParticles = new THREE.Points(starGeo, starMat)
  group.add(starParticles)

  // 9. Smart NFC Scanner & Occupancy LED Indicator (+Z outside)
  const scannerGeo = new THREE.BoxGeometry(0.18, 0.35, 0.08)
  const scannerMat = new THREE.MeshStandardMaterial({ color: 0x121422, roughness: 0.4 })
  const scannerMesh = new THREE.Mesh(scannerGeo, scannerMat)
  scannerMesh.position.set(0.65, 0.1, 1.48)
  group.add(scannerMesh)

  // Glowing Green Occupancy LED
  const ledGeo = new THREE.CircleGeometry(0.04, 16)
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 })
  const ledMesh = new THREE.Mesh(ledGeo, ledMat)
  ledMesh.position.set(0.65, 0.2, 1.53)
  group.add(ledMesh)

  // 10. Circular Luxury Lounge Floor Platform Pad with LED Ring
  const floorGeo = new THREE.CylinderGeometry(2.5, 2.65, 0.1, 64)
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x12141c,
    roughness: 0.5,
    metalness: 0.3,
  })
  const floorMesh = new THREE.Mesh(floorGeo, floorMat)
  floorMesh.position.set(0, -1.55, 0)
  floorMesh.receiveShadow = true
  group.add(floorMesh)

  // Glowing perimeter accent ring on platform
  const floorRingGeo = new THREE.TorusGeometry(2.55, 0.02, 16, 64)
  const floorRingMat = new THREE.MeshBasicMaterial({ color: 0x8b9bfb })
  const floorRingMesh = new THREE.Mesh(floorRingGeo, floorRingMat)
  floorRingMesh.rotation.x = Math.PI / 2
  floorRingMesh.position.set(0, -1.5, 0)
  group.add(floorRingMesh)

  // 11. Internal Cabin Warm Twilight & Amber Mood Lighting
  const headLight = new THREE.PointLight(0xfbbf24, 2.5, 4)
  headLight.position.set(-0.6, 0.3, 0)
  group.add(headLight)

  const footLight = new THREE.PointLight(0x8b9bfb, 1.8, 4)
  footLight.position.set(0.6, 0.3, 0)
  group.add(footLight)

  return group
}

// Load custom 3D model if provided, otherwise use procedural pod
function loadModel() {
  if (!scene) return

  // Remove existing podGroup if present
  if (podGroup) {
    scene.remove(podGroup)
    podGroup = null
  }

  if (customModelUrl.value && customModelUrl.value.trim() !== '') {
    isLoadingModel.value = true
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    loader.setDRACOLoader(dracoLoader)
    loader.load(
      customModelUrl.value,
      (gltf) => {
        isLoadingModel.value = false
        podGroup = gltf.scene
        // Center and normalize scale
        const box = new THREE.Box3().setFromObject(podGroup)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 3.5 / (maxDim || 1)
        podGroup.scale.setScalar(scale)
        podGroup.position.sub(center.multiplyScalar(scale))
        scene?.add(podGroup)
      },
      undefined,
      (err) => {
        console.warn('Failed to load custom GLTF model, falling back to procedural pod model:', err)
        isLoadingModel.value = false
        podGroup = buildProceduralPodModel()
        scene?.add(podGroup)
      },
    )
  } else {
    podGroup = buildProceduralPodModel()
    scene.add(podGroup)
  }
}

// Camera transitions between Interior & Exterior modes
function updateCameraForMode(mode: ViewMode) {
  if (!camera || !controls) return
  const isMobile = window.innerWidth < 640
  if (mode === 'interior') {
    // Zoom inside through the side glass window for an immersive cabin perspective
    animateCameraTo(new THREE.Vector3(0.15, 0.1, isMobile ? 2.3 : 1.8), new THREE.Vector3(0, -0.2, -0.6))
  } else {
    // Exterior orbital view of the full pod chassis (slightly further back on phone screens so it fits perfectly!)
    animateCameraTo(new THREE.Vector3(0, 1.3, isMobile ? 7.6 : 5.8), new THREE.Vector3(0, 0, 0))
  }
}

function animateCameraTo(targetPos: THREE.Vector3, targetLook: THREE.Vector3) {
  if (!camera || !controls) return
  const startPos = camera.position.clone()
  const startLook = controls.target.clone()
  const duration = 800 // ms
  const startTime = performance.now()

  function step(time: number) {
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3)

    camera?.position.lerpVectors(startPos, targetPos, ease)
    controls?.target.lerpVectors(startLook, targetLook, ease)
    controls?.update()

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }
  requestAnimationFrame(step)
}

watch(activeView, (newMode) => {
  updateCameraForMode(newMode)
})

onMounted(() => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth || 800
  const height = canvasContainer.value.clientHeight || 500
  const isMobile = window.innerWidth < 640

  // 1. Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x090a10)

  // 2. Camera (wider FOV and increased distance on phone screens for full visibility)
  camera = new THREE.PerspectiveCamera(isMobile ? 52 : 45, width / height, 0.1, 100)
  camera.position.set(0, 1.3, isMobile ? 7.6 : 5.8)

  // 3. Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  canvasContainer.value.appendChild(renderer.domElement)

  // 4. Controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 1.2
  controls.maxDistance = 12
  controls.target.set(0, 0, 0)
  controls.update()

  // 5. Lighting - Enhanced for Bright Pearl White & Luxury Reflections
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95)
  scene.add(ambientLight)

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2)
  dirLight1.position.set(5, 8, 6)
  dirLight1.castShadow = true
  scene.add(dirLight1)

  const dirLight2 = new THREE.DirectionalLight(0x8b9bfb, 1.2)
  dirLight2.position.set(-5, -3, -4)
  scene.add(dirLight2)

  // 6. Load Pod Model
  loadModel()

  // 7. Animation Loop
  function animate() {
    animationFrameId = requestAnimationFrame(animate)

    if (podGroup && isAutoRotating.value) {
      podGroup.rotation.y += 0.005
    }

    if (podGroup) {
      const deg = Math.round(THREE.MathUtils.radToDeg(podGroup.rotation.y) % 360)
      currentAngleDegrees.value = (deg + 360) % 360
    }

    // Shimmer star ceiling particles
    if (starParticles) {
      starParticles.rotation.y += 0.001
    }

    controls?.update()
    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }
  animate()

  // 8. Resize Listener
  function onResize() {
    if (!canvasContainer.value || !renderer || !camera) return
    const newW = canvasContainer.value.clientWidth
    const newH = canvasContainer.value.clientHeight
    camera.aspect = newW / newH
    camera.updateProjectionMatrix()
    renderer.setSize(newW, newH)
  }
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  if (renderer && renderer.domElement && canvasContainer.value) {
    canvasContainer.value.removeChild(renderer.domElement)
  }
  renderer?.dispose()
})
</script>

<template>
  <section id="pod-3d-experience" class="section-pad relative overflow-hidden bg-ink-950">
    <!-- Ambient glow behind 3D canvas -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
    </div>

    <div class="container-page relative z-10">
      <!-- Section Header -->
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow mb-4">Interactive 3D Experience</p>
        <h2 class="text-3xl font-semibold text-ivory-50 sm:text-4xl lg:text-5xl text-balance leading-[1.1]">
          Explore the Sleepy1 Pod in 3D
        </h2>
        <p class="mt-5 text-base text-ivory-100/70 sm:text-lg leading-relaxed">
          Interact with our live 3D pod model — click and drag to rotate 360°, scroll to zoom, and explore both the exterior shell and interior cabin from any angle.
        </p>

        <!-- View Mode Switcher (Exterior / Interior) -->
        <div class="mt-8 flex justify-center gap-4">
          <button
            type="button"
            class="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300"
            :class="activeView === 'exterior'
              ? 'bg-brand-400/15 text-brand-200 border border-brand-400/30 shadow-[0_0_15px_rgba(139,155,251,0.2)]'
              : 'bg-white/5 text-ivory-100/50 border border-white/10 hover:bg-white/10 hover:text-ivory-100/80'"
            @click="activeView = 'exterior'"
          >
            <span class="text-base">❖</span>
            <span>3D Exterior Shell</span>
          </button>
          <button
            type="button"
            class="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300"
            :class="activeView === 'interior'
              ? 'bg-brand-400/15 text-brand-200 border border-brand-400/30 shadow-[0_0_15px_rgba(139,155,251,0.2)]'
              : 'bg-white/5 text-ivory-100/50 border border-white/10 hover:bg-white/10 hover:text-ivory-100/80'"
            @click="activeView = 'interior'"
          >
            <span class="text-base">✦</span>
            <span>3D Interior Cabin</span>
          </button>
        </div>
      </div>

      <!-- Main 3D Canvas + Info Layout -->
      <div class="mt-14 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
        <!-- Left: Three.js 3D Interactive Viewport & Controls -->
        <div class="flex flex-col gap-5">
          <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-2xl">
            <!-- 3D WebGL Canvas Container -->
            <div
              ref="canvasContainer"
              class="h-[380px] sm:h-[460px] md:h-auto md:aspect-[16/10] w-full relative cursor-grab active:cursor-grabbing select-none"
              style="touch-action: none;"
              aria-label="3D interactive model viewer"
            />

            <!-- Mobile touch helper pill badge -->
            <div class="absolute top-4 right-4 z-10 pointer-events-none sm:hidden rounded-full bg-brand-500/20 border border-brand-400/30 px-3 py-1 backdrop-blur-md">
              <span class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-200">👆 Touch & Drag 3D</span>
            </div>

            <!-- Loading Spinner overlay if custom model is loading -->
            <div
              v-if="isLoadingModel"
              class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-ink-950/80 text-ivory-50 backdrop-blur-sm"
            >
              <div class="h-8 w-8 animate-spin rounded-full border-2 border-brand-400 border-t-transparent" />
              <p class="mt-3 text-xs font-mono uppercase tracking-wider text-brand-300">Loading 3D Model...</p>
            </div>

            <!-- HUD Badge Top-Left -->
            <div class="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 rounded-full bg-ink-950/85 border border-white/10 px-3.5 py-1.5 backdrop-blur-md">
              <span class="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
              <span class="font-mono text-[11px] font-bold tracking-widest text-brand-300">
                WEBGL 3D · {{ activeView === 'interior' ? 'CABIN VIEW' : 'EXTERIOR VIEW' }}
              </span>
            </div>

            <!-- HUD Angle Badge Bottom-Right -->
            <div class="absolute bottom-4 right-4 z-10 pointer-events-none rounded-full bg-ink-950/85 border border-white/10 px-3.5 py-1 backdrop-blur-md">
              <span class="font-mono text-xs text-ivory-100/70">ROTATION:</span>
              <span class="font-mono text-xs font-bold text-ivory-50 ml-1.5">{{ currentAngleDegrees }}°</span>
            </div>
          </div>
        </div>

        <!-- Right: View Info & Features Checklist -->
        <div class="space-y-6">
          <Transition name="info-fade" mode="out-in">
            <div :key="activeView" class="space-y-5">
              <!-- Active view badge -->
              <div class="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-300">
                <span>{{ activeView === 'interior' ? '✦' : '❖' }}</span>
                <span>{{ viewMeta.label }}</span>
              </div>

              <h3 class="text-2xl font-semibold text-ivory-50 sm:text-3xl">
                {{ viewMeta.tagline }}
              </h3>

              <p class="text-sm leading-relaxed text-ivory-100/60 sm:text-base">
                {{ viewMeta.description }}
              </p>

              <!-- Features list -->
              <ul class="space-y-3 pt-2">
                <li
                  v-for="(feat, i) in viewMeta.features"
                  :key="i"
                  class="flex items-center gap-3 text-sm text-ivory-100/80"
                >
                  <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/15 text-brand-300 text-xs font-bold">
                    {{ i + 1 }}
                  </span>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.info-fade-enter-active,
.info-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.info-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.info-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
