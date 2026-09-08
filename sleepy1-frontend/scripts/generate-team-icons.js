import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const outDir = path.resolve(__dirname, '../public/team')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const icons = [
  {
    id: 'founder-sh',
    text: 'SH',
    gradient: [
      { offset: '0%', color: '#8b9bfb' },
      { offset: '50%', color: '#6366f1' },
      { offset: '100%', color: '#5b67d8' }
    ]
  },
  {
    id: 'founder-rs',
    text: 'RS',
    gradient: [
      { offset: '0%', color: '#fbbf24' },
      { offset: '50%', color: '#f97316' },
      { offset: '100%', color: '#e11d48' }
    ]
  },
  {
    id: 'founder-tk',
    text: 'TK',
    gradient: [
      { offset: '0%', color: '#34d399' },
      { offset: '50%', color: '#14b8a6' },
      { offset: '100%', color: '#0891b2' }
    ]
  }
]

async function generate() {
  for (const item of icons) {
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <defs>
    <linearGradient id="grad-${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      ${item.gradient.map(g => `<stop offset="${g.offset}" stop-color="${g.color}" />`).join('\n      ')}
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="64" ry="64" fill="url(#grad-${item.id})" />
  <text x="128" y="134" 
        font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Nunito', sans-serif" 
        font-size="94" 
        font-weight="800" 
        fill="#ffffff" 
        text-anchor="middle" 
        dominant-baseline="central"
        letter-spacing="1px">${item.text}</text>
</svg>`.trim()

    const svgPath = path.join(outDir, `${item.id}.svg`)
    fs.writeFileSync(svgPath, svg, 'utf-8')

    const pngPath = path.join(outDir, `${item.id}.png`)
    await sharp(Buffer.from(svg))
      .resize(256, 256)
      .png()
      .toFile(pngPath)

    console.log(`Generated ${item.id}.svg and ${item.id}.png`)
  }
}

generate().catch(err => {
  console.error(err)
  process.exit(1)
})
