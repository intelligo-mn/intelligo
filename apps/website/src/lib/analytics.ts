/**
 * Google Analytics 4 for intelligo.dev. It loads on the production host
 * only, so preview deploys and local builds send nothing.
 */
export const ANALYTICS = {
  measurementId: "G-5JLBCY2HD5",
  host: "intelligo.dev",
} as const;
