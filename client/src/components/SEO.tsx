import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonical?: string
}

export function SEO({ 
  title, 
  description, 
  keywords = 'alchemical transformation, kundalini awakening, sacred masculine, tantric practice, spiritual transformation, private members association',
  ogImage = 'https://33rdhouse.com/og-image.jpg',
  ogType = 'website',
  canonical
}: SEOProps) {
  const fullTitle = title.includes('|') ? title : `${title} | The 33rd House`
  const siteUrl = 'https://33rdhouse.com'
  const canonicalUrl = canonical || siteUrl + window.location.pathname

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Standard meta tags
    updateMeta('description', description)
    updateMeta('keywords', keywords)
    
    // Open Graph tags
    updateMeta('og:title', fullTitle, true)
    updateMeta('og:description', description, true)
    updateMeta('og:type', ogType, true)
    updateMeta('og:url', canonicalUrl, true)
    updateMeta('og:image', ogImage, true)
    updateMeta('og:site_name', 'The 33rd House', true)
    
    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', fullTitle)
    updateMeta('twitter:description', description)
    updateMeta('twitter:image', ogImage)
    
    // Canonical link
    let linkElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!linkElement) {
      linkElement = document.createElement('link')
      linkElement.setAttribute('rel', 'canonical')
      document.head.appendChild(linkElement)
    }
    linkElement.href = canonicalUrl

  }, [fullTitle, description, keywords, ogImage, ogType, canonicalUrl])

  return null
}
