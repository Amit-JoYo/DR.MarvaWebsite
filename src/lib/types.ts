export type Lang = "he" | "en";
export type Dir = "rtl" | "ltr";

export interface NavLink {
  href: string;
  label: string;
}

export interface ResultCard {
  /** Drives the asset paths: /images/result-{id}-before.webp and /images/result-{id}-after.webp */
  id: string;
  imageAlt: string;
  badge: string;
  title: string;
  description: string;
}

/** Shown in the "learn more" panel of a treatment or material. */
export interface DetailInfo {
  overview: string;
  goodFor: string[];
  facts: { label: string; value: string }[];
}

export interface TreatmentCard {
  icon: "prp" | "lips" | "jawline" | "texture" | "lines" | "tearTroughs" | "rhinoplasty";
  title: string;
  description: string;
  details: DetailInfo;
}

export interface MaterialCard {
  icon: "toxin" | "ha" | "booster" | "biostimulator" | "peel";
  title: string;
  description: string;
  brands: string[];
  details: DetailInfo;
}

export interface FooterCopy {
  license: string;
  hoursTitle: string;
  hours: string[];
  locationTitle: string;
  location: string;
  disclaimerTitle: string;
  disclaimer: string;
  accessibilityLink: string;
  rights: string;
}

export interface AccessibilitySection {
  title: string;
  body: string[];
}

export interface Translations {
  dir: Dir;
  meta: {
    title: string;
    description: string;
    locale: string;
  };
  nav: NavLink[];
  header: {
    langToggleLabel: string;
    langSwitchAria: string;
    menuLabel: string;
  };
  a11y: {
    skipToContent: string;
    mainNavLabel: string;
    toolbar: {
      open: string;
      title: string;
      close: string;
      textSize: string;
      textSizeLevels: [string, string, string, string];
      contrast: string;
      grayscale: string;
      links: string;
      readableFont: string;
      pauseMotion: string;
      reset: string;
      statement: string;
    };
  };
  stickyBar: {
    label: string;
    whatsapp: string;
    call: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    philosophyTitle: string;
    philosophy: string[];
    portraitAlt: string;
    signature: string;
  };
  results: {
    heading: string;
    subtext: string;
    compareHint: string;
    beforeLabel: string;
    afterLabel: string;
    enlargeLabel: string;
    pauseLabel: string;
    playLabel: string;
    items: ResultCard[];
  };
  treatments: {
    heading: string;
    subtext: string;
    items: TreatmentCard[];
  };
  materials: {
    heading: string;
    subtext: string;
    items: MaterialCard[];
  };
  details: {
    learnMore: string;
    goodForTitle: string;
    expectTitle: string;
    brandsTitle: string;
    note: string;
    bookCta: string;
    bookMessage: string;
    close: string;
  };
  contact: {
    heading: string;
    subtext: string;
    whatsappTitle: string;
    whatsappText: string;
    whatsappCta: string;
    whatsappMessage: string;
    detailsTitle: string;
    phoneLabel: string;
  };
  footer: FooterCopy;
  accessibility: {
    title: string;
    updated: string;
    intro: string;
    sections: AccessibilitySection[];
    backHome: string;
  };
}
