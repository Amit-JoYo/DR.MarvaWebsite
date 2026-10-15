import type { Translations } from "./types";

export const en: Translations = {
  dir: "ltr",
  meta: {
    title: "Dr. Marva | Aesthetic Medicine with a Natural Approach",
    description:
      "Dr. Marva aesthetic medicine clinic — facial balancing, PRP, hyaluronic acid and botulinum toxin treatments with a precise, understated clinical approach.",
    locale: "en_US",
  },
  nav: [
    { href: "#about", label: "About" },
    { href: "#results", label: "Results" },
    { href: "#treatments", label: "Treatments" },
    { href: "#materials", label: "Materials" },
    { href: "#contact", label: "Contact" },
  ],
  header: {
    langToggleLabel: "עב | EN",
    langSwitchAria: "מעבר לעברית",
    menuLabel: "Menu",
  },
  a11y: {
    skipToContent: "Skip to main content",
    mainNavLabel: "Main navigation",
    toolbar: {
      open: "Accessibility menu",
      title: "Accessibility tools",
      close: "Close accessibility menu",
      textSize: "Text size",
      textSizeLevels: ["Default", "Large", "Larger", "Largest"],
      contrast: "High contrast",
      grayscale: "Grayscale",
      links: "Highlight links",
      readableFont: "Readable font",
      pauseMotion: "Stop animations",
      reset: "Reset settings",
      statement: "Accessibility statement",
    },
  },
  stickyBar: {
    label: "Quick contact",
    whatsapp: "WhatsApp",
    call: "Call",
  },
  hero: {
    eyebrow: "Clinical Aesthetic Medicine",
    headline: "Aesthetic Medicine with a Natural Approach",
    philosophyTitle: "My Philosophy",
    philosophy: [
      "True beauty rests on anatomical balance, not exaggeration. Every treatment begins with a deep understanding of facial structure and tissue vitality.",
      "I choose restraint: measured quantities, approved materials only, and a result that still looks like you — refreshed, balanced and well maintained.",
      "The goal is never to change your face, but to preserve its natural expression and nurture the health of your skin over time.",
    ],
    portraitAlt: "Dr. Marva — Licensed Physician in Aesthetic Medicine",
    signature: "Dr. Marva",
  },
  results: {
    heading: "Clinical Results",
    subtext:
      "Every tissue responds differently. Each plan is tailored to age, facial structure and skin quality, and the images represent a possible range of outcomes — not a guarantee of an identical result.",
    compareHint: "Hover over an image to pause the motion and see the result, or click to enlarge.",
    beforeLabel: "Before",
    afterLabel: "After",
    enlargeLabel: "Enlarge image",
    pauseLabel: "Pause motion",
    playLabel: "Play motion",
    items: [
      {
        id: "jawline",
        imageAlt: "Jawline and chin contouring result",
        badge: "Jawline & Chin",
        title: "Jawline & Chin Contouring",
        description: "Refining the lower facial contour for a balanced, defined profile.",
      },
      {
        id: "lips",
        imageAlt: "Natural lip sculpting result",
        badge: "Lip Sculpting",
        title: "Natural Lip Sculpting",
        description: "Subtle volume and border definition that preserves the mouth's proportions.",
      },
      {
        id: "wrinkles",
        imageAlt: "Expression line smoothing result",
        badge: "Line Smoothing",
        title: "Expression Line Smoothing",
        description: "Softening forehead, glabellar and crow's feet lines while preserving natural expression.",
      },
      {
        id: "prp",
        imageAlt: "PRP skin and hair regeneration result",
        badge: "PRP Regeneration",
        title: "Skin & Hair Regeneration",
        description: "Stimulating the body's own regenerative processes to improve skin texture and hair density.",
      },
      {
        id: "tear-troughs",
        imageAlt: "Tear trough treatment result",
        badge: "Tear Troughs",
        title: "Refreshed Under-Eyes",
        description: "Gentle filling of the tear troughs to soften a tired or hollow appearance.",
      },
      {
        id: "rhinoplasty",
        imageAlt: "Non-surgical rhinoplasty result",
        badge: "Nose Contouring",
        title: "Non-Surgical Rhinoplasty",
        description: "Refining the nasal line and profile with precise filler placement, without surgery.",
      },
      {
        id: "skin-texture",
        imageAlt: "Skin texture improvement result",
        badge: "Skin Texture",
        title: "Skin Texture Improvement",
        description: "More even, supple and radiant skin through personalized medical treatments.",
      },
    ],
  },
  treatments: {
    heading: "Treatments",
    subtext: "Every treatment is built on a clinical indication and tailored to you. Select a treatment for more details.",
    items: [
      {
        icon: "prp",
        title: "PRP for Face & Hair",
        description: "Platelet-rich plasma from your own blood to stimulate skin and hair regeneration.",
        details: {
          overview:
            "PRP is a treatment based on platelet-rich plasma prepared from your own blood. The plasma is injected into the facial skin or scalp to encourage natural regeneration and improve skin and hair quality.",
          goodFor: ["Tired or dull-looking skin", "Uneven skin texture", "Thinning or weakened hair"],
          facts: [
            { label: "Session length", value: "About 45 to 60 minutes" },
            { label: "Recovery", value: "Mild redness that usually fades within a few days" },
            { label: "Treatment course", value: "Usually a series of sessions, based on individual assessment" },
          ],
        },
      },
      {
        icon: "lips",
        title: "Lip Filling & Sculpting",
        description: "Subtle lip definition and enhancement that maintains a natural look.",
        details: {
          overview:
            "Subtle lip shaping with hyaluronic acid, focusing on proportion, symmetry and border definition without losing a natural look.",
          goodFor: ["Lips that have lost volume", "Asymmetry", "An undefined lip border"],
          facts: [
            { label: "Session length", value: "About 30 to 45 minutes" },
            { label: "Recovery", value: "Mild swelling and temporary marks in the first days" },
            { label: "Duration of results", value: "Usually several months, depending on the material and the patient" },
          ],
        },
      },
      {
        icon: "jawline",
        title: "Jawline & Chin Contouring",
        description: "Refining and balancing the lower facial contour.",
        details: {
          overview:
            "Refining and balancing the jawline and chin with precise filler placement, creating a balanced, defined profile that suits your facial structure.",
          goodFor: ["An undefined jawline", "A receding chin", "Profile imbalance"],
          facts: [
            { label: "Session length", value: "About 30 to 60 minutes" },
            { label: "Recovery", value: "Mild swelling or tenderness for a few days" },
            { label: "Duration of results", value: "From several months to a year or more, depending on the material and area" },
          ],
        },
      },
      {
        icon: "texture",
        title: "Skin Texture Improvement",
        description: "Treatments to improve skin uniformity, elasticity and overall quality.",
        details: {
          overview:
            "A combination of medical treatments to improve skin evenness, elasticity and overall quality, tailored to your skin type and goals.",
          goodFor: ["Uneven skin texture", "Dull or less elastic skin", "Visible pores"],
          facts: [
            { label: "Session length", value: "About 30 to 45 minutes" },
            { label: "Recovery", value: "Depends on the treatment; usually mild, short-lived redness" },
            { label: "Treatment course", value: "Results improve gradually over a series of sessions" },
          ],
        },
      },
      {
        icon: "lines",
        title: "Expression Lines",
        description: "Treating the forehead, glabella and crow's feet.",
        details: {
          overview:
            "Precise relaxation of the expression muscles in the forehead, between the brows and around the eyes using botulinum toxin, while preserving a natural expression.",
          goodFor: ["Forehead lines", "Lines between the brows", "Crow's feet around the eyes"],
          facts: [
            { label: "Session length", value: "About 15 to 20 minutes" },
            { label: "Recovery", value: "No significant downtime; small marks at the injection points fade quickly" },
            { label: "Duration of results", value: "Appear gradually within about a week and usually last around 3 to 4 months" },
          ],
        },
      },
      {
        icon: "tearTroughs",
        title: "Tear Troughs",
        description: "Gentle under-eye filling to reduce a tired or hollow appearance.",
        details: {
          overview:
            "Gentle filling of the tear trough to soften a tired or hollow look, using a careful technique suited to this delicate area. Suitability is determined at an in-person assessment.",
          goodFor: ["A tired look under the eyes", "A hollow beneath the eye", "Dark shadowing caused by lost volume"],
          facts: [
            { label: "Session length", value: "About 30 minutes" },
            { label: "Recovery", value: "Mild swelling or bruising possible for a few days" },
            { label: "Duration of results", value: "Usually about a year, depending on anatomy and the material" },
          ],
        },
      },
      {
        icon: "rhinoplasty",
        title: "Non-Surgical Rhinoplasty",
        description: "Refining nasal contours with precise filler placement, without surgery.",
        details: {
          overview:
            "Refining the nasal line and improving the profile with precise filler placement — no surgery and no lengthy recovery. Suitable for subtle changes only.",
          goodFor: ["Mild asymmetry", "A slight bump on the nasal bridge", "A low nasal tip"],
          facts: [
            { label: "Session length", value: "About 30 to 45 minutes" },
            { label: "Recovery", value: "Mild swelling for a few days" },
            { label: "Duration of results", value: "Usually several months up to a year, depending on the material" },
          ],
        },
      },
    ],
  },
  materials: {
    heading: "Medical Materials & Certified Brands",
    subtext: "We work exclusively with leading, approved brands. Select a material for more details.",
    items: [
      {
        icon: "toxin",
        title: "Botulinum Toxin",
        description: "Smooths expression lines safely, with precise dosing.",
        brands: ["Dysport", "Xeomin"],
        details: {
          overview:
            "An approved medical product that temporarily relaxes specific expression muscles, smoothing dynamic lines. The dose is set individually to preserve natural movement.",
          goodFor: ["Forehead and between-the-brow lines", "Crow's feet", "Reducing the deepening of expression lines"],
          facts: [
            { label: "Brands", value: "Dysport, Xeomin" },
            { label: "Onset of results", value: "A few days up to a week" },
            { label: "Duration of results", value: "Usually about 3 to 4 months" },
          ],
        },
      },
      {
        icon: "ha",
        title: "Hyaluronic Acid",
        description: "Volume restoration and contour definition with a natural, balanced approach.",
        brands: ["Stylage", "Restylane"],
        details: {
          overview:
            "A filler based on hyaluronic acid, a substance found naturally in the body. Used to restore volume, define contours and improve skin hydration, and it can be dissolved if needed.",
          goodFor: ["Lips and jawline", "Tear troughs", "Refining the nasal line"],
          facts: [
            { label: "Brands", value: "Stylage, Restylane" },
            { label: "Duration of results", value: "From several months to a year or more, depending on the product and area" },
            { label: "Reversibility", value: "Can be dissolved with a dedicated enzyme" },
          ],
        },
      },
      {
        icon: "booster",
        title: "Skin Boosters",
        description: "Injectable skin conditioning for hydration, elasticity and radiance from within.",
        brands: [],
        details: {
          overview:
            "Fine injections of hydrating substances deep in the skin to improve its moisture, elasticity and natural radiance.",
          goodFor: ["Dry or tired skin", "A lack of glow", "Fine superficial lines"],
          facts: [
            { label: "Treatment course", value: "Usually a few sessions at set intervals" },
            { label: "Recovery", value: "Small injection marks that usually fade within a day or two" },
          ],
        },
      },
      {
        icon: "biostimulator",
        title: "Bio-Stimulators",
        description: "Stimulating natural collagen production to improve skin quality and structure over time.",
        brands: [],
        details: {
          overview:
            "Substances that encourage the skin to produce its own collagen, gradually improving skin structure and firmness over time.",
          goodFor: ["Reduced elasticity and firmness", "Mild skin laxity", "Improving skin structure over time"],
          facts: [
            { label: "Onset of results", value: "Gradual, over several weeks" },
            { label: "Duration of results", value: "Usually long-lasting, depending on the material and the patient" },
          ],
        },
      },
      {
        icon: "peel",
        title: "Medical Peels",
        description: "Medical-grade skin renewal to improve texture, tone and clarity.",
        brands: [],
        details: {
          overview:
            "A controlled medical peel of the skin's upper layers that renews the surface and improves texture, tone and clarity.",
          goodFor: ["Uneven skin tone", "Rough texture", "Dull skin"],
          facts: [
            { label: "Session length", value: "About 30 minutes" },
            { label: "Recovery", value: "Peeling or redness for a few days, depending on peel depth" },
            { label: "Sun protection", value: "Careful sun protection is required during recovery" },
          ],
        },
      },
    ],
  },
  details: {
    learnMore: "Learn more",
    goodForTitle: "Who it's for",
    expectTitle: "What to expect",
    brandsTitle: "Brands",
    note: "This information is general only and is not personal medical advice. Suitability for treatment is determined at an individual consultation.",
    bookCta: "Book a consultation on WhatsApp",
    bookMessage: "Hello Dr. Marva, I'd like more details about: ",
    close: "Close",
  },
  contact: {
    heading: "Get in Touch",
    subtext: "For questions or to book a consultation, message us on WhatsApp or give us a call.",
    whatsappTitle: "Fast-Track on WhatsApp",
    whatsappText: "Message us directly and we'll get back to you shortly.",
    whatsappCta: "Message Us on WhatsApp",
    whatsappMessage: "Hello Dr. Marva, I'd like to book a consultation.",
    detailsTitle: "Clinic Details",
    phoneLabel: "Phone",
  },
  footer: {
    license: "Licensed Physician No. XXXXX",
    hoursTitle: "Operating Hours",
    hours: ["Sun-Thu: 09:00–19:00", "Fri: 09:00–13:00", "Sat: Closed"],
    locationTitle: "Address",
    location: "1 HaRofim St, Tel Aviv",
    disclaimerTitle: "Medical Disclaimer",
    disclaimer:
      "Information on this site is for general informational purposes only and does not constitute personal medical advice. Every aesthetic treatment is subject to examination and consultation with a licensed physician.",
    accessibilityLink: "Accessibility Statement",
    rights: "All rights reserved",
  },
  accessibility: {
    title: "Accessibility Statement",
    updated: "Last updated: [date]",
    intro:
      "Dr. Marva places great importance on making this website accessible to everyone, including people with disabilities, and works to align it with the international accessibility guidelines (WCAG) and Israeli Standard 5568.",
    sections: [
      {
        title: "Accessibility features",
        body: [
          "Keyboard navigation, including a link to skip to the main content.",
          "An accessibility menu to enlarge text, enable high contrast or grayscale, highlight links, switch to a readable font and stop animations.",
          "Semantic heading structure and screen reader support.",
          "Suitable color contrast and clear focus indicators.",
          "Support for Hebrew (right-to-left) and English (left-to-right).",
          "The option to pause the motion in the results gallery, and respect for the device's reduced-motion preference.",
        ],
      },
      {
        title: "Known limitations",
        body: ["Some parts of the site may not yet be fully accessible. We continue to test and improve."],
      },
      {
        title: "Accessibility inquiries",
        body: [
          "Ran into a difficulty? We'll gladly help and fix it. You can reach us by phone or WhatsApp: 054-216-7787.",
          "Accessibility coordinator: [name] | [email address]",
        ],
      },
    ],
    backHome: "Back to home page",
  },
};
