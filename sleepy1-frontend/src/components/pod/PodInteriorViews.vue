<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const customModelUrl = ref<string>('/SleepPod1.glb')

type ViewMode = 'interior' | 'exterior'
const activeView = ref<ViewMode>('exterior')
const isFullscreen = ref(false)
watch(isFullscreen, (val) => {
  if (val) {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 50)
  }
})
// (auto-rotation removed per user request)
const isLoadingModel = ref(false)
// const currentAngleDegrees = ref(0) // Removed since badge was removed

const canvasContainer = ref<HTMLElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let controls: OrbitControls | null = null
let animationFrameId: number | null = null
let podGroup: THREE.Group | null = null
let starParticles: THREE.Points | null = null

// Animation array for zero-gravity effect
const animatedMeshes: {
  mesh: THREE.Object3D
  originalPosX: number
  originalPosY: number
  originalPosZ: number
  originalRotX: number
  originalRotY: number
  originalRotZ: number
  phase: number
  type: 'pillow' | 'sheet' | 'headphone' | 'generic'
}[] = []

const interactiveMeshes: { mesh: THREE.Object3D; label: string }[] = []
const clickedLabel = ref<string | null>(null)
let clickedLabelTimer: ReturnType<typeof setTimeout> | null = null
const mousePos = ref({ x: 0, y: 0 })
const raycaster = new THREE.Raycaster()
const mouseVector = new THREE.Vector2(-9999, -9999)

// Mouse tracking for interactivity
let mouseX = 0
let mouseY = 0
let currentMouseX = 0
let currentMouseY = 0

function onPointerMove(event: PointerEvent) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1

  if (canvasContainer.value) {
    const rect = canvasContainer.value.getBoundingClientRect()
    
    if (event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom) {
      
      mouseVector.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseVector.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      mousePos.value = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    } else {
      mouseVector.x = -9999
      mouseVector.y = -9999
    }
  }
}



function buildProceduralPodModel(): THREE.Group {
  const group = new THREE.Group()

  const shellGeo = new THREE.CapsuleGeometry(1.55, 2.3, 48, 48)
  const shellMat = new THREE.MeshStandardMaterial({
    color: 0xf8f9fc,
    roughness: 0.18,
    metalness: 0.25,
  })
  const shellMesh = new THREE.Mesh(shellGeo, shellMat)
  shellMesh.rotation.z = Math.PI / 2
  shellMesh.castShadow = true
  shellMesh.receiveShadow = true
  shellMesh.name = 'shell_exterior'
  group.add(shellMesh)

  const ringGeo = new THREE.TorusGeometry(1.57, 0.045, 24, 64)
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xdce3f0,
    metalness: 0.9,
    roughness: 0.1,
  })
  const leftRing = new THREE.Mesh(ringGeo, ringMat)
  leftRing.rotation.y = Math.PI / 2
  leftRing.position.x = -1.15
  leftRing.name = 'seal_ring_left'
  group.add(leftRing)

  const rightRing = new THREE.Mesh(ringGeo, ringMat)
  rightRing.rotation.y = Math.PI / 2
  rightRing.position.x = 1.15
  rightRing.name = 'seal_ring_right'
  group.add(rightRing)

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
  windowMesh.name = 'privacy_window'
  group.add(windowMesh)

  const linerGeo = new THREE.CapsuleGeometry(1.47, 2.22, 32, 32)
  const linerMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a2e,
    roughness: 0.9,
    side: THREE.BackSide,
  })
  const linerMesh = new THREE.Mesh(linerGeo, linerMat)
  linerMesh.rotation.z = Math.PI / 2
  linerMesh.name = 'acoustic_liner'
  group.add(linerMesh)

  const frameGeo = new THREE.BoxGeometry(2.36, 0.14, 1.36)
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a2421, roughness: 0.4 })
  const frameMesh = new THREE.Mesh(frameGeo, frameMat)
  frameMesh.position.set(0, -0.74, 0)
  frameMesh.name = 'bed_frame'
  group.add(frameMesh)

  const bedGeo = new THREE.BoxGeometry(2.32, 0.28, 1.32)
  const bedMat = new THREE.MeshStandardMaterial({
    color: 0xfffcf5,
    roughness: 0.75,
  })
  const bedMesh = new THREE.Mesh(bedGeo, bedMat)
  bedMesh.position.set(0, -0.55, 0)
  bedMesh.receiveShadow = true
  bedMesh.name = 'bed'
  group.add(bedMesh)

  const duvetGeo = new THREE.BoxGeometry(1.05, 0.08, 1.32)
  const duvetMat = new THREE.MeshStandardMaterial({
    color: 0xe8effa,
    roughness: 0.85,
  })
  const duvetMesh = new THREE.Mesh(duvetGeo, duvetMat)
  duvetMesh.position.set(0.62, -0.38, 0)
  duvetMesh.name = 'duvet'
  group.add(duvetMesh)

  const pillowGeo = new THREE.BoxGeometry(0.48, 0.16, 0.88)
  const pillowMat = new THREE.MeshStandardMaterial({
    color: 0xfffaf0,
    roughness: 0.9,
  })
  const pillowMesh = new THREE.Mesh(pillowGeo, pillowMat)
  pillowMesh.position.set(-0.85, -0.36, 0)
  pillowMesh.rotation.z = 0.16
  pillowMesh.name = 'pillow'
  group.add(pillowMesh)

  const accentPillowGeo = new THREE.BoxGeometry(0.3, 0.14, 0.55)
  const accentPillowMat = new THREE.MeshStandardMaterial({
    color: 0x8b9bfb,
    roughness: 0.8,
  })
  const accentPillowMesh = new THREE.Mesh(accentPillowGeo, accentPillowMat)
  accentPillowMesh.position.set(-0.62, -0.35, 0)
  accentPillowMesh.rotation.z = 0.25
  accentPillowMesh.name = 'pillow_accent'
  group.add(accentPillowMesh)

  const hpGroup = new THREE.Group()
  hpGroup.name = 'headphone'
  const hpBand = new THREE.TorusGeometry(0.08, 0.015, 16, 32, Math.PI)
  const hpMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2 })
  const hpBandMesh = new THREE.Mesh(hpBand, hpMat)
  hpGroup.add(hpBandMesh)
  const hpEarGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 16)
  const hpEarMesh1 = new THREE.Mesh(hpEarGeo, hpMat)
  hpEarMesh1.rotation.z = Math.PI / 2
  hpEarMesh1.position.set(0.08, 0, 0)
  hpGroup.add(hpEarMesh1)
  const hpEarMesh2 = new THREE.Mesh(hpEarGeo, hpMat)
  hpEarMesh2.rotation.z = Math.PI / 2
  hpEarMesh2.position.set(-0.08, 0, 0)
  hpGroup.add(hpEarMesh2)
  hpGroup.position.set(-0.2, -0.4, 0.3)
  hpGroup.rotation.x = -Math.PI / 2
  group.add(hpGroup)

  const stripGeo = new THREE.BoxGeometry(2.0, 0.03, 0.03)
  const stripMat = new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
  })
  const leftStrip = new THREE.Mesh(stripGeo, stripMat)
  leftStrip.position.set(0, -0.38, -0.66)
  leftStrip.name = 'ambient_light'
  group.add(leftStrip)

  const rightStrip = new THREE.Mesh(stripGeo, stripMat)
  rightStrip.position.set(0, -0.38, 0.66)
  rightStrip.name = 'ambient_light'
  group.add(rightStrip)

  const screenGeo = new THREE.BoxGeometry(0.05, 0.65, 1.15)
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x050711,
    emissive: 0x4d61fc,
    emissiveIntensity: 0.75,
    roughness: 0.15,
  })
  const screenMesh = new THREE.Mesh(screenGeo, screenMat)
  screenMesh.position.set(1.06, -0.05, 0)
  screenMesh.name = 'entertainment_display'
  group.add(screenMesh)

  const barGeo = new THREE.BoxGeometry(0.06, 0.08, 0.9)
  const barMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 })
  const barMesh = new THREE.Mesh(barGeo, barMat)
  barMesh.position.set(1.05, -0.42, 0)
  barMesh.name = 'control_panel'
  group.add(barMesh)

  const starCount = 150
  const starPositions = new Float32Array(starCount * 3)
  const starColors = new Float32Array(starCount * 3)
  const palette = [
    new THREE.Color(0xfff0b3),
    new THREE.Color(0xd4a5ff),
    new THREE.Color(0xffffff),
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

  const scannerGeo = new THREE.BoxGeometry(0.18, 0.35, 0.08)
  const scannerMat = new THREE.MeshStandardMaterial({ color: 0x121422, roughness: 0.4 })
  const scannerMesh = new THREE.Mesh(scannerGeo, scannerMat)
  scannerMesh.position.set(0.65, 0.1, 1.48)
  scannerMesh.name = 'nfc_scanner'
  group.add(scannerMesh)

  const ledGeo = new THREE.CircleGeometry(0.04, 16)
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 })
  const ledMesh = new THREE.Mesh(ledGeo, ledMat)
  ledMesh.position.set(0.65, 0.2, 1.53)
  ledMesh.name = 'led_indicator'
  group.add(ledMesh)

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

  const floorRingGeo = new THREE.TorusGeometry(2.55, 0.02, 16, 64)
  const floorRingMat = new THREE.MeshBasicMaterial({ color: 0x8b9bfb })
  const floorRingMesh = new THREE.Mesh(floorRingGeo, floorRingMat)
  floorRingMesh.rotation.x = Math.PI / 2
  floorRingMesh.position.set(0, -1.5, 0)
  group.add(floorRingMesh)

  const headLight = new THREE.PointLight(0xfbbf24, 2.5, 4)
  headLight.position.set(-0.6, 0.3, 0)
  group.add(headLight)

  const footLight = new THREE.PointLight(0x8b9bfb, 1.8, 4)
  footLight.position.set(0.6, 0.3, 0)
  group.add(footLight)

  return group
}

function getLabelForName(name: string | undefined): string | null {
  if (!name) return null
  const n = name.toLowerCase()
  if (n.includes('pillow') || n.includes('cushion')) return 'Ergonomic Memory-Foam Pillow'
  if (n.includes('duvet') || n.includes('blanket')) return 'Organic Cotton Blanket'
  if (n === 'bed') return 'Premium Mattress'
  if (n.includes('bed_frame') || n.includes('frame')) return 'Reinforced Bed Frame'
  if (n.includes('headphone') || n.includes('audio') || n.includes('ear')) return 'Noise-Cancelling Headphones'
  if (n.includes('entertainment') || n.includes('screen') || n.includes('display') || n.includes('projector')) return 'HD Entertainment Display'
  if (n.includes('control') || n.includes('panel')) return 'Smart Touch Control Panel'
  if (n.includes('ambient_light') || n.includes('strip')) return 'Ambient LED Mood Light'
  if (n.includes('led_indicator')) return 'Occupancy Status LED'
  if (n.includes('nfc') || n.includes('scanner')) return 'NFC Access Scanner'
  if (n.includes('shell') || n.includes('exterior')) return 'Acoustic Shell Exterior'
  if (n.includes('seal_ring') || n.includes('ring')) return 'Pressure Seal Ring'
  if (n.includes('privacy_window') || n.includes('window')) return 'Privacy Tinted Window'
  if (n.includes('acoustic_liner') || n.includes('liner')) return 'Sound-Dampening Liner'
  if (n.includes('hanger') || n.includes('hook') || n.includes('wardrobe')) return 'Coat Hanger'
  if (n.includes('vent') || n.includes('hepa')) return 'HEPA Air Vent'
  if (n.includes('charge') || n.includes('plug') || n.includes('socket') || n.includes('usb')) return 'Fast Charging Port'
  return null
}

function setupInteractivity(group: THREE.Group) {
  interactiveMeshes.length = 0
  group.traverse((child) => {
    let label = getLabelForName(child.name)
    
    // Inherit label from parent hierarchy if it's a child mesh of a grouped object
    if (!label) {
      let parent = child.parent
      while (parent && !label) {
        label = getLabelForName(parent.name)
        parent = parent.parent
      }
    }

    if (label && (child instanceof THREE.Mesh || (child as any).isMesh)) {
      interactiveMeshes.push({ mesh: child, label })
    }
  })
}

function setupAnimations(group: THREE.Group) {
  animatedMeshes.length = 0
  group.traverse((child) => {
    const name = child.name.toLowerCase()
    
    let type: 'pillow' | 'sheet' | 'headphone' | 'generic' | null = null
    
    if (name.includes('pillow') || name.includes('cushion')) {
      type = 'pillow'
    } else if (name.includes('sheet') || name.includes('duvet') || name.includes('blanket') || name.includes('bed')) {
      type = 'sheet'
    } else if (name.includes('headphone') || name.includes('audio') || name.includes('ear')) {
      type = 'headphone'
    }

    if (type && (child instanceof THREE.Mesh || (child as any).isMesh || child instanceof THREE.Group)) {
      animatedMeshes.push({
        mesh: child,
        originalPosX: child.position.x,
        originalPosY: child.position.y,
        originalPosZ: child.position.z,
        originalRotX: child.rotation.x,
        originalRotY: child.rotation.y,
        originalRotZ: child.rotation.z,
        phase: Math.random() * Math.PI * 2,
        type
      })
    }
  })
}

function loadModel() {
  if (!scene) return

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
        const box = new THREE.Box3().setFromObject(podGroup)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 3.5 / (maxDim || 1)
        podGroup.scale.setScalar(scale)
        podGroup.position.sub(center.multiplyScalar(scale))
        scene?.add(podGroup)
        setupAnimations(podGroup)
        setupInteractivity(podGroup)
      },
      undefined,
      (err) => {
        console.warn('Failed to load custom GLTF model, falling back to procedural pod model:', err)
        isLoadingModel.value = false
        podGroup = buildProceduralPodModel()
        scene?.add(podGroup)
        setupAnimations(podGroup)
        setupInteractivity(podGroup)
      },
    )
  } else {
    podGroup = buildProceduralPodModel()
    scene.add(podGroup)
    setupAnimations(podGroup)
    setupInteractivity(podGroup)
  }
}

let cameraAnimFrameId: number | null = null
let isCustomCameraAnimating = false

function updateCameraForMode(mode: ViewMode) {
  if (!camera || !controls) return
  const isMobile = window.innerWidth < 640
  if (mode === 'interior') {
    animateCameraTo(new THREE.Vector3(0.15, 0.1, isMobile ? 2.3 : 1.8), new THREE.Vector3(0, -0.2, -0.6))
  } else {
    animateCameraTo(new THREE.Vector3(0, 1.3, isMobile ? 7.6 : 5.8), new THREE.Vector3(0, 0, 0))
  }
}

function animateCameraTo(targetPos: THREE.Vector3, targetLook: THREE.Vector3, duration = 800) {
  if (!camera || !controls) return
  if (cameraAnimFrameId !== null) {
    cancelAnimationFrame(cameraAnimFrameId)
    cameraAnimFrameId = null
  }
  const startPos = camera.position.clone()
  const startLook = controls.target.clone()
  const startTime = performance.now()

  function step(time: number) {
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)

    camera?.position.lerpVectors(startPos, targetPos, ease)
    controls?.target.lerpVectors(startLook, targetLook, ease)
    controls?.update()

    if (progress < 1) {
      cameraAnimFrameId = requestAnimationFrame(step)
    } else {
      cameraAnimFrameId = null
      isCustomCameraAnimating = false
    }
  }
  cameraAnimFrameId = requestAnimationFrame(step)
}

watch(activeView, (newMode) => {
  if (isCustomCameraAnimating) return
  updateCameraForMode(newMode)
})

function onCanvasClick(event: MouseEvent) {
  if (!canvasContainer.value || !camera || !scene || interactiveMeshes.length === 0) return

  const rect = canvasContainer.value.getBoundingClientRect()
  const clickVec = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  )
  raycaster.setFromCamera(clickVec, camera)
  const meshesToTest = interactiveMeshes.map(m => m.mesh)
  const intersects = raycaster.intersectObjects(meshesToTest, false)

  if (intersects.length > 0) {
    const hit = intersects[0].object
    const matched = interactiveMeshes.find(m => m.mesh === hit)
    if (matched) {
      clickedLabel.value = matched.label
      mousePos.value = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
      // Auto-dismiss after 2.5 seconds
      if (clickedLabelTimer) clearTimeout(clickedLabelTimer)
      clickedLabelTimer = setTimeout(() => {
        clickedLabel.value = null
      }, 2500)
    }
  } else {
    clickedLabel.value = null
    if (clickedLabelTimer) clearTimeout(clickedLabelTimer)
  }
}

// Amenity features with keywords and fallback camera positions
interface AmenityItem {
  id: string
  title: string
  subtitle?: string
  description: string
  keywords: string[]
  fallbackOffset?: { pos: [number, number, number]; look: [number, number, number] }
}

const amenities: AmenityItem[] = [
  {
    id: 'bed',
    title: 'Ergonomic Bed',
    subtitle: 'Zero-G',
    description: 'Memory-foam mattress, organic cotton blanket and ergonomic head pillow.',
    keywords: ['pillow', 'matress', 'bed_01', 'blanket01', 'bed'],
    fallbackOffset: { pos: [0, 0.15, 1.3], look: [0, -0.35, -0.2] },
  },
  {
    id: 'projector',
    title: 'Projector',
    subtitle: 'HD Streaming',
    description: 'Ceiling-mounted HD cinema projection system for video and ambient display.',
    keywords: ['projector', 'projector supportt', 'projector.001'],
    fallbackOffset: { pos: [0, 0.05, 1.2], look: [0, 0.85, -0.2] },
  },
  {
    id: 'control-panel',
    title: 'Smart Control Panel',
    subtitle: 'Touch UI',
    description: 'Wall-mounted tablet interface for lighting modes, AC temperature, and privacy locks.',
    keywords: ['control tab', 'screen2', 'control tab.001', 'control'],
    fallbackOffset: { pos: [0.15, 0.1, 0.9], look: [0.45, 0.05, -0.1] },
  },
  {
    id: 'star-ceiling',
    title: 'Star Ceiling',
    subtitle: 'Fiber-Optic',
    description: 'Bespoke starry ceiling fiber optics paired with circadian LED mood strips.',
    keywords: ['led', 'led strips', 'ambient_light'],
    fallbackOffset: { pos: [0, 0.15, 1.1], look: [0, 0.65, 0] },
  },
  {
    id: 'work-desk',
    title: 'Foldable Work desk',
    subtitle: 'Drop-Leaf',
    description: 'Drop-down sturdy ergonomic surface engineered for laptops and note-taking.',
    keywords: ['table', 'desk'],
    fallbackOffset: { pos: [0.15, 0.1, 1.0], look: [-0.45, -0.1, 0.1] },
  },
  {
    id: 'spatial-audio',
    title: 'Spatial Audio',
    subtitle: 'Hi-Fi Sound',
    description: 'Spatial acoustic speaker drivers delivering soothing, immersive audio landscapes.',
    keywords: ['speaker', 'headphone', 'audio'],
    fallbackOffset: { pos: [0.1, 0.2, 1.0], look: [0.4, 0.2, -0.1] },
  },
  {
    id: 'fast-charging',
    title: 'Fast charging',
    subtitle: 'Universal',
    description: 'High-speed USB-C charging ports and universal AC power sockets.',
    keywords: ['switchboard', 'charge', 'socket'],
    fallbackOffset: { pos: [0.1, 0.05, 0.9], look: [-0.45, -0.15, 0.2] },
  },
  {
    id: 'emergency',
    title: 'Emergency Assistance',
    subtitle: 'Quick SOS',
    description: 'Instant manual egress release handle and one-touch emergency alert beacon.',
    keywords: ['emergstop', 'smoke detector', 'fire detector'],
    fallbackOffset: { pos: [0.05, 0.2, 1.0], look: [0.35, 0.35, -0.25] },
  },
  {
    id: 'ac',
    title: 'AC',
    subtitle: 'HEPA Climate',
    description: 'Ultra-quiet cassette AC climate regulation with hospital-grade HEPA air filtration.',
    keywords: ['cassette ac', 'exhaust fan', 'vent', 'ac'],
    fallbackOffset: { pos: [-0.15, 0.2, 1.1], look: [-0.3, 0.75, -0.2] },
  },
]

const selectedAmenity = ref<AmenityItem | null>(null)
const isPanelCollapsed = ref(false)

function toggleAmenity(amenity: AmenityItem) {
  if (selectedAmenity.value?.id === amenity.id) {
    selectedAmenity.value = null
    resetZoomView()
  } else {
    zoomToAmenity(amenity)
  }
}

function zoomToAmenity(amenity: AmenityItem) {
  selectedAmenity.value = amenity
  isCustomCameraAnimating = true
  activeView.value = 'interior'

  if (!podGroup || !camera || !controls) {
    isCustomCameraAnimating = false
    return
  }

  // Search for matching 3D object in scene
  let targetMesh: THREE.Object3D | null = null
  podGroup.traverse((child) => {
    if (targetMesh) return
    const name = child.name.toLowerCase()
    for (const kw of amenity.keywords) {
      if (name.includes(kw.toLowerCase())) {
        targetMesh = child
        break
      }
    }
  })

  if (targetMesh) {
    const box = new THREE.Box3().setFromObject(targetMesh)
    const targetLook = box.getCenter(new THREE.Vector3())

    // Calculate smart camera placement inside pod
    let camX = targetLook.x * 0.3
    let camY = Math.max(targetLook.y + 0.15, 0.05)
    let camZ = Math.min(targetLook.z + 1.15, 1.75)

    if (targetLook.y > 0.4) {
      camY = 0.0
      camZ = 1.25
    }

    if (targetLook.x < -0.2) {
      camX = 0.28
    } else if (targetLook.x > 0.2) {
      camX = -0.28
    }

    const targetPos = new THREE.Vector3(camX, camY, camZ)
    animateCameraTo(targetPos, targetLook, 850)
  } else if (amenity.fallbackOffset) {
    const { pos, look } = amenity.fallbackOffset
    animateCameraTo(
      new THREE.Vector3(pos[0], pos[1], pos[2]),
      new THREE.Vector3(look[0], look[1], look[2]),
      850
    )
  } else {
    isCustomCameraAnimating = false
  }
}

function resetZoomView() {
  selectedAmenity.value = null
  isCustomCameraAnimating = false
  updateCameraForMode(activeView.value)
}

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove)
  if (!canvasContainer.value) return
  canvasContainer.value.addEventListener('click', onCanvasClick)

  const width = canvasContainer.value.clientWidth || 800
  const height = canvasContainer.value.clientHeight || 500
  const isMobile = window.innerWidth < 640

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x090a10)

  camera = new THREE.PerspectiveCamera(isMobile ? 52 : 45, width / height, 0.1, 100)
  camera.position.set(0, 1.3, isMobile ? 7.6 : 5.8)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  canvasContainer.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 0.6
  controls.maxDistance = 12
  controls.target.set(0, 0, 0)
  controls.update()

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95)
  scene.add(ambientLight)

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2)
  dirLight1.position.set(5, 8, 6)
  dirLight1.castShadow = true
  scene.add(dirLight1)

  const dirLight2 = new THREE.DirectionalLight(0x8b9bfb, 1.2)
  dirLight2.position.set(-5, -3, -4)
  scene.add(dirLight2)

  loadModel()

  function animate() {
    animationFrameId = requestAnimationFrame(animate)

    if (starParticles) {
      starParticles.rotation.y += 0.001
    }

    const time = Date.now() * 0.001
    currentMouseX += (mouseX - currentMouseX) * 0.05
    currentMouseY += (mouseY - currentMouseY) * 0.05

    animatedMeshes.forEach((item) => {
      if (!item.mesh) return
      const floatY = Math.sin(time + item.phase) * 0.005
      const interactRotX = currentMouseY * 0.08
      const interactRotZ = currentMouseX * 0.08

      if (item.type === 'headphone') {
        item.mesh.position.y = item.originalPosY + floatY * 1.5
        item.mesh.rotation.z = item.originalRotZ + Math.sin(time * 0.8 + item.phase) * 0.03 + interactRotZ * 1.5
        item.mesh.rotation.x = item.originalRotX + Math.cos(time * 0.7 + item.phase) * 0.02 + interactRotX * 1.5
      } else if (item.type === 'pillow') {
        item.mesh.position.y = item.originalPosY + floatY * 0.8
        item.mesh.rotation.z = item.originalRotZ + Math.sin(time * 0.5 + item.phase) * 0.015 + interactRotZ * 0.5
        item.mesh.rotation.x = item.originalRotX + interactRotX * 0.5
      } else if (item.type === 'sheet') {
        item.mesh.scale.y = 1 + Math.sin(time * 0.4 + item.phase) * 0.004
        item.mesh.position.y = item.originalPosY + floatY * 0.3
      }
    })

    controls?.update()
    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }
  animate()

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
  window.removeEventListener('pointermove', onPointerMove)
  if (canvasContainer.value) {
    canvasContainer.value.removeEventListener('click', onCanvasClick)
  }
  if (clickedLabelTimer) clearTimeout(clickedLabelTimer)
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
  <section id="pod-3d-experience" class="section-pad relative">
    <div class="container-page">
      <!-- Preview Card -->
      <div v-show="!isFullscreen" class="grid overflow-hidden rounded-2xl lg:grid-cols-[2fr_1fr] bg-[#1A1A1A] shadow-premium">
        <div class="relative h-64 lg:h-[500px] w-full">
          <img src="/pod4.png" alt="Pod Preview" class="h-full w-full object-cover" />
        </div>
        <div class="flex flex-col items-start justify-center p-10 bg-[#1A1A1A]">
          <h3 class="text-3xl font-display text-white text-balance leading-tight">Unlock An Immersive Experience</h3>
          <button 
            @click="isFullscreen = true"
            class="mt-8 flex items-center gap-2 rounded-full border border-white/20 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white/90 hover:scale-105 shadow-md"
          >
            EXPLORE IN 3D
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Fullscreen 3D View -->
    <Teleport to="body">
      <div 
        v-show="isFullscreen" 
        class="fixed inset-0 z-[100] flex flex-col bg-[#090a10] overflow-hidden"
      >
        <!-- Top Bar -->
        <div class="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
          <button 
            @click="isFullscreen = false" 
            class="pointer-events-auto flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black shadow-xl transition hover:bg-white/90 hover:scale-105"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
            BACK
          </button>

          <!-- Toggle Right Amenities Panel button for mobile -->
          <button
            @click="isPanelCollapsed = !isPanelCollapsed"
            class="pointer-events-auto sm:hidden flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md"
          >
            <span>{{ isPanelCollapsed ? 'Show Amenities' : 'Hide' }}</span>
            <span class="rounded-full bg-brand-500 px-1.5 py-0.2 text-[10px] font-bold">{{ amenities.length }}</span>
          </button>
        </div>

        <!-- 3D WebGL Canvas Container -->
        <div
          ref="canvasContainer"
          class="relative h-full w-full flex-1"
          :class="activeView === 'interior' ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'"
          style="touch-action: none;"
          aria-label="3D interactive model viewer"
        >
          <!-- Loading Spinner overlay -->
          <div
            v-if="isLoadingModel"
            class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 text-white backdrop-blur-sm"
          >
            <div class="h-8 w-8 animate-spin rounded-full border-2 border-brand-400 border-t-transparent" />
            <p class="mt-3 text-xs font-mono uppercase tracking-wider text-brand-300">Loading 3D Model...</p>
          </div>
        </div>

        <!-- Bottom-Left Bar (Interior / Exterior Toggles & Reset) -->
        <div class="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 z-40 flex items-center gap-3">
          <button
            class="rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-wider transition backdrop-blur-md border border-white/20 cursor-pointer"
            :class="activeView === 'interior' ? 'bg-white text-black shadow-xl scale-105' : 'bg-black/80 text-white hover:bg-white/10'"
            @click="activeView = 'interior'; selectedAmenity = null; isCustomCameraAnimating = false"
          >
            INTERIOR
          </button>
          <button
            class="rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-wider transition backdrop-blur-md border border-white/20 cursor-pointer"
            :class="activeView === 'exterior' ? 'bg-white text-black shadow-xl scale-105' : 'bg-black/80 text-white hover:bg-white/10'"
            @click="activeView = 'exterior'; selectedAmenity = null; isCustomCameraAnimating = false"
          >
            EXTERIOR
          </button>

          <button
            v-if="selectedAmenity"
            @click="resetZoomView"
            class="hidden sm:flex items-center gap-1.5 rounded-xl border border-white/25 bg-black/80 px-4 py-2.5 text-xs font-medium text-white/90 backdrop-blur-md hover:bg-white/15 transition"
            title="Reset to overview"
          >
            <svg class="h-3.5 w-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Reset Zoom
          </button>
        </div>

        <!-- Right Side Features / Amenities Panel -->
        <Transition name="panel-slide">
          <aside 
            v-show="!isPanelCollapsed"
            class="absolute top-18 sm:top-6 bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] flex flex-col pointer-events-auto"
          >
            <div class="flex flex-col h-full rounded-xl border border-[#2b3340] bg-[#11141c]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              <!-- Top Model Selector Card -->
              <div class="p-3 pb-0">
                <div class="rounded-lg border border-[#2b3340] bg-[#161c26] px-3.5 py-2 flex items-center justify-between">
                  <div>
                    <span class="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Model</span>
                    <span class="font-display text-xs sm:text-sm font-bold text-white tracking-wide">Sleepy1 Pod</span>
                  </div>
                  <svg class="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- Tab Header with White Accent Line -->
              <div class="mt-3 bg-[#181e28] border-b-2 border-white py-2.5 px-4 flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-white">Features & Amenities</span>
                <button
                  v-if="selectedAmenity"
                  @click="resetZoomView"
                  class="text-[10px] font-medium text-zinc-400 hover:text-white transition uppercase tracking-wider"
                >
                  Reset
                </button>
              </div>

              <!-- Accordion List of Features (No Icons, Smooth Downward Expansion) -->
              <div class="flex-1 overflow-y-auto custom-scrollbar bg-[#11141c]">
                <div
                  v-for="amenity in amenities"
                  :key="amenity.id"
                  class="border-b border-[#202734] last:border-b-0"
                >
                  <button
                    type="button"
                    @click="toggleAmenity(amenity)"
                    class="w-full py-3.5 px-4 flex items-center justify-between transition-colors text-left group cursor-pointer"
                    :class="selectedAmenity?.id === amenity.id ? 'bg-[#19212e]' : 'hover:bg-white/[0.03]'"
                  >
                    <span
                      class="text-xs sm:text-sm font-medium tracking-wide transition-colors"
                      :class="selectedAmenity?.id === amenity.id ? 'text-white font-semibold' : 'text-zinc-300 group-hover:text-white'"
                    >
                      {{ amenity.title }}
                    </span>

                    <div class="flex items-center">
                      <span 
                        class="text-base font-light text-zinc-400 group-hover:text-white transition-all duration-200 w-4 text-center leading-none select-none"
                      >
                        {{ selectedAmenity?.id === amenity.id ? '−' : '+' }}
                      </span>
                    </div>
                  </button>

                  <!-- Downward expanding accordion section -->
                  <Transition name="accordion-down">
                    <div
                      v-if="selectedAmenity?.id === amenity.id"
                      class="overflow-hidden bg-[#19212e]"
                    >
                      <div class="px-4 pb-3.5 pt-1 text-xs text-zinc-300 font-normal leading-relaxed border-t border-white/5">
                        <p>{{ amenity.description }}</p>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </aside>
        </Transition>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.accordion-down-enter-active,
.accordion-down-leave-active {
  transition: max-height 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease;
  max-height: 120px;
  overflow: hidden;
}

.accordion-down-enter-from,
.accordion-down-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}

.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.panel-slide-enter-from,
.panel-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.15s ease;
}
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}
</style>
