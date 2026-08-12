import { watchEffect } from 'vue'

interface PageMetaOptions {
  title: string
  description: string
  /** Absolute or root-relative image URL for social share cards. Defaults to the brand OG card. */
  image?: string
}

const DEFAULT_OG_IMAGE = '/og-image.svg'

function setMetaTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Sets the document title, meta description, and Open Graph placeholders for the active route. */
export function usePageMeta(options: PageMetaOptions | (() => PageMetaOptions)) {
  watchEffect(() => {
    const { title, description, image } = typeof options === 'function' ? options() : options
    const fullTitle = title === 'Sleepy1' ? title : `Sleepy1 · ${title}`
    const imageUrl = window.location.origin + (image ?? DEFAULT_OG_IMAGE)
    document.title = fullTitle
    setMetaTag('description', description)
    setMetaTag('og:title', fullTitle, 'property')
    setMetaTag('og:description', description, 'property')
    setMetaTag('og:type', 'website', 'property')
    setMetaTag('og:image', imageUrl, 'property')
    setMetaTag('og:url', window.location.origin + window.location.pathname, 'property')
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', fullTitle)
    setMetaTag('twitter:description', description)
    setMetaTag('twitter:image', imageUrl)

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname)
  })
}
