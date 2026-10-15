export const A11Y_STORAGE_KEY = "a11y-settings";

export interface A11ySettings {
  /** 0 = default, 1-3 = progressively larger root font size. */
  textSize: number;
  contrast: boolean;
  grayscale: boolean;
  links: boolean;
  readableFont: boolean;
  pauseMotion: boolean;
}

export const DEFAULT_A11Y_SETTINGS: A11ySettings = {
  textSize: 0,
  contrast: false,
  grayscale: false,
  links: false,
  readableFont: false,
  pauseMotion: false,
};

export function parseA11ySettings(raw: string): A11ySettings {
  if (!raw) return DEFAULT_A11Y_SETTINGS;
  try {
    const data = JSON.parse(raw) as Partial<A11ySettings>;
    const textSize = Number.isInteger(data.textSize) ? Math.min(Math.max(data.textSize as number, 0), 3) : 0;
    return {
      textSize,
      contrast: data.contrast === true,
      grayscale: data.grayscale === true,
      links: data.links === true,
      readableFont: data.readableFont === true,
      pauseMotion: data.pauseMotion === true,
    };
  } catch {
    return DEFAULT_A11Y_SETTINGS;
  }
}

export function applyA11ySettings(settings: A11ySettings) {
  const classes = document.documentElement.classList;
  for (let level = 1; level <= 3; level += 1) classes.toggle(`a11y-text-${level}`, settings.textSize === level);
  classes.toggle("a11y-contrast", settings.contrast);
  classes.toggle("a11y-grayscale", settings.grayscale);
  classes.toggle("a11y-links", settings.links);
  classes.toggle("a11y-readable", settings.readableFont);
  classes.toggle("a11y-nomotion", settings.pauseMotion);
}

/** Inline script run before first paint so saved settings don't flash in after hydration. */
export const A11Y_BOOT_SCRIPT = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  A11Y_STORAGE_KEY,
)})||"{}"),c=document.documentElement.classList;if(s.textSize>0&&s.textSize<=3)c.add("a11y-text-"+s.textSize);if(s.contrast)c.add("a11y-contrast");if(s.grayscale)c.add("a11y-grayscale");if(s.links)c.add("a11y-links");if(s.readableFont)c.add("a11y-readable");if(s.pauseMotion)c.add("a11y-nomotion")}catch(e){}})();`;
