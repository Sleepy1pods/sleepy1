export type Locale = 'en' | 'kn' | 'hi'

export interface LanguageOption {
  code: Locale
  label: string
  nativeName: string
  shortLabel: string
}

export interface TranslationSchema {
  nav: {
    features: string
    locations: string
    contact: string
    about: string
    howItWorks: string
    newsletter: string
    myBookings: string
    login: string
    logout: string
    book: string
    openMenu: string
    closeMenu: string
  }
  common: {
    themeLight: string
    themeDark: string
    language: string
    selectLanguage: string
    needHelp: string
    loading: string
    back: string
    next: string
    confirm: string
    cancel: string
    search: string
    allRightsReserved: string
  }
  about: {
    originBadge: string
    storyTitle: string
    storyP1: string
    storyP2: string
    missionBadge: string
    missionTitle: string
    missionDesc: string
    visionBadge: string
    visionTitle: string
    visionDesc: string
    teamEyebrow: string
    teamTitle: string
    brandValuesEyebrow: string
    brandValuesTitle: string
    journeyEyebrow: string
    journeyTitle: string
    ctaTitle: string
    ctaDesc: string
    ctaBtn: string
  }
  footer: {
    tagline: string
    quickLinks: string
    legal: string
    newsletterTitle: string
    newsletterDesc: string
    newsletterPlaceholder: string
    subscribe: string
  }
}
