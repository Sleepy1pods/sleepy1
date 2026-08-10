<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const customModelUrl = ref<string>('/SleepPod1.glb')

type ViewMode = 'interior' | 'exterior'
const activeView = ref<ViewMode>('exterior')
// (auto-rotation removed per user request)
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
const hoveredLabel = ref<string | null>(null)
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

    if (label && (child instanceof THREE.Mesh || child.isMesh)) {
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

    if (type && (child instanceof THREE.Mesh || child.isMesh || child instanceof THREE.Group)) {
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

function updateCameraForMode(mode: ViewMode) {
  if (!camera || !controls) return
  const isMobile = window.innerWidth < 640
  if (mode === 'interior') {
    animateCameraTo(new THREE.Vector3(0.15, 0.1, isMobile ? 2.3 : 1.8), new THREE.Vector3(0, -0.2, -0.6))
  } else {
    animateCameraTo(new THREE.Vector3(0, 1.3, isMobile ? 7.6 : 5.8), new THREE.Vector3(0, 0, 0))
  }
}

function animateCameraTo(targetPos: THREE.Vector3, targetLook: THREE.Vector3) {
  if (!camera || !controls) return
  const startPos = camera.position.clone()
  const startLook = controls.target.clone()
  const duration = 800
  const startTime = performance.now()

  function step(time: number) {
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
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

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove)
  if (!canvasContainer.value) return

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
  controls.minDistance = 1.2
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

    if (podGroup) {
      const deg = Math.round(THREE.MathUtils.radToDeg(podGroup.rotation.y) % 360)
      currentAngleDegrees.value = (deg + 360) % 360
    }

    if (starParticles) {
      starParticles.rotation.y += 0.001
    }
    
    // Interactive Raycasting for Tooltips
    if (activeView.value === 'interior' && interactiveMeshes.length > 0 && camera && scene) {
      if (mouseVector.x !== -9999) {
        raycaster.setFromCamera(mouseVector, camera)
        const meshesToTest = interactiveMeshes.map(m => m.mesh)
        const intersects = raycaster.intersectObjects(meshesToTest, false)
        
        if (intersects.length > 0) {
          const hit = intersects[0].object
          const matched = interactiveMeshes.find(m => m.mesh === hit)
          if (matched) {
            hoveredLabel.value = matched.label
          }
        } else {
          hoveredLabel.value = null
        }
      } else {
        hoveredLabel.value = null
      }
    } else {
      hoveredLabel.value = null
    }

    // Apply zero-gravity animations to found meshes
    const time = Date.now() * 0.001
    
    // Smoothly interpolate current mouse for smooth interactive effect
    currentMouseX += (mouseX - currentMouseX) * 0.05
    currentMouseY += (mouseY - currentMouseY) * 0.05

    animatedMeshes.forEach((item) => {
      if (!item.mesh) return

      // Very subtle floating offset (reduced amplitudes)
      const floatY = Math.sin(time + item.phase) * 0.005
      
      // Interactive rotation leaning towards mouse
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
        // Sheets gently breathe via scale and very slight position shift
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
          Interact with our live 3D pod model — click and drag to rotate 360°, scroll to zoom, and explore both the exterior shell and interior cabin from any angle. Hover over objects inside to learn more!
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
            >
              <!-- Interactive Hover Tooltip Overlay -->
              <Transition name="tooltip-fade">
                <div 
                  v-if="hoveredLabel"
                  class="pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-ink-950/90 border border-brand-400/30 px-3 py-1.5 text-xs font-semibold text-brand-200 backdrop-blur shadow-xl transition-transform duration-75 ease-out"
                  :style="{ transform: `translate(${mousePos.x + 15}px, ${mousePos.y + 15}px)` }"
                >
                  <div class="flex items-center gap-2">
                    <span class="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse"></span>
                    {{ hoveredLabel }}
                  </div>
                </div>
              </Transition>
            </div>

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

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.15s ease;
}
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}
</style>
