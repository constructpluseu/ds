export interface RGB {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): RGB {
  const normalized = hex.replace("#", "");
  return {
    r: parseInt(normalized.substring(0, 2), 16),
    g: parseInt(normalized.substring(2, 4), 16),
    b: parseInt(normalized.substring(4, 6), 16),
  };
}

function parseColor(color: string): RGB {
  if (color.startsWith("#")) return hexToRgb(color);
  const match = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/.exec(color);
  if (!match) throw new Error(`Cor inválida para cálculo de contraste: ${color}`);
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
}

function channelLuminance(value: number): number {
  const srgb = value / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(color: string): number {
  const { r, g, b } = parseColor(color);
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

/** Razão de contraste WCAG entre duas cores opacas (fórmula da WCAG 2.1, 1.4.3). */
export function contrastRatio(colorA: string, colorB: string): number {
  const lumA = relativeLuminance(colorA);
  const lumB = relativeLuminance(colorB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Escolhe preto ou branco como cor de texto sobre `backgroundHex`, o que der mais contraste. */
export function bestTextColor(backgroundHex: string): { color: string; ratio: number } {
  const onWhite = contrastRatio(backgroundHex, "#FFFFFF");
  const onBlack = contrastRatio(backgroundHex, "#000000");
  return onWhite >= onBlack ? { color: "#FFFFFF", ratio: onWhite } : { color: "#000000", ratio: onBlack };
}

/** Compõe uma cor rgba() sobre um fundo sólido opaco, devolvendo o hex resultante. */
export function alphaBlend(foregroundRgba: string, backgroundHex: string): string {
  const match = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)\s*\)/.exec(foregroundRgba);
  if (!match) return foregroundRgba;
  const [, rStr, gStr, bStr, aStr] = match;
  const fg = { r: Number(rStr), g: Number(gStr), b: Number(bStr) };
  const alpha = Number(aStr);
  const bg = hexToRgb(backgroundHex);
  const blend = (fgChannel: number, bgChannel: number) =>
    Math.round(fgChannel * alpha + bgChannel * (1 - alpha));
  const r = blend(fg.r, bg.r);
  const g = blend(fg.g, bg.g);
  const b = blend(fg.b, bg.b);
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

/** Resolve uma cor (hex opaco ou rgba) para hex sólido, compondo sobre `underneathHex` se necessário. */
export function resolveToHex(color: string, underneathHex: string): string {
  return color.startsWith("rgba") ? alphaBlend(color, underneathHex) : color;
}

export const AA_MIN_CONTRAST = 4.5;
